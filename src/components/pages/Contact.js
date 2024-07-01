import { useState } from "react";
import ContactForm from "./ContactForm"
import emailjs from '@emailjs/browser'
import Message from "../layout/Message"

function Contact(){
    const [message,setMessage] = useState('');

    function enviarEmail(dados){
        console.log(dados)

        var templateParams = {
            name: dados.name,
            email: dados.email,
            mensagem: dados.mensagem,
          };
          
          
          emailjs.send('service_zegun69', 'template_0f7k3lo', templateParams, 'iRLa87Z5eHfWj2McW')
          .then((response) => {
                setMessage('Enviado com sucesso');  
                console.log('SUCCESS!', response.status, response.text);
            },
            (error) => {
              console.log('FAILED...', error);
            },
          );
    }
    
    return (
        <>
        { message && <Message type="success" msg={message} />}
         <ContactForm handleSubmit={enviarEmail} />
        </>
       
    )
}

export default Contact