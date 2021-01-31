import React from 'react'
import ProveedorOrdenTable from './ProveedorOrdenTable'
//import ProveedorOrdenForm from './ProveedorOrdenForm'

const ProveedorOrden = () => {

    return (
        <div className="content-container">
            <h1 className="content-title">Proveedores-Ordenes</h1>
            {/* <div className="form-container">
                <ProveedorOrdenForm />
            </div> */}
            <div className="table-container">
                <ProveedorOrdenTable />
            </div>
        </div>
    )
}

export default ProveedorOrden