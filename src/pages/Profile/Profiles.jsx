import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userDate } from "../userSlice";
import { Custom_Card } from "../../common/Card/Card";
import { getDataUsers } from "../../service/apiCalls";

export const Profiles = () => {
  //declaro constantes
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const user = useSelector(userDate).user;
  const [users, setUsers] = useState([]);

  //si no tienes token te manda a la pagina de inicio
  const tokenExist = (tokenEx) => {
    if (!tokenEx || user.role === "user" || user.role === "rider") {
      navigate("/login_user");
    }
  };
  useEffect(() => {
    tokenExist(token);
    getDataUsers(token).then((res) => {
      setUsers(res.data);
    });
  }, [token]);

  const modify = () => {
    console.log("modificar");
  };
  const deleteTo = () => {
    console.log("borrar");
  };

  return (
    <>
      {users.map((user) => {
        return (
          <div key={user.id}>
            <Custom_Card user={user} modify={modify} deleteTo={deleteTo} />
          </div>
        );
      })}
    </>
  );
};
