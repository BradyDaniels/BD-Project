import React, { Fragment, useState } from 'react';

const EditDependencia=({dependencia})=>{
    


    const [nombre, setNombre] = useState (dependencia.nombre);

    const [centro_costo, setCentroCosto] = useState (dependencia.centro_costo);
    
    const updateDependencias = async (e) => {
        e.preventDefault();
        try {
            const body = { nombre,centro_costo };
            const response = await fetch(
            `http://localhost:5000/dependencias/${dependencia.id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        );

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };
   return(
    <Fragment>
        <button type="button" 
            class="btn btn-warning" 
            data-toggle="modal" 
            data-target={`#id${dependencia.id}`}
        >

            Edit
        </button>

        <div class="modal" id={ `id${dependencia.id}`}  
                        onClick= {() => setNombre(dependencia.nombre)}>
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    Editar Dependencia
                </h4>
                <button 
                    type="button" 
                    class="close" 
                    data-dismiss="modal" 
                    onClick= {() => setNombre(dependencia.nombre)}
                    >
                        &times;
                </button>
            </div>

            <div class="modal-body">
                <h5>
                    Nombre
                </h5>
                <input 
                type= "text" 
                className="form-control" 
                value ={ nombre } 
                onChange= { e => setNombre(e.target.value)}
               />
                <br/>
                <h5>
                    Centro de Costo
                </h5>
                <input 
                type= "text" 
                className="form-control" 
                value ={ centro_costo } 
                onChange= { e => setCentroCosto(e.target.value)}
               />
            </div>

            <div class="modal-footer">
                <button 
                    type="button" 
                    class="btn btn-warning" 
                    data-dismiss="modal"
                    onClick={e => updateDependencias(e)}
                    >    
                    Edit
                </button>
                <button 
                    type="button" 
                    class="btn btn-danger" 
                    data-dismiss="modal" 
                    onClick= {() => setNombre(dependencia.nombre)}
                   >
                        Close
                </button>
            </div>

            </div>
        </div>
        </div>  
    </Fragment>
   );
};

export default EditDependencia