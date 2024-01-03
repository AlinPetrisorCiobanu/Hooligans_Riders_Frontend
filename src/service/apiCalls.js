import axios from "axios";

const url = "http://localhost:8000/api/"

//users login
export const login = (data) => {
    return axios
    .post(`${url}login`,data)
    .then((res)=>{
        return res.data;
    })
    .catch((err)=>{
        return err
    })
};

//extraer datos del usuario de la base de datos
export const getDataUser = (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .get(`${url}user`, config)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };