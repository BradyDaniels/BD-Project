import React, { Fragment, useState } from 'react';

const EditDependencia=({Dependencia})=>{
    
    const [ID_Dependencia, setID_Dependencia] = useState (Dependencia.ID_Dependencia);

    const [Nombre, setNombre] = useState (Dependencia.Nombre);

    const [CentroCosto, setCentroCosto] = useState (Dependencia.CentroCosto);

   return(
    <Fragment>
        <button type="button" 
            class="btn btn-warning" 
            data-toggle="modal" 
        >

            Edit
        </button>

        <div class="modal"  
                    onClick= {() => setID_Dependencia(Dependencia.ID_Dependencia)}>
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    Edit Dependencia
                </h4>
                <button 
                    type="button" 
                    class="close" 
                    data-dismiss="modal" 
                    onClick= {() => setID_Dependencia(Dependencia.ID_Dependencia)}
                    >
                        &times;
                </button>
            </div>

            <div class="modal-body">
                <input 
                type= "text" 
                className="form-control" 
                value ={ ID_Dependencia } 
                onChange= { e => setID_Dependencia(e.target.value)}
               />
            </div>

            <div class="modal-footer">
                <button 
                    type="button" 
                    class="btn btn-warning" 
                    data-dismiss="modal"
                    
                    >    
                    Edit
                </button>
                <button 
                    type="button" 
                    class="btn btn-danger" 
                    data-dismiss="modal" 
                    onClick= {() => setID_Dependencia(Dependencia.ID_Dependencia)}
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