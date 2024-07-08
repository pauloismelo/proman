import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Input from '../form/Input';
import axios from 'axios'

import styles from './login.module.css'
import SubmitButton from '../form/SubmitButton';
import UserService from '../../Services/UserService';
import { Link } from 'react-router-dom';


const userService = new UserService()

function Login() {
    const navigate = useNavigate();
    const [acesso, setAcesso] = useState([])

    function handlechange(e){
        setAcesso({ ...acesso, [e.target.name]: e.target.value})
        //console.log(acesso)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            axios.post(`http://localhost:3001/login`,acesso)
            .then((response)=> {
                //console.log(response)
                if (response.data.token){
                    localStorage.setItem("token", response.data.token)
                    alert('Usuario logado com sucesso!');
                    //navegar para a home
                    navigate('/');
                }else{
                    alert('Conta nao encontrada.\nTente novamente!');
                }
                
            })
            .catch((err) => console.log(err));

            /*console.log(acesso)
            const response = await userService.login(acesso);
            console.log('response do login:', response);
            if (response){
                alert('Usuario logado com sucesso!');
                //navegar para a home
                //navigate('/home');
            }
                */
        } catch (error) {
            
        }
        
    }
    
    return ( 
        <>
        <div className={styles.login_all}>
            <div className={styles.login_container}>
                <form onSubmit={handleSubmit}>
                <h1>Faça seu login</h1>
                <Input type='email' text='Login' name='email' placeholder='Insira seu login' handleOnChange={handlechange} />
                <Input type='password' text='Senha' name='password' placeholder='Insira sua senha' handleOnChange={handlechange} />

                <SubmitButton text='Acessar'/>
                <div>
                    Não tem cadastro?
                    <Link to="/cadastro">Clique aqui</Link>
                </div>
                </form>
            </div>
        </div>
        </>
     );
}

export default Login;