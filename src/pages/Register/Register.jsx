import { useDispatch, useSelector } from "react-redux";
import { userDate } from "../userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Custom_Input } from "../../common/Input/Input";
import { register } from "../../service/apiCalls";

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
      navigate("/");
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
    console.log(data)
    register(data)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

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
        <label htmlFor="date">Fecha de Nacimiento</label>
        <Custom_Input type="text" name="date" handler={inputHandler} />
      </div>
       <div>
        <label htmlFor="phone">Telefono</label>
        <Custom_Input type="text" name="phone" handler={inputHandler} />
      </div>
       <div>
        <label htmlFor="email">Email</label>
        <Custom_Input type="text" name="email" handler={inputHandler} />
      </div>
       <div>
        <label htmlFor="nickname">Nombre de Usuario</label>
        <Custom_Input type="text" name="nickname" handler={inputHandler} />
      </div>
       <div>
        <label htmlFor="password">Contraseña</label>
        <Custom_Input type="text" name="password" handler={inputHandler} />
      </div>
      <div>
        <button onClick={() => registerHand(registerData)}>Registrar</button>
      </div>
    </div>
     
    </>
  );
};
