import React from 'react'
import DetalleCompraTable from './DetalleCompraTable'
//import DetalleCompraForm from './DetalleCompraForm'

const DetalleCompra = () => {

    return (
        <div className="content-container">
            <h1 className="content-title">Detalles De Compra</h1>
            {/* <div className="form-container">
                <DetalleCompraForm />
            </div> */}
            <div className="table-container">
                <DetalleCompraTable />
            </div>
        </div>
    )
}

export default DetalleCompra