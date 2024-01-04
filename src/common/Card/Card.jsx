import { userDate } from "../../pages/userSlice";
import { useSelector } from "react-redux";
import { Custom_Button } from "../Button/Button";

export const Custom_Card = ({ user, modify, deleteTo }) => {
  const userLogued = useSelector(userDate).user;
  return (
    <>
      <div>
        <h1>
          {user.name} {user.last_name}
        </h1>
        {userLogued.role === "user" || userLogued.role === "rider" ? (
          <></>
        ) : (
          <h2>id de usuario: {user.id}</h2>
        )}
        <h2>fecha de nacimiento: {user.date}</h2>
        <h2>telefono: {user.phone}</h2>
        <h2>email: {user.email}</h2>
        <h2>nombre de usuario: {user.nickname}</h2>
        {userLogued.role === "user" || userLogued.role === "rider" ? (
          <></>
        ) : (
          <>
            <h2>rol: {user.role}</h2>
            <h2>borrado: {user.is_active}</h2>
            <h2>confirmado: {user.confirmed}</h2>
          </>
        )}
        <Custom_Button name={"modificar"} clickHandler={modify} />
        <Custom_Button name={"borrar"} clickHandler={deleteTo} />
      </div>
    </>
  );
};
