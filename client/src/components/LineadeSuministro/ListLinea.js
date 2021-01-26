import React, { Fragment, useEffect, useState } from "react";

import EditLinea from "./EditLinea";

const ListLinea = () => {

    const [lineas, setLineas] =useState([]);

    //Delete Prueba Function

    const deleteLineas = async (id)  =>{
        try {
            const deleteLineas = await fetch(`http://localhost:5000/lineas_suministro/${id}`,{
                method: "DELETE" 
            });

            setLineas(lineas.filter(lineas => lineas.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    //Get Pruebas Function
    const getLineas = async() =>{
        try {
            
            const response = await fetch("http://localhost:5000/lineas_suministro");
            const jsonData = await response.json();

            setLineas(jsonData);

        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() =>{
        getLineas();
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
                    {lineas.map(lineas =>(
                        <tr key={lineas.id}>
                            <td>{lineas.descripcion}</td>
                            <td>
                                <EditLinea lineas = {lineas}/>
                            </td>
                            <td>
                                <button className= "btn btn-danger"onClick={() => deleteLineas(lineas.id)}>
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

export default ListLinea;
