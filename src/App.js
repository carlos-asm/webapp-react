import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//Componente Login
//import Login from './components/login/Login';

//Componentes fijos
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';

//Componentes Dinámicos
import Prueba from './components/contents/prueba/Prueba';
import Slide from './components/contents/slide/Slide';
import Articulos from './components/contents/articulos/Articulos';
import Galeria from './components/contents/galeria/Galeria';
import Usuario from './components/contents/usuario/Usuario';
import Error404 from './components/contents/error404/Error404';

function App() {
  //const auth=true;
  // if(!auth){
  //   return(
  //     <Login/>
  //   )
  // }

  return (
    <div className="sidebar-mini">
      <div className="wrapper">
        <Header/>
        <Sidebar/>
        <BrowserRouter>
          <Switch>
            <Route exact path= "/" component={Prueba}/>
            <Route exact path= "/slide" component={Slide}/>
            <Route exact path= "/galeria" component={Galeria}/>
            <Route exact path= "/articulos" component={Articulos}/>
            <Route exact path= "/usuarios" component={Usuario}/>
            <Route exact component={Error404}/>
          </Switch>
        </BrowserRouter>
        <Footer/>
      </div>
      
    </div>
  );
}

export default App;
