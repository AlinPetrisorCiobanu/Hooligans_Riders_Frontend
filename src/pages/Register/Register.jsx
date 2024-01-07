import { useDispatch, useSelector } from "react-redux";
import { userDate, userLogin } from "../userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Custom_Input } from "../../common/Input/Input";
import { login, register } from "../../service/apiCalls";
import { Custom_Button } from "../../common/Button/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./Register.scss";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    last_name: "",
    date: "",
    phone: "",
    email: "",
    nickname: "",
    password: "",
  });

  //si tienes token te manda a la pagina de inicio
  const token = useSelector(userDate).credentials;
  const tokenExist = (tokenEx) => {
    if (tokenEx) {
      navigate("/profile_user");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  //guardo los datos de los inputs
  const inputHandler = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerHand = (data) => {
    register(data)
      .then(() => {
        const dataToLogin = {
          email: data.email,
          password: data.password,
        };
        login(dataToLogin)
          .then((res) => {
            console.log(res);
            dispatch(userLogin({ credentials: res.token, user: res.data }));
          })
          .catch(() => {
            navigate("/");
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center Container_div_Principal">
  <div className="register_container">
    <Container>
      <Row className="row_file_register flex-wrap justify-content-center">
        <div className="col-md-6 input_options">
          <label htmlFor="name">Nombre</label>
          <Custom_Input type="text" name="name" handler={inputHandler} />
        </div>
        <div className="col-md-6 input_options">
          <label htmlFor="last_name">Apellidos</label>
          <Custom_Input type="text" name="last_name" handler={inputHandler} />
        </div>
        <div className="col-md-6 input_options">
          <label htmlFor="date">Fecha de Nacimiento</label>
          <Custom_Input type="text" name="date" handler={inputHandler} />
        </div>
        <div className="col-md-6 input_options">
          <label htmlFor="phone">Telefono</label>
          <Custom_Input type="text" name="phone" handler={inputHandler} />
        </div>
        <div className="col-md-6 input_options">
          <label htmlFor="email">Email</label>
          <Custom_Input type="text" name="email" handler={inputHandler} />
        </div>
        <div className="col-md-6 input_options">
          <label htmlFor="nickname">Nombre de Usuario</label>
          <Custom_Input type="text" name="nickname" handler={inputHandler} />
        </div>
        <div className="col-md-6 input_options">
          <label htmlFor="password">Contraseña</label>
          <Custom_Input type="password" name="password" handler={inputHandler} />
        </div>
        <div className="col-md-12">
          <Custom_Button
            name={"Registrar"}
            clickHandler={registerHand}
            data={registerData}
          />
        </div>
      </Row>
    </Container>
  </div>
</div>

  );
};
