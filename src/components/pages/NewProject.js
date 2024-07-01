import { useNavigate } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm'
import styles from './NewProject.module.css'
import Axios from 'axios'

function NewProject(){

    //const history = useHistory()
    const navigate = useNavigate();

    function createPost(project){
        //initialize cost and services
        //console.log(project.name)
        project.cost = 0;
        project.services = [];

        Axios.post('http://localhost:3001/project',{
            name: project.name,
            budget: project.budget,
            category: project.category,
            cost: project.cost,
        })
        .then(() => {
            //Como é um post nao retorna em array em caso de sucesso
            navigate('/projects', { state: {message: "Projeto Criado com sucesso!"} } );
        }).catch((err) => {
            console.log(err)
        });
        
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto!</h1>
            <p>Crie seu projeto</p>
            <ProjectForm handleSubmit={createPost} text="Criar Projeto"/>
        </div>
    )
}

export default NewProject