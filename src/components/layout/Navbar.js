import {Link, Navigate} from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'
import logo from '../../img/costs_logo.png'
import { useNavigate } from 'react-router-dom'


function Navbar(){
    const navigate = useNavigate();

    const HandleLogout = () => {
        localStorage.clear();
        navigate('/login');
        
    }
    const userlogged = localStorage.getItem("token");
    //console.log('userlogged ',userlogged)
    return(
    <nav className={styles.navbar}>
        <Container>
            <Link to="/">
                <img src={logo} alt='Costs'/>
            </Link>
            {userlogged != null ? 
            <ul className={styles.list}>
                <li className={styles.item}><Link to="/">Home</Link></li>
                <li className={styles.item}><Link to="/newproject">Criar Projeto</Link></li>
                <li className={styles.item}><Link to="/projects">Projetos</Link></li>
                <li className={styles.item}><Link to="/contact">Contato</Link></li>
                <li className={styles.item}><Link onClick={HandleLogout}>Sair</Link></li>
            </ul>
             : 
            ''}

            

        </Container>
        

    </nav>)
}

export default Navbar