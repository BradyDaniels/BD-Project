import React, { Fragment, useEffect, useState } from "react";

import EditPrueba from "./EditPrueba";

const ListPruebas = () => {

    const [pruebas, setPruebas] =useState([]);

    //Delete Prueba Function

    const deletePrueba = async (id)  =>{
        try {
            const deletePrueba = await fetch(`http://localhost:5000/pruebas/${id}`,{
                method: "DELETE" 
            });

            setPruebas(pruebas.filter(prueba => prueba.prueba_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    //Get Pruebas Function
    const getPruebas = async() =>{
        try {
            
            const response = await fetch("http://localhost:5000/pruebas");
            const jsonData = await response.json();

            setPruebas(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() =>{
        getPruebas();
    },[]);

    return(
        <Fragment>
            <table class="table mt-5" text-center>
                <thead>
                    <tr>
                        <th>Description</th>
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
                    {pruebas.map(pruebas =>(
                        <tr key={pruebas.prueba_id}>
                            <td>{pruebas.description}</td>
                            <td>
                                <EditPrueba pruebas = {pruebas}/>
                            </td>
                            <td>
                                <button className= "btn btn-danger"onClick={() => deletePrueba(pruebas.prueba_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
        </table>
        </Fragment>
    );
};

export default ListPruebas;
