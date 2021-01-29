import React, { Fragment, useEffect, useState } from "react";
import EditDependencia from "./EditDependencia";

const ListDependencia=()=>{

    const [dependencias, setDependencias] =useState([]);
    
    const deleteDependencia = async (id)  =>{
        try {
            const deleteDependencia = await fetch(`http://localhost:5000/dependencias/${id}`,{
                method: "DELETE" 
            });

            setDependencias(dependencias.filter(dependencias =>dependencias.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    
    
    const getDependencia = async() =>{
        try {
            
            const response = await fetch("http://localhost:5000/dependencias");
            const jsonData = await response.json();

            setDependencias(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }
    
    useEffect(() =>{
        getDependencia();
    },[]);

    return(
        <Fragment>
            <table class="table mt-5" text-center>
                <thead>
                    <tr>
                        <th>ID Dependencia</th>
                        <th>Nombre</th>
                        <th>Centro costo</th>
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
                    {dependencias.map(dependencias =>(
                        <tr key={dependencias.id}>
                            <td>{dependencias.id}</td>
                            <td>{dependencias.nombre}</td>
                            <td>{dependencias.centro_costo}</td>
                            <td>
                               <EditDependencia dependencia = {dependencias}/>
                            </td>
                            <td>
                                <button className= "btn btn-danger"onClick={() => deleteDependencia(dependencias.id)}>
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

export default ListDependencia;