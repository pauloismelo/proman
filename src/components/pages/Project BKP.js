import{v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'
import { Axios } from 'axios'

function Project(){

    const { id }  = useParams()
    //console.log(id)
    //setProject é uma funcao que seta dados dentro de project
    const [project, setProject] = useState();
    const [listProjects, setlistProjects] = useState();
    const [services, setServices] = useState([])
    const [showProjectForm, setshowProjectForm] = useState(false)
    const [showServiceForm, setshowServiceForm] = useState(false)
    const [message, setmessage] = useState()
    const [Type, setType] = useState()
   
   

    useEffect(()=>{
        setTimeout(() => {
            Axios.get(`http://localhost:3001/projects/${id}`)
            .then((response)=> {
                console.log(response.data)
                setlistProjects(response.data)
            })
            .catch((err) => console.log(err));
        }, 30);
        
    })


    function editPost(project){
        setmessage('')
        //budget validation

        if (project.budget < project.cost){
            //mensagem
            setmessage('O orçamento nao pode ser menor que o custo do projeto!')
            setType('error')
            return false 
        }

        fetch(`http://localhost:4000/projects/${project.id}`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(project)
        }).then(resp => resp.json())
        .then((data)=>{
            setProject(data)
            setshowProjectForm(false)
            //mensagem
            setmessage('Projeto atualizado!')
            setType('success')       
        })
        .catch((err)=>console.log(err))
    }

    function createService(project){
        //validacao de serviços
        const lastService = project.services[project.services.length-1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        //maximum value validation
        if(newCost>parseFloat(project.budget)){
            setmessage('Orçamento Ultrapassado!')
            setType('error')
            project.services.pop()
            return false
        }

        //adicionar o service cost to project total cost
        project.cost=newCost

        fetch(`http://localhost:4000/projects/${project.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp)=>resp.json())
        .then((data) => {
            setmessage('Serviço adicionado com sucesso!')
            setType('success')
            setshowServiceForm(false)

        })
        .catch((err)=>console.log(err))

    }

    function removeService(id,cost){

        const servicesUpdate = project.services.filter(
            (service) =>service.id !== id
        )

        const projectUpdated = project

        projectUpdated.services = servicesUpdate
        projectUpdated.cost= parseFloat(projectUpdated.cost) - parseFloat(cost)

        fetch(`http://localhost:4000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdate)
            setmessage('Serviço removido com sucesso!')
            setType('success')
        })
        .catch((err) => console.log(err))


    }
    
    function toggleProjectForm(){
        setshowProjectForm(!showProjectForm)
    }
    function toggleServiceForm(){
        setshowServiceForm(!showServiceForm)
    }

    
    return (
        <>
        
        {project.name ? 
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={Type} msg={message} />}
                <div className={styles.details_container}>
                    <h1>
                        Projeto: {project.name}
                    </h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>
                        {!showProjectForm ? 'Editar Projeto':'Fechar'}
                    </button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Categoria: </span> {project.category.name}
                            </p>
                            <p>
                                <span>Total de Orçamento: </span> R$ {project.budget}
                            </p>
                            <p>
                                <span>Total utilizado </span> R$ {project.cost}
                            </p>
                        </div>
                    ) :(
                        <div className={styles.project_info}>
                            <ProjectForm handleSubmit={editPost} text="Concluir edição" projectData={project}/>
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                    <h2>Adicione um serviço:</h2>
                    <button className={styles.btn} onClick={toggleServiceForm}>
                        {!showServiceForm ? 'Adicionar Serviço':'Fechar'}
                    </button>
                    <div className={styles.project_info}>
                        {showServiceForm && (
                            <ServiceForm handleSubmit={createService} btnText='Adicionar Serviço' projectData={project} />
                        )}
                    </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass="start">
                    {services.length>0 &&
                        services.map((service) => (
                            <ServiceCard id={service.id} name={service.name} cost={service.cost} description={service.description} key={service.id} handleRemove={removeService} />
                        ))
                    }
                    {services.length === 0 && <p>Não há serviços cadastrados!</p>}
                </Container>
                
            </Container>
        </div>
        
        : 
        <Loading/> 
        }
        
        
        </>
    )
}

export default Project