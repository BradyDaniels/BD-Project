import React from 'react';
import LineaProveedorTable from './LineaProveedorTable'
import LineaProveedorForm from './LineaProveedorForm'

const LineaProveedor = () => {
    return (
        <div className="content-container">
            <h1 className="content-title">Linea-Proveedor</h1>
            <div className="form-container">
                <LineaProveedorForm />
            </div>
            <div className="table-container">
                <LineaProveedorTable />
            </div>
        </div>
    )
}

export default LineaProveedor;