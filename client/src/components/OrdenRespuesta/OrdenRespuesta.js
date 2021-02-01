import React from 'react'
import OrdenRepuestaTable from './OrdenRespuestaTable'
//import OrdenRepuestaForm from './OrdenRepuestaForm'

const OrdenRepuesta = () => {

    return (
        <div className="content-container">
            <h1 className="content-title">Ordenes-Respuestas</h1>
            {/* <div className="form-container">
                <OrdenRepuestaForm />
            </div> */}
            <div className="table-container">
                <OrdenRepuestaTable />
            </div>
        </div>
    )
}

export default OrdenRepuesta