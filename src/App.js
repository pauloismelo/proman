import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/projects';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Project from './components/pages/Project';
import Login from './components/pages/Login';
import ProtectedRoutes from './components/Routes/ProtectedRoutes';




function App() {
  return (
    
    <Router>
      <Navbar/>
      <Container customClass="min_height">
        <Routes>     
          <Route exact path='/' element={
            <ProtectedRoutes>
              <Home/>
            </ProtectedRoutes>
          }/> 
          <Route path='/contact' element={
            <ProtectedRoutes>
              <Contact/>
            </ProtectedRoutes>}
          />
          <Route path='/projects' element={
            <ProtectedRoutes>
              <Projects/>
            </ProtectedRoutes>
          }/>
          <Route path='/company' element={
            <ProtectedRoutes>
              <Company/>
            </ProtectedRoutes>
          }/>
          <Route path='/newproject' element={
            <ProtectedRoutes>
              <NewProject/>
            </ProtectedRoutes>
          }/>    
          <Route path='/project/:id' element={
            <ProtectedRoutes>
              <Project/>
            </ProtectedRoutes>
            }/>     
          <Route path='/login' element={<Login/>}/>     
        </Routes>
      </Container>
      <Footer/>
      
    </Router>
    
  );
}

export default App;
