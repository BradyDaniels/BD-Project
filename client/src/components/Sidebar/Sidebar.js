import React from 'react'
import { NavLink } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {

  return(
    <div className ="sidebar-wrapper">
        <hi className="sidebar-header">Bddrip</hi>
        <div className= "sidebar-content recursive">
                <NavLink to="/dependencias" className="sidebar-text" activeClassName="active-link">Dependencias</NavLink>
                <NavLink to="/trabajadores" className="sidebar-text" activeClassName="active-link">Trabajadores</NavLink>
                <NavLink to="/proveedores" className="sidebar-text" activeClassName="active-link">Proveedores</NavLink>
                <NavLink to="/lineas_suministro" className="sidebar-text" activeClassName="active-link">Lineas de Suministro</NavLink>
                <NavLink to="/items" className="sidebar-text" activeClassName="active-link">Items</NavLink>
                <NavLink to="/linea_proveedor" className="sidebar-text" activeClassName="active-link">Linea-Proveedor</NavLink>
                <NavLink to="/Requisicion" className="sidebar-text" activeClassName="active-link">Requisicion</NavLink>
                <NavLink to="/cotizaciones" className="sidebar-text" activeClassName="active-link">Cotizaciones</NavLink>
                <NavLink to="/respuestas" className="sidebar-text" activeClassName="active-link">Respuestas</NavLink>
                <NavLink to="/orden_compra" className="sidebar-text" activeClassName="active-link">Ordenes de Compra</NavLink>
                {/* <NavLink to="/detalle_requisicion" className="sidebar-text" activeClassName="active-link">Detalles de Requisicion</NavLink>
                <NavLink to="/orden_respuesta" className="sidebar-text" activeClassName="active-link">Ordenes-Respuestas</NavLink>
                <NavLink to="/proveedor_cotizacion" className="sidebar-text" activeClassName="active-link">Proveedor-Cotizacion</NavLink>
                <NavLink to="/proveedor_orden" className="sidebar-text" activeClassName="active-link">Proveedor-Ordenes</NavLink>
                <NavLink to="/requisicion_cotizacion" className="sidebar-text" activeClassName="active-link">Requisicion-Cotizacion</NavLink>
                <NavLink to="/detalle_compra" className="sidebar-text" activeClassName="active-link">Detalles de Compra</NavLink> */}
        </div>
    </div>
  );  
};


// <NavLink to="/lineas_suministro" className="sidebar-text" activeClassName="active-link">Lineas de Suministro</NavLink>
// <NavLink to="/proveedores" className="sidebar-text" activeClassName="active-link">Proveedores</NavLink>

export default Sidebar;