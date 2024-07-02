import axios from 'axios'

export default class UserService{

    constructor (){
        this.axios = axios.create({
            baseURL:'http://localhost:3001'
        })
    }

    async login(dados) {
        axios.post(`http://localhost:3001/login`,dados)
        .then((response)=> {
            //console.log(response)
            localStorage.setItem("token", response.data.token)
            
            console.log('respon: ',response)
            return response
        })
        .catch((err) => console.log(err));
    }

    usuarioAutenticado () {
        return localStorage.getItem("token") != undefined ? true : false
        // return typeof localStorage.getItem("token")
    }
    

}