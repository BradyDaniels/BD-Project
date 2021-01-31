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
 import Cotizaciones from "./components/Cotizacion/Cotizaciones"
 import DetalleCompra from "./components/DetalleCompra/DetalleCompra"
 import DetalleRequisicion from "./components/DetalleRequisicion/DetalleRequisicion"
 import OrdenCompra from "./components/OrdenCompra/OrdenCompra"
 import OrdenRespuesta from "./components/OrdenRespuesta/OrdenRespuesta"
 import ProveedorCotizacion from "./components/ProveedorCotizacion/ProveedorCotizacion"
 import ProveedorOrden from "./components/ProveedorOrden/ProveedorOrden"
 import RequisicionCotizacion from "./components/RequisicionCotizacion/RequisicionCotizacion"
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
                <Route path="/cotizaciones" component ={Cotizaciones}/>
                <Route path="/detalle_compra" component ={DetalleCompra}/>
                <Route path="/detalle_requisicion" component ={DetalleRequisicion}/>
                <Route path="/orden_compra" component ={OrdenCompra}/>
                <Route path="/orden_respuesta" component ={OrdenRespuesta}/>
                <Route path="/proveedor_cotizacion" component ={ProveedorCotizacion}/>
                <Route path="/proveedor_orden" component ={ProveedorOrden}/>
                <Route path="/requisicion_cotizacion" component ={RequisicionCotizacion}/>
            </Switch>
          </div>
        </Router>
   );
 };

export default App;
