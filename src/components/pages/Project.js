import{parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import Message from '../layout/Message'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'
import  Axios  from 'axios'

function Project(){

    const { id }  = useParams()
    //console.log(id)
    //setProject é uma funcao que seta dados dentro de project
    
    const [listProjects, setlistProjects] = useState();
    const [services, setServices] = useState([])
    const [showProjectForm, setshowProjectForm] = useState(false)
    const [showServiceForm, setshowServiceForm] = useState(false)
    const [message, setmessage] = useState()
    const [Type, setType] = useState()
   
   

    useEffect(()=>{
                
            Axios.get(`http://localhost:3001/projects/${id}`)
            .then((response)=> {
                //console.log(response.data)
                setlistProjects(JSON.parse(JSON.stringify(response.data)))    
            })
            .catch((err) => console.log(err));

            //chama os servicos do projeto em questao
            Axios.get(`http://localhost:3001/services/${id}`)
            .then((response)=> {
                //console.log(response.data)
                setServices(JSON.parse(JSON.stringify(response.data)))    
            })
            .catch((err) => console.log(err));
            
        
        
    },[])
   
    
    
    function editPost(project){
        setmessage('')
        //budget validation
        //console.log(project)
        if (project.budget < project.cost){
            //mensagem
            setmessage('O orçamento nao pode ser menor que o custo do projeto!')
            setType('error')
            return false 
        }
        Axios.put('http://localhost:3001/project', {
            id:project.id,
            name:project.name,
            budget:project.budget,
            category:project.category.name,
        }).then((response)=> {
            //console.log(response.data)
            setshowProjectForm(false)
            //mensagem
            setmessage('Projeto atualizado!')
            setType('success')       
            
        });

    }

    function createService(services){
        
        //custo utilizado do Projeto em questao
        console.log(listProjects[0].cost)

        //newCost = parseFloat(custo) + parseFloat(service.cost);
        console.log(services);
        //validacao de serviços
        const lastService = services[services.length-1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        console.log(lastServiceCost)

        const newCost = parseFloat(listProjects[0].cost) + parseFloat(lastServiceCost)
        console.log(newCost)
        //maximum value validation
        if(newCost>parseFloat(listProjects[0].budget)){
            setmessage('Orçamento Ultrapassado!')
            setType('error')
            services.pop()
            return false
        }

        //adicionar o service cost to project total cost
        listProjects[0].cost=newCost;

        
        Axios.post(`http://localhost:3001/service/`,{
            id_projeto: id,
            name: lastService.name,
            description: lastService.description,
            cost: lastService.cost,
            newCost:newCost,
        })
        .then((response)=> {
            //console.log(response.data)
            setServices(JSON.parse(JSON.stringify(response.data)))   
            setmessage('Serviço adicionado com sucesso!')
            setType('success')
            setshowServiceForm(false)     
        })
        .catch((err) => console.log(err));
        

    }

    function removeService(id_servico,cost){
        console.log(id_servico)
        console.log(cost)
        const servicesUpdate = services.filter(
            (service) =>service.id !== id_servico
        )

        const newCost=parseFloat(listProjects[0].cost) - parseFloat(cost)
        listProjects[0].cost= newCost

        
        
        Axios.put('http://localhost:3001/removeproject', {
            id:id_servico,
            id_projeto:id,
            cost:newCost,
        }).then((response)=> {
            setServices(servicesUpdate)
            setmessage('Serviço removido com sucesso!')
            setType('success')
            
        }).catch((err) => console.log(err));

    }
    
    function toggleProjectForm(){
        setshowProjectForm(!showProjectForm)
    }
    function toggleServiceForm(){
        setshowServiceForm(!showServiceForm)
    }

    
    return (
        <>
        
        {typeof listProjects != "undefined" ?
            listProjects.map((value)=>(
                <div className={styles.project_details} key={value.id}>
                    <Container customClass="column">
                        {message && <Message type={Type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>
                                Projeto: {value.name}
                            </h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto':'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span> {value.category}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: </span> R$ {value.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado </span> R$ {value.cost}
                                    </p>
                                </div>
                            ) :(
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} text="Concluir edição" projectData={value}/>
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
                                    <ServiceForm handleSubmit={createService} btnText='Adicionar Serviço' projectData={services} />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length>0 &&
                                services.map((service) => (
                                    <ServiceCard id={service.id} name={service.nome} cost={service.cost} description={service.description} key={service.id} handleRemove={removeService} />
                                ))
                            }
                            {services.length === 0 && <p>Não há serviços cadastrados!</p>}
                        </Container>
                        
                    </Container>
                </div>
            ))
        : 
        <Loading/> 
        }
        
        
        </>
    )
}

export default Project