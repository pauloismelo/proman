import {useEffect, useState} from 'react'

import Axios from "axios";
import Input from '../form/Input.js'
import SubmitButton from '../form/SubmitButton.js'
import Select from '../form/Select.js'
import styles from './ProjectForm.module.css' 

function ProjectForm({handleSubmit, text, projectData}){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        Axios.get(`http://localhost:3001/categories/`)
        .then((response)=> {
            //console.log(response.data)
            setCategories(response.data)
            
        })
        .catch((err) => console.log(err));
        
        
    }, [])

    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handlechange(e){
        setProject({ ...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return(
        
        <form onSubmit={submit} className={styles.form}>
            
                <Input type='text' text='Nome do Projeto' name='name' placeholder='Insira o nome do projeto' handleOnChange={handlechange} value={project.name ? project.name : ''}/>
            
                <Input type='number' text='Orçamento do Projeto' name='budget' placeholder='Insira orçamento total' handleOnChange={handlechange} value={project.budget ? project.budget : ''}/>
            
                <Select name='category_id' text='Selecione a categoria' options={categories} handleOnChange={handleCategory} value={project.category ? project.category : ''}/>
                <SubmitButton text={text}/>
            
        </form>
    )
}

export default ProjectForm