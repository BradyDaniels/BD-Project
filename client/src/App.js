import React, { Fragment, useEffect, useState } from 'react';
//import './App.css';

import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

//Components
import Trabajadores from "./components/Trabajadores/Trabajadores"
import Dependencias from "./components/Dependencia/Dependencia"
import Lineas from "./components/LineadeSuministro/LineaDeSuministro"
import Proveedores from "./components/Proveedor/Proveedor"
import Sidebar from "./components/Sidebar/Sidebar"

 const App = () => {
   return(
        <Router>
          <div className= 'app-wrapper'>
            <Sidebar/>
            <Switch>
                <Route path="/trabajadores" component ={Trabajadores}/>
                <Route path="/dependencias" component ={Dependencias}/>
                <Route path="/lineas_suministro" component ={Lineas}/>
                <Route path="/proveedores" component ={Proveedores}/>
            </Switch>
          </div>
        </Router>
   );
 };

export default App;
