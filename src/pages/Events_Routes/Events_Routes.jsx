import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDate } from "../userSlice";
import { getEvents } from "../../service/apiCalls";
import { Custom_Pagination } from "../../common/Pagination/Pagination";

export const Events = () => {
  //declaro constantes
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const [events, setEvents] = useState([]);
  const [pages, setPages] = useState("");
  const [curent_page, setCurent_Page] = useState(1);

  //si no tienes token te manda a la pagina de inicio
  const tokenExist = (tokenEx) => {
    if (!tokenEx) {
      navigate("/login_user");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  useEffect(() => {
    getEvents(token, curent_page)
      .then((res) => {
        setEvents(res.data);
        setPages(res.last_page);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [curent_page]);

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

  // console.log(events)

  return (
    <>
      {events.map((event) => {
        let userData;
        if (event.users_data) {
          userData = event.users_data[0];
        }
        return (
          <div key={event.id}>
            <h1>{event.id}</h1>
            <h1>{event.id_user}</h1>
            {event.img ? (
              <img src={event.img} alt="imagen database" />
            ) : (
              <img src="ruta/a/imagen/default.jpg" alt="imagen por defecto" />
            )}
            <h2>{event.maps}</h2>
            <h2>{event.kms}</h2>
            <h2>{event.participants}</h2>
            <h2>{event.is_active}</h2>
            <h3>{userData ? userData.name : "Nombre no disponible"}</h3>
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
