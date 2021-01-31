import React from 'react'
import DetalleRequisicionTable from './DetalleRequisicionTable'
//import DetalleRequisicionForm from './DetalleRequisicionForm'

const DetalleRequisicion = () => {

    return (
        <div className="content-container">
            <h1 className="content-title">Detalles De Requisicion</h1>
            {/* <div className="form-container">
                <DetalleRequisicionForm />
            </div> */}
            <div className="table-container">
                <DetalleRequisicionTable />
            </div>
        </div>
    )
}

export default DetalleRequisicion