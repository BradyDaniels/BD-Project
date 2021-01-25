import React, { Fragment, useState } from "react";

    

const InputDepdencia=()=>{
    const [ID_Dependencia, setID_Dependencia] = useState ("Aqui va el texto default");

    const [Nombre, setNombre] = useState ("Aqui va el texto default 2");

    const [CentroCosto, setCentroCosto] = useState ("Aqui va el texto default 3");

    return (
        <Fragment>
            <h1 className= "text-center mt-5">
                Dependencia List
                <form className= "d-flex mt-5">
                    <input 
                        type= "text" 
                        className= "form-control" 
                        value ={ID_Dependencia}
                        onChange ={e => setID_Dependencia (e.target.value)}
                    />
                    <button className="btn btn-success">
                        Add
                    </button>
                </form>

                <form className= "d-flex mt-5">
                    <input 
                        type= "text" 
                        className= "form-control" 
                        value ={Nombre}
                        onChange ={e => setNombre(e.target.value)}
                    />
                    <button className="btn btn-success">
                        Add
                    </button>
                </form>

                <form className= "d-flex mt-5">
                    <input 
                        type= "text" 
                        className= "form-control" 
                        value ={CentroCosto}
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
