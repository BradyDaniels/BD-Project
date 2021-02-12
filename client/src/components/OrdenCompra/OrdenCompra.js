import React from 'react'
import OrdenCompraTable from './OrdenCompraTable'
import OrdenCompraForm from './OrdenCompraForm'

const OrdenCompra = () => {

    return (
        <div className="content-container">
            <h1 className="content-title"> Nueva Orden de Compra</h1>
            <div className="form-container">
                <OrdenCompraForm />
            </div>
            <h1 className="content-title">Ordenes de Compra</h1>
            <div className="table-container">
                <OrdenCompraTable />
            </div>
        </div>
    )
}

export default OrdenCompra