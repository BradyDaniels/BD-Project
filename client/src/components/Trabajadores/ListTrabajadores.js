import React, { Fragment, useEffect, useState } from "react";
import EditTrabajadores from "./EditTrabajadores";

const Listtrabajador=()=>{

    const [trabajadores, setTrabajadores] =useState([]);
    
    const deleteTrabajador = async (id)  =>{
        try {
            const deletetrabajador = await fetch(`http://localhost:5000/trabajadores/${id}`,{
                method: "DELETE" 
            });

            setTrabajadores(trabajadores.filter(trabajadores =>trabajadores.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    
    
    const getTrabajadores = async() =>{
        try {
            
            const response = await fetch("http://localhost:5000/trabajadores");
            const jsonData = await response.json();

            setTrabajadores(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }
    
    useEffect(() =>{
        getTrabajadores();
    },[]);

    return(
        <Fragment>
            <table class="table mt-5" text-center>
                <thead>
                    <tr>
                        <th>Cedula</th>
                        <th>Dependencia</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                   
                    </tr>
                </thead>
                <tbody>
                    {/*<tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {trabajadores.map(trabajadores =>(
                        <tr key={trabajadores.cedula}>
                            <td>{trabajadores.id_dependencia}</td>
                            <td>{trabajadores.nombre}</td>
                            <td>{trabajadores.tipo}</td>
                            <td>
                               <EditTrabajadores trabajadores = {trabajadores}/>
                            </td>
                            <td>
                                <button className= "btn btn-danger"onClick={() => deleteTrabajador(trabajadores.id)}>
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

export default Listtrabajador;