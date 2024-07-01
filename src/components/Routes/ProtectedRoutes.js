import React from 'react';
import { useNavigate } from 'react-router-dom'
import UserServices from '../../Services/UserService';

const userService = new UserServices();


const ProtectedRoutes = ({children}) => {
    const navigate = useNavigate();
    const usuarioAutenticado = userService.usuarioAutenticado()
    //console.log('usuarioAutenticado', usuarioAutenticado)
    if (usuarioAutenticado){
        return children;
    }else{
        
        navigate('/login');
    }
    //return usuarioAutenticado ? children : navigate('/login');
}
 
export default ProtectedRoutes;