import React, { Fragment, useState } from "react";

const InputLinea = () =>{

const [description, setDescription] = useState ("Aqui va el texto default");

const onSubmitForm = async (e) =>{
    e.preventDefault();
    try {
        const body = { description };
        const response = await fetch("http://localhost:5000/pruebas",{
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
            Prueba List
            <form className= "d-flex mt-5" onSubmit={ onSubmitForm }>
                <input 
                    type= "text" 
                    className= "form-control" 
                    value ={description}
                    onChange ={e => setDescription (e.target.value)}
                />
                <button className="btn btn-success">
                    Add
                </button>
            </form>
        </h1>
        </Fragment>
    );
};

export default InputLinea;