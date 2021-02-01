import React from 'react'
import CotizacionesTable from './CotizacionesTable'
//import CotizacionesForm from './CotizacionesForm'

const Cotizaciones = () => {

    return (
        <div className="content-container">
            <h1 className="content-title">Cotizaciones</h1>
            {/* <div className="form-container">
                <CotizacionesForm />
            </div> */}
            <div className="table-container">
                <CotizacionesTable />
            </div>
        </div>
    )
}

export default Cotizaciones