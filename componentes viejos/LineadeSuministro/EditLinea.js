import React, { Fragment, useState } from 'react';

const EditLinea = ( { lineas } ) => {

    const [descripcion, setDescription] = useState (lineas.descripcion);
    const [id_Linea, setIDlinea] = useState (0);

    //Edit Description Function

    const updateLinea = async (e) => {
        e.preventDefault();
        try {
            const body = { id_Linea,descripcion };
            const response = await fetch(
            `http://localhost:5000/lineas_suministro/${lineas.id}`,
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
                data-target={`#id${lineas.id}`}>

                Edit
            </button>

            <div class="modal" id={ `id${lineas.id}`}  
                        onClick= {() => setDescription(lineas.descripcion)}>
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">
                        Editar Linea de Suministro
                    </h4>
                    <button 
                        type="button" 
                        class="close" 
                        data-dismiss="modal" 
                        onClick= {() => setDescription(lineas.descripcion)}>
                            &times;
                    </button>
                </div>

                <div class="modal-body">
                <h5>
                    Descripcion
                </h5>
                    <input 
                    type= "text" 
                    className="form-control" 
                    value ={ descripcion } 
                    onChange= { e => setDescription(e.target.value)}/>
                </div>

                <div class="modal-footer">
                    <button 
                        type="button" 
                        class="btn btn-warning" 
                        data-dismiss="modal"
                        onClick={e => updateLinea(e)}
                        >    
                        Edit
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-danger" 
                        data-dismiss="modal" 
                        onClick= {() => setDescription(lineas.descripcion)}>
                            Close
                    </button>
                </div>

                </div>
            </div>
            </div>  
        </Fragment>
    );
};

export default EditLinea;