import { Custom_Button } from "../../common/Button/Button";
import { Custom_Input } from "../../common/Input/Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDate } from "../userSlice";
import { newMessage } from "../../service/apiCalls";

export const Contacto = () => {
  //declaro constantes
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const [newMessageData, setNewMessageData] = useState({
    name: "",
    last_name: "",
    data: "",
    message: "",
  });


  //si no tienes token te manda a la pagina de inicio
  const tokenExist = (tokenEx) => {
    if (!tokenEx) {
      navigate("/login_user");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  //guardo los datos de los inputs
  const inputHandler = (e) => {
    setNewMessageData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createNewMessage = (data) => {
    newMessage(token, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
        <div>
          <div>
            <label htmlFor="name">Nombre</label>
            <Custom_Input type="text" name="name" handler={inputHandler} />
          </div>
          <div>
            <label htmlFor="last_name">Apellidos</label>
            <Custom_Input type="text" name="last_name" handler={inputHandler} />
          </div>
          <div>
            <label htmlFor="data">Detalle</label>
            <Custom_Input type="text" name="data" handler={inputHandler} />
          </div>
          <div>
            <label htmlFor="message">Mensaje</label>
            <Custom_Input type="text" name="message" handler={inputHandler} />
          </div>
          <div>
            <Custom_Button
              name={"Enviar"}
              clickHandler={createNewMessage}
              data={newMessageData}
            />
          </div>
        </div>
    </>
  );
};
