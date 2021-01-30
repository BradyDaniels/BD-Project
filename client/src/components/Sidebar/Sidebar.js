import React from 'react'
import { NavLink } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {

  return(
    <div className ="sidebar-wrapper">
        <hi className="sidebar-header">Bddrip</hi>
        <div className= "sidebar-content recursive">
                <NavLink to="/trabajadores" className="sidebar-text" activeClassName="active-link">Trabajadores</NavLink>
                <NavLink to="/dependencias" className="sidebar-text" activeClassName="active-link">Dependencias</NavLink>
                <NavLink to="/proveedores" className="sidebar-text" activeClassName="active-link">Proveedores</NavLink>
                <NavLink to="/lineas_suministro" className="sidebar-text" activeClassName="active-link">Lineas de Suministro</NavLink>
                <NavLink to="/linea_proveedor" className="sidebar-text" activeClassName="active-link">Linea-Proveedor</NavLink>
                <NavLink to="/items" className="sidebar-text" activeClassName="active-link">Items</NavLink>
        </div>
    </div>
  );  
};


// <NavLink to="/lineas_suministro" className="sidebar-text" activeClassName="active-link">Lineas de Suministro</NavLink>
// <NavLink to="/proveedores" className="sidebar-text" activeClassName="active-link">Proveedores</NavLink>

export default Sidebar;