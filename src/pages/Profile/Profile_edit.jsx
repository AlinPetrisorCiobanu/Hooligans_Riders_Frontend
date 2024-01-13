import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userDate, userLogin } from "../userSlice";
import { Custom_Modal } from "../../common/Modal/Modal";
import { Custom_Input } from "../../common/Input/Input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { Custom_Button } from "../../common/Button/Button";

import "./Profile.scss";
import { getDataUserID, modifyUserID } from "../../service/apiCalls";

export const Profile_Edit = () => {
  //declaro constantes
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(userDate).credentials;
  const [user , setUser] = useState ({});
  const [modalShow, setModalShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [date, setDate] = useState(
    dayjs(user.date, { dateFormat: "YYYY-MM-DD" }).toDate()
  );
  const [modifyData, setModifyData] = useState({
    name: "",
    last_name: "",
    date: "",
    phone: "",
    email: "",
    nickname: "",
    password: "",
  });
  const [modifyDataAdmin, setModifyDataAdmin] = useState({
    name: "",
    last_name: "",
    date: "",
    phone: "",
    email: "",
    nickname: "",
    password: "",
    role: "",
    is_active: "",
    confirmed: "",
  });
  const user_logued = useSelector(userDate).user;
  const user_id = useSelector(userDate).ID_Perfil_to_modify;


  //si no tienes token te manda a la pagina de inicio
  const tokenExist = (tokenEx) => {
    if (!tokenEx) {
      navigate("/");
    }
  };
  useEffect(() => {
    tokenExist(token);
  }, [token]);

  useEffect(()=>{
      if(user_id){
        getDataUserID(token , user_id)
        .then((res)=>{
            setUser(res)
        })
        .catch((err)=>{
            console.log(err)
        })
      }else{
        setUser(user_logued)
      }
  },[user_id])

  //guardo los datos de los inputs
  const inputHandler = (e) => {
      if(user_logued.role === "user" || user_logued.role === "rider"){
          setModifyData((prevState) => ({
              ...prevState,
              [e.target.name]: e.target.value,
            }));
        }else{
            setModifyDataAdmin((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const cancelHand = () => {
        if(user_id){
            dispatch(userLogin({ ID_Perfil_to_modify: "" }));
            navigate("/profile_admin_users");
        }else{
            navigate("/profile_user");
        }
    };

    const modifyHand = (data) => {
        console.log(data)
        // data.date = date;
        let dataToSend = {}
        if(data.name !== "" ){dataToSend.name = data.name}
        if(data.last_name !== "" ){dataToSend.last_name = data.last_name}
        if(data.date !== "" ){dataToSend.date = data.date}
        if(data.phone !== "" ){dataToSend.phone = data.phone}
        if(data.email !== "" ){dataToSend.email = data.email}
        if(data.nickname !== "" ){dataToSend.nickname = data.nickname}
        if(data.password !== "" ){dataToSend.password = data.password}
        if(data.role !== "" ){dataToSend.role = data.role}
        if(data.is_active !== "" ){dataToSend.is_active = data.is_active}
        if(data.confirmed !== "" ){dataToSend.confirmed = data.confirmed}
        
        modifyUserID(token , user.id , dataToSend )
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
    };

  const checkError = () => {
    console.log("modificar");
  };

  return (
    <>
      <Custom_Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        confirm={() => setConfirm(true)}
      />

      <div className="Container_div_Principal d-flex justify-content-center align-items-center text-center">
        <div className="container_card">
          {user_logued.role === "user" || user_logued.role === "rider" ? (
            <>
              <h2>Modificar Perfil</h2>
              <hr />
              <div>
                <label htmlFor="name" className="mb-2">
                  <h4>Nombre : {user.name}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="name"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="last_name" className="mb-2">
                  <h4>Apellidos : {user.last_name}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="last_name"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="date" className="mb-2">
                  <h4>Fecha de Nacimiento : </h4>
                </label><br />
                <DatePicker
                  className="date_picker_custom date_picker_error text-center"
                  selected={date}
                  name="date"
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="phone" className="mb-2">
                  <h4>Telefono : {user.phone}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="phone"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2">
                  <h4>Email : {user.email}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="email"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="nickname" className="mb-2">
                  <h4>Nombre de Usuario : {user.nickname}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="nickname"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2">
                  <h4>Contraseña : </h4>
                </label>
                <Custom_Input
                  type="text"
                  name="password"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div className="mb-3">
                <Custom_Button name={"Modificar"} clickHandler={modifyHand} data={modifyData} />
                <Custom_Button name={"Cancelar"} clickHandler={cancelHand} />
              </div>
            </>
          ) : (
            <>
              <h2>Perfil : {user.id}</h2>
              <div>
                <label htmlFor="name" className="mb-2">
                  <h4>Nombre : {user.name}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="name"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="last_name" className="mb-2">
                  <h4>Apellidos : {user.last_name}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="last_name"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="date" className="mb-2">
                  <h4>Fecha de Nacimiento : </h4>
                </label>
                <DatePicker
                  className="date_picker_custom date_picker_error text-center"
                  selected={date}
                  name="date"
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2">
                  <h4>Telefono : {user.phone}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="phone"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2">
                  <h4>Email : {user.email}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="email"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="nickname" className="mb-2">
                  <h4>Nombre de Usuario : {user.nickname}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="nickname"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-2">
                  <h4>Contraseña : </h4>
                </label>
                <Custom_Input
                  type="text"
                  name="password"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="role" className="mb-2">
                  <h4>Rol : {user.role}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="role"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="is_active" className="mb-2">
                  <h4>Borrado : {user.is_active}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="is_active"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div>
                <label htmlFor="confirmed" className="mb-2">
                  <h4>Confirmado : {user.confirmed}</h4>
                </label>
                <Custom_Input
                  type="text"
                  name="confirmed"
                  handler={inputHandler}
                  handlerError={checkError}
                  custom={"errors"}
                />
              </div>
              <div className="mb-3">
                <Custom_Button name={"Modificar"} clickHandler={modifyHand} data={modifyDataAdmin} />
                <Custom_Button name={"Cancelar"} clickHandler={cancelHand} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
