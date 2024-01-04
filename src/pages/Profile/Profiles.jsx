import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userDate } from "../userSlice";
import { Custom_Card } from "../../common/Card/Card";
import { getDataUsers } from "../../service/apiCalls";
import { Custom_Pagination } from "../../common/Pagination/Pagination";

export const Profiles = () => {
  //declaro constantes
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const user = useSelector(userDate).user;
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState("");
  const [curent_page, setCurent_Page] = useState(1);

  //si no tienes token te manda a la pagina de inicio
  const tokenExist = (tokenEx) => {
    if (!tokenEx || user.role === "user" || user.role === "rider") {
      navigate("/login_user");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  useEffect(() => {
    getDataUsers(token, curent_page).then((res) => {
      setUsers(res.data.data);
      setPages(res.data.last_page);
    });
  }, [curent_page]);

  const modify = () => {
    console.log("modificar");
  };
  const deleteTo = () => {
    console.log("borrar");
  };

  const pagination = (data) => {
    const cont = curent_page;
    if (data === "first_page") {
      setCurent_Page(1);
    } else if (data === "prev") {
      setCurent_Page(cont - 1);
    } else if (data === "next") {
      setCurent_Page(cont + 1);
    } else if (data === "last_page") {
      setCurent_Page(cont + 1);
    } else {
      setCurent_Page(data);
    }
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
      <Custom_Pagination
        pages={pages}
        curent_page={curent_page}
        handlerPages={pagination}
      />
    </>
  );
};
