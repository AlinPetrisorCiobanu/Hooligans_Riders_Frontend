import { useDispatch } from "react-redux";
import { userLogin } from "../userSlice";
import { useNavigate } from "react-router-dom";

export const Logout= () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    dispatch(userLogin({ credentials: ""}));
    navigate("/");

    return (
      <>
        <div>
          <h1>Profile</h1>
        </div>
      </>
    );
  };