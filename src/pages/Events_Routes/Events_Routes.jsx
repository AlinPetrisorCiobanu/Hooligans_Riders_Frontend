import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDate } from "../userSlice";
import { getEvents } from "../../service/apiCalls";

export const Events = () => {
  //declaro constantes
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const [events, setEvents] = useState([]);

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
    getEvents(token)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <>
      {events.map((event) => {
        const userData = event.users_data[0]
        return (
          <div key={event.id}>
            <h1>{event.id}</h1>
            <h1>{event.id_user}</h1>
            <h2>{event.img}</h2>
            <h2>{event.maps}</h2>
            <h2>{event.kms}</h2>
            <h2>{event.participants}</h2>
            <h2>{event.is_active}</h2>
            <h3>{userData ? userData.name : 'Nombre no disponible'}</h3>
          </div>
        );
      })}
      <div>
        <h1>Eventss</h1>
      </div>
    </>
  );
};
