import React, { Fragment, useState } from 'react';

const EditTrabajadores=({trabajadores})=>{
    

    const [id_dependencia, setID_Depdencia] = useState (trabajadores.id_dependencia);
    
    const [nombre, setNombre] = useState (trabajadores.nombre);

    const [tipo, setTipo] = useState (trabajadores.tipo);
    
    const updateTrabajadores = async (e) => {
        e.preventDefault();
        try {
            const body = { id_dependencia, nombre, tipo };
            const response = await fetch(
            `http://localhost:5000/trabajadores/${trabajadores.id}`,
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
            data-target={`#id${trabajadores.id}`}
        >

            Edit
        </button>

        <div class="modal" id={ `id${trabajadores.id}`}  
                        onClick= {() => setNombre(trabajadores.nombre)}>
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    Editar trabajador
                </h4>
                <button 
                    type="button" 
                    class="close" 
                    data-dismiss="modal" 
                    onClick= {() => setNombre(trabajadores.nombre)}
                    >
                        &times;
                </button>
            </div>

            <div class="modal-body">
                <h5>
                   ID Dependencia
                </h5>
               <input 
                type= "text" 
                className="form-control" 
                value ={ id_dependencia } 
                onChange= { e => setID_Depdencia(e.target.value)}
               />
                <br/>
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
                    Tipo
                </h5>
                <input 
                type= "text" 
                className="form-control" 
                value ={ tipo } 
                onChange= { e => setTipo(e.target.value)}
               />
            </div>

            <div class="modal-footer">
                <button 
                    type="button" 
                    class="btn btn-warning" 
                    data-dismiss="modal"
                    onClick={e => updateTrabajadores(e)}
                    >    
                    Edit
                </button>
                <button 
                    type="button" 
                    class="btn btn-danger" 
                    data-dismiss="modal" 
                    onClick= {() => setNombre(trabajadores.nombre)}
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

export default EditTrabajadores