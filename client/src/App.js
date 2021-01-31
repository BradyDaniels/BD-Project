import React, { Fragment, useEffect, useState } from 'react';
//import './App.css';

import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';

//Components
 import Trabajadores from "./components/Trabajadores/Trabajadores"
 import Dependencias from "./components/Dependencia/Dependencia"
 import Proveedores from "./components/Proveedores/Proveedores"
 import Lineas from "./components/LineaSuministro/Linea"
 import Items from "./components/Item/Item"
 import LineaProveedor from "./components/LineaProveedor/LineaProveedor"
// import Lineas from "./components/LineadeSuministro/LineaDeSuministro"
// import Proveedores from "./components/Proveedor/Proveedor"
 import Sidebar from "./components/Sidebar/Sidebar"

 const App = () => {
   return(
        <Router>
          <div className= 'app-wrapper'>
            <Sidebar/>
            <Switch>
                <Route path="/trabajadores" component ={Trabajadores}/>
                <Route path="/dependencias" component ={Dependencias}/>
                <Route path="/proveedores" component ={Proveedores}/>
                <Route path="/lineas_suministro" component ={Lineas}/>
                <Route path="/items" component ={Items}/>
                <Route path="/linea_proveedor" component ={LineaProveedor}/>
                {/* <Route path="/lineas_suministro" component ={Lineas}/>
                <Route path="/proveedores" component ={Proveedores}/> */}
            </Switch>
          </div>
        </Router>
   );
 };

export default App;
