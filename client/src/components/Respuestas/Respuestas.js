import React from 'react';
import RespuestasItemsTable from './RespuestasTable'
import RespuestasForm from './RespuestasForm'

const Respuestas = () => {
    return (
        <div className="content-container">
            <h1 className="content-title">Nueva Respuesta</h1>
            <div className="form-container">
                <RespuestasForm />
            </div>
            <h1 className="content-title">Respuestas</h1>
            <div className="table-container">
                <RespuestasItemsTable />
            </div>
        </div>
    )
}

export default Respuestas;