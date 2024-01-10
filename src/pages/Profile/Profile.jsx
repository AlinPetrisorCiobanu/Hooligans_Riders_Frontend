import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userDate } from "../userSlice";
import { Custom_Card } from "../../common/Card/Card";
import { Custom_Modal } from "../../common/Modal/Modal";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../service/apiCalls";
import "./Profile.scss";

export const Profile = () => {
  //declaro constantes
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(userDate).credentials;
  const user = useSelector(userDate).user;
  const [modalShow, setModalShow] = useState(false);
  const [confirm, setConfirm] = useState(false);

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
    console.log("modificar");
  };
  const deleteTo = () => {
    setModalShow(true);
  };
  useEffect(() => {
    deleteUser(token)
      .then((res) => {
        setModalShow(false)
        dispatch(userLogout({ credentials: "" }));
        navigate("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [confirm]);

  return (
    <>
      <Custom_Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        confirm={() => setConfirm(true)}
      />

      <div className="Container_div_Principal d-flex justify-content-center align-items-center text-center">
        <div className="container_card">
          <Custom_Card
            user={user}
            modify={modify}
            deleteTo={deleteTo}
            custom_card={"custom_card"}
            custom_data_card={"custom_data_card"}
          />
        </div>
      </div>
    </>
  );
};
