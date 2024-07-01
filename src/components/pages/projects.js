import { useLocation } from "react-router-dom"

import Message from "../layout/Message"

import styles from './projects.module.css'
import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"
import Loading from "../layout/Loading"
import Axios from 'axios'

function Projects(){

    const [listProjects, setlistProjects] = useState();
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setprojectMessage] = useState('')
    const [Type, setType] = useState()

    //console.log(listProjects)


    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }
    useEffect(()=>{
        setTimeout(() => {
            Axios.get("http://localhost:3001/projects/")
            
            .then((response)=> {
                setlistProjects(response.data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err));
          
        }, 300);
        
    },[])

    
    
    function removeProject(id){
        Axios.delete(`http://localhost:3001/project/${id}`)
        .then(() =>{
            setprojectMessage('Projeto Removido com sucesso!')
            setlistProjects(listProjects.filter((item) =>item.id !== id))
            //message
            
        }).catch((err) => console.log(err))
        
    }

    
    return (
    <div className={styles.project_container}>
        <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to='/newproject' text='Criar Projeto'/>
        </div>
        {message && <Message type="success" msg={message} />}
        {projectMessage && <Message type="success" msg={projectMessage} />}
        <Container customClass="start">
            
            {typeof listProjects != "undefined" &&
                 listProjects.map((value)=>(
                     
                     <ProjectCard name={value.name} id={value.id} budget={value.budget} category={value.category}
                    key={value.id}
                    handleRemove={removeProject} listProjects={listProjects}
                    setlistProjects={setlistProjects}/>
                 ))
            }
           

            

            {!removeLoading && <Loading/>}
            {removeLoading && listProjects.length === 0 &&(
                <p>Nao há projetos cadastrados!</p>
            )

            }
        </Container>
    </div>
   
    )
}

export default Projects