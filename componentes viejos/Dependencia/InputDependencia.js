import React, { Fragment, useState } from "react";

    

const InputDepdencia=()=>{
    const [id, setID_Dependencia] = useState ("ID");

    const [nombre, setNombre] = useState ("Nombre");

    const [centro_costo, setCentroCosto] = useState ("Centro Costo");

    const onSubmitForm = async (e) =>{
        e.preventDefault();
        console.log('onSummit')
        try {
            const body = {id,nombre,centro_costo };
            
            const response = await fetch("http://localhost:5000/dependencias",{
                method: "POST",
                headers : { "Content-type": "application/json" },
                body: JSON.stringify(body)

            });
            window.location = "/";
    
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className= "text-center mt-5">
                Dependencias
                
                <form className= "d-flex mt-5" onSubmit={ onSubmitForm }>
                    <input 
                        type= "intenger" 
                        className= "form-control" 
                        value ={id}
                        onChange ={e => setID_Dependencia (parseInt(e.target.value))}
                    />

                    <input 
                        type= "text" 
                        className= "form-control" 
                        value ={nombre}
                        onChange ={e => setNombre(e.target.value)}
                    />

                    <input 
                        type= "text" 
                        className= "form-control" 
                        value ={centro_costo}
                        onChange ={e => setCentroCosto (e.target.value)}
                    />

                    <button className="btn btn-success">
                        Add
                    </button>
                </form>

             
            </h1>
            </Fragment>
        );
};

export default InputDepdencia;
