import axios from 'axios'

export default class UserService{

    constructor (){
        this.axios = axios.create({
            baseURL:'http://localhost:3001'
        })
    }

    /*
    async login(dados) {
        axios.get(`http://localhost:3001/login/${dados.email}/${dados.password}`)
        .then((response)=> {
            console.log(response.data[0].email)
            localStorage.setItem("nome", response.data.email)
            localStorage.setItem("password", response.data.password)
            localStorage.setItem("token", response.token)

        })
        .catch((err) => console.log(err));
    }
    */

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