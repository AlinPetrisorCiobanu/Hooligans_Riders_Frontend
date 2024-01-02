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