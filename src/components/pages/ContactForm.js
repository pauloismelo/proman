import { useState } from 'react'
import Input from '../form/Input.js'
import TextArea from '../form/TextArea.js';
import SubmitButton from '../form/SubmitButton.js';
import styles from './ContactForm.module.css'


function ContactForm({handleSubmit}){
    const [dados, setDados] = useState([]);

    const submit = (e) => {
        e.preventDefault()
        //console.log(dados)
        handleSubmit(dados)
    }

    function handlechange(e){
        setDados({...dados, [e.target.name] : e.target.value});
    }
    
    return (
        <div className={styles.form_container}>
            <h1>Contato</h1>
            <p>Envie sua mensagem</p>
            <form onSubmit={submit} >
                <Input type='text' text='Seu Nome' name='name' placeholder='Insira o seu nome' handleOnChange={handlechange} />

                <Input type='text' text='Seu Email' name='email' placeholder='Insira o seu email' handleOnChange={handlechange} />

                <TextArea text='Sua mensagem' name='mensagem' placeholder='Insira a sua mensagem' handleOnChange={handlechange} ></TextArea>

                <SubmitButton text='Enviar Contato'/>
            </form>
        </div>
    )

}

export default ContactForm