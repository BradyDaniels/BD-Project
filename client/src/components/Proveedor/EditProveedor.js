import React, { Fragment, useState } from 'react';

const EditProveedor=({ proveedor})=>{
    


    const [rif, setRif] = useState (proveedor.rif);
    const [razon_social, setRazonSocial] = useState (proveedor.razon_social);
    const [telefono, setTelefono] = useState (proveedor.telefono);
    const [correo, setCorreo] = useState (proveedor.correo);
    const [direccion, setDireccion] = useState (proveedor.direccion);

    
    const updateProveedores = async (e) => {
        e.preventDefault();
        try {
            const body = { rif, razon_social, telefono, correo, direccion };
            const response = await fetch(
            `http://localhost:5000/proveedores/${proveedor.rif}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        );

            window.location = "/proveedores";
        } catch (err) {
            console.error(err.message);
        }
    };
   return(
    <Fragment>
        <button type="button" 
            class="btn btn-warning" 
            data-toggle="modal" 
            data-target={`#rif${proveedor.rif}`}
        >

            Edit
        </button>

        <div class="modal" id={ `rif${proveedor.rif}`}  
                        onClick= {() => setRazonSocial(proveedor.razon_social)}>
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    Editar Proveedor
                </h4>
                <button 
                    type="button" 
                    class="close" 
                    data-dismiss="modal" 
                    onClick= {() => setRazonSocial(proveedor.razon_social)}
                    >
                        &times;
                </button>
            </div>

            <div class="modal-body">
                <h5>
                    Razon Social
                </h5>
                <input 
                    type= "text" 
                    className="form-control" 
                    value ={ razon_social } 
                    onChange= { e => setRazonSocial(e.target.value)}
                />
                <br/>
                <h5>
                    Telefono
                </h5>
                <input 
                    type= "text" 
                    className="form-control" 
                    value ={ telefono } 
                    onChange= { e => setTelefono(e.target.value)}
                />
                <br/>
                <h5>
                    Correo
                </h5>
                <input 
                    type= "text" 
                    className="form-control" 
                    value ={ correo } 
                    onChange= { e => setCorreo(e.target.value)}
                />
                <br/>
                <h5>
                    Direccion
                </h5>
                <input 
                    type= "text" 
                    className="form-control" 
                    value ={ direccion } 
                    onChange= { e => setDireccion(e.target.value)}
                />
            </div>

            <div class="modal-footer">
                <button 
                    type="button" 
                    class="btn btn-warning" 
                    data-dismiss="modal"
                    onClick={e => updateProveedores(e)}
                    >    
                    Edit
                </button>
                <button 
                    type="button" 
                    class="btn btn-danger" 
                    data-dismiss="modal" 
                    onClick= {() => setRazonSocial(proveedor.razon_social)}
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

export default EditProveedor