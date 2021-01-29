import React, { Fragment, useEffect, useState } from "react";
import EditProveedor from "./EditProveedor";

const ListProveedor=()=>{

    const [proveedores, setProveedores] =useState([]);
    
    
    const deleteProveedores = async (rif)  =>{
        try {
            const deleteProveedores = await fetch(`http://localhost:5000/proveedores/${rif}`,{
                method: "DELETE" 
            });

            setProveedores(proveedores.filter(proveedores =>proveedores.rif !== rif));
        } catch (err) {
            console.error(err.message);
        }
    }

    
    
    const getProveedor = async() =>{
        try {
            
            const response = await fetch("http://localhost:5000/proveedores");
            const jsonData = await response.json();

            setProveedores(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }
    
    useEffect(() =>{
        getProveedor();
    },[]);

    return(
        <Fragment>
            <table class="table mt-5" text-center>
                <thead>
                    <tr>
                        <th>RIF</th>
                        <th>Razon Social</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Direccion</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/*<tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {proveedores.map(proveedores =>(
                        <tr key={proveedores.rif}>
                            <td>{proveedores.rif}</td>
                            <td>{proveedores.razon_social}</td>
                            <td>{proveedores.telefono}</td>
                            <td>{proveedores.correo}</td>
                            <td>{proveedores.direccion}</td>
                            <td>
                               <EditProveedor proveedor = {proveedores}/>
                            </td>
                            <td>
                                <button className= "btn btn-danger"onClick={() => deleteProveedores(proveedores.rif)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>
        </Fragment>
    )    
};

export default ListProveedor;