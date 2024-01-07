import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { userDate } from "../userSlice";
import { Custom_Card } from "../../common/Card/Card";

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

  const modify = () => {
    console.log("modificar")
  }
  const deleteTo = () => {
    console.log("borrar")
  }

  return (
    <div className="Container_div_Principal">
      <div>
        <Custom_Card user={user} modify={modify} deleteTo={deleteTo}/>
      </div>
    </div>
  );
};
