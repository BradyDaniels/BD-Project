import React, { Fragment, useState } from "react";

    

const InputTrabajadores=()=>{

    const [cedula, setCedula] = useState ("Cedula");

    const [id, setID_Dependencia] = useState ("ID_Dependencia");

    const [nombre, setNombre] = useState ("Nombre");

    const [tipo, setTipo] = useState ("Tipo");

    const onSubmitForm = async (e) =>{
        e.preventDefault();
        console.log('onSummit')
        try {
            const body = {cedula,id_dependencia,nombre,tipo };
            
            const response = await fetch("http://localhost:5000/trabajadores",{
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
                Dependencia List
                
                <form className= "d-flex mt-5" onSubmit={ onSubmitForm }>

                    <input 
                        type= "intenger" 
                        className= "form-control" 
                        value ={cedula}
                        onChange ={e => setCedula (parseInt(e.target.value))}
                    />

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
                        value ={tipo}
                        onChange ={e => setTipo (e.target.value)}
                    />

                    <button className="btn btn-success">
                        Add
                    </button>
                </form>

             
            </h1>
            </Fragment>
        );
};

export default InputTrabajadores;
