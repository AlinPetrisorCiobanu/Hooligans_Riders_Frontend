import {Navigate , Route ,Routes} from "react-router-dom"
import { Home } from "../Home/Home"
import { Login } from "../Login/Login"
import { Register } from "../Register/Register"
import { Profile } from "../Profile/Profile"
import { Events } from "../Events_Routes/Events_Routes"
import { Creator_Events } from "../Events_Routes/Events_Routes_Options"

export const Body = () =>{
    return(
    <Routes>
        <Route path="*" element={<Navigate to = "/"/> }/>
        <Route path="/" element={<Home/>}/>
        <Route path="/login_user" element={<Login/>}/>
        <Route path="/register_user" element={<Register/>}/>
        <Route path="/profile_user" element={<Profile/>}/>
        <Route path="/eventos_rutas" element={<Events/>}/>
        <Route path="/eventos_rutas_creator" element={<Creator_Events/>}/>
        <Route path="/galeria" element={<Events/>}/>
    </Routes>
    )
}