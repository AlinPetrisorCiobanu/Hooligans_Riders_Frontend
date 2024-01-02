import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { login } from "../../service/apiCalls";
import "./Login.scss"
import { userDate, userLogin } from "../userSlice";

export const Login = () => {
  //declaro constantes
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
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
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //comprueba en la base de datos si email y pass estan bien y guardo el token en redux
  const loginHand = (data) => {
    if(
      loginData.nickname !== ""||
      loginData.password !== ""
    ){
      login(data)
      .then((res) => {
        const token = res.token;
        dispatch(userLogin({ credentials: token }));
        if (token) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err)); 
    }else{
      // setUserError("campos vacios")
      console.log('error')
    }
   
  };

    return (
      <div className="login_html">
        
          <h1>Login</h1>
          <div>
            <label htmlFor="nickname">UserName</label>
            <input type="text" name="nickname" onChange={(e)=>inputHandler(e)}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" onChange={(e)=>inputHandler(e)}/>
          </div>
          <div>
            <button onClick={()=>(loginHand(loginData))}>Login</button>
          </div>
        
      </div>
    );
  };
  