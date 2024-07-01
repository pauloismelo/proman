
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer(){

    return(
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li><FaFacebook/></li>
                <li><FaInstagram/></li>
                <li><FaLinkedin/></li>
            </ul>
            <p className={styles.copy_right}><span>&copy; 2024 - <a href='https://www.atualizarinformatica.com.br' target='_blank'>Atualizar Tecnologia</a></span></p>
        </footer>
    )
}

export default Footer