import React, { Fragment, useState } from "react";

    

const InputProveedor=()=>{

    const [rif, setRif] = useState ("RIF");
    const [razon_social, setRazonSocial] = useState ("Razon Social");
    const [telefono, setTelefono] = useState ("Telefono");
    const [correo, setCorreo] = useState ("Correo");
    const [direccion, setDireccion] = useState ("Direccion");



    const onSubmitForm = async (e) =>{
        e.preventDefault();
        console.log('onSummit')
        try {
            const body = { rif, razon_social, telefono, correo, direccion };
            
            const response = await fetch("http://localhost:5000/proveedores",{
                method: "POST",
                headers : { "Content-type": "application/json" },
                body: JSON.stringify(body)

            });
            window.location = "/proveedores";
    
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <h1 className= "text-center mt-5">
                Proveedores
                
                <form className= "d-flex mt-5" onSubmit={ onSubmitForm }>
                    <input 
                        type= "intenger" 
                        className= "form-control" 
                        value ={rif}
                        onChange ={e => setRif (parseInt(e.target.value))}
                    />

                    <input 
                        type= "text" 
                        className= "form-control" 
                        value ={razon_social}
                        onChange ={e => setRazonSocial(e.target.value)}
                    />

                    <input 
                        type= "text" 
                        className= "form-control" 
                        value ={telefono}
                        onChange ={e => setTelefono (e.target.value)}
                    />
                    <input 
                        type= "text" 
                        className= "form-control" 
                        value ={correo}
                        onChange ={e => setCorreo (e.target.value)}
                    />

                    <input 
                        type= "text" 
                        className= "form-control" 
                        value ={direccion}
                        onChange ={e => setDireccion (e.target.value)}
                    />

                    <button className="btn btn-success">
                        Add
                    </button>
                </form>

             
            </h1>
            </Fragment>
        );
};

export default InputProveedor;
