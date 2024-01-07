import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { userDate, userLogout } from "../../pages/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Nav_Bar.scss";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  //con la ayuda de Redux saco el token y datos del usuario
  const token = useSelector(userDate).credentials;
  const userData = useSelector(userDate).user;
  const role = userData.role;
  const name = userData.name;

  //la función de logout
  const LogOut = () => {
    dispatch(userLogout({ credentials: "" }));
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/home">HooligansRiders</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          {token ? (
            <Nav>
              <Nav.Link className="configTextNav" href="/register_user">
                Galeria
              </Nav.Link>
              <Nav.Link className="configTextNav" href="/eventos_rutas">
                Eventos
              </Nav.Link>
              <NavDropdown
                className="configTextNav"
                title={
                  role === "admin" || role === "super_admin" ? "admin" : name
                }
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Item
                  className="configTextNav"
                  href="/profile_user"
                >
                  Mi Perfil
                </NavDropdown.Item>
                {role === "admin" || role === "super_admin" ? (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      className="configTextNav"
                      href="/profile_admin_users"
                    >
                      Perfiles
                    </NavDropdown.Item>
                  </>
                ) : (
                  <></>
                )}
                {role === "admin" ||
                role === "super_admin" ||
                role === "rider" ? (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      className="configTextNav"
                      href="/eventos_rutas_creator"
                    >
                      Crear Evento
                    </NavDropdown.Item>
                  </>
                ) : (
                  <></>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item className="configTextNav" href="/contacto_user">
                  Contacto
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  className="configTextNav"
                  onClick={() => LogOut()}
                >
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              {location.pathname === "/register_user" ? (
                <Nav.Link className="configTextNav" href="/login_user">
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link className="configTextNav" href="/register_user">
                  Registrate
                </Nav.Link>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
