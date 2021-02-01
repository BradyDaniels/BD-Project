import React from 'react'
import ProveedorCotizacionTable from './ProveedorCotizacionTable'
//import ProveedorCotizacionForm from './ProveedorCotizacionForm'

const ProveedorCotizacion = () => {

    return (
        <div className="content-container">
            <h1 className="content-title">Proveedores-Cotizacion</h1>
            {/* <div className="form-container">
                <ProveedorCotizacionForm />
            </div> */}
            <div className="table-container">
                <ProveedorCotizacionTable />
            </div>
        </div>
    )
}

export default ProveedorCotizacion