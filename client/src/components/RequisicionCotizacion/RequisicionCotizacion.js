import React from 'react'
import RequisicionCotizacionTable from './RequisicionCotizacionTable'
//import RequisicionCotizacionForm from './RequisicionCotizacionForm'

const RequisicionCotizacion = () => {

    return (
        <div className="content-container">
            <h1 className="content-title">Requisicion-Cotizacion</h1>
            {/* <div className="form-container">
                <RequisicionCotizacionForm />
            </div> */}
            <div className="table-container">
                <RequisicionCotizacionTable />
            </div>
        </div>
    )
}

export default RequisicionCotizacion