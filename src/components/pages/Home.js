import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import homes from '../../img/home.png'
import LinkButton from '../layout/LinkButton'

function Home(){
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Proman</span></h1>
            <p>Gerenciar os seus projetos com nossa ferramenta</p>
            <LinkButton to='/newproject' text='Criar Projeto'/>
            <img src={homes}/>
        </section>
    )
}

export default Home