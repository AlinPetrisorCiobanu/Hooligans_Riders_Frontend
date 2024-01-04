import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userDate } from "../userSlice";
import { Custom_Button } from "../../common/Button/Button";

export const Profile = () => {
  //declaro constantes
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const user = useSelector(userDate).user;

  //si no tienes token te manda a la pagina de inicio
  const tokenExist = (tokenEx) => {
    if (!tokenEx) {
      navigate("/login_user");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  return (
    <>
      <div>
        {user.role === "user" || user.role === "rider" ? (
          <div>
            <h1>
              {user.name} {user.last_name}
            </h1>
            <h2>id de usuario: {user.id}</h2>
            <h2>fecha de nacimiento: {user.date}</h2>
            <h2>telefono: {user.phone}</h2>
            <h2>email: {user.email}</h2>
            <h2>nombre de usuario: {user.nickname}</h2>
            <Custom_Button name={"modificar"}/>
            <Custom_Button name={"borrar"}/>
          </div>
        ) : (
          <div>
            <h1>
              {user.name} {user.last_name}
            </h1>
            <h2>id de usuario: {user.id}</h2>
            <h2>fecha de nacimiento: {user.date}</h2>
            <h2>telefono: {user.phone}</h2>
            <h2>email: {user.email}</h2>
            <h2>nombre de usuario: {user.nickname}</h2>
            <h2>rol: {user.role}</h2>
            <h2>borrado: {user.is_active}</h2>
            <h2>confirmado: {user.confirmed}</h2>
            <Custom_Button name={"modificar"}/>
            <Custom_Button name={"borrar"}/>
          </div>
        )}
      </div>
    </>
  );
};
