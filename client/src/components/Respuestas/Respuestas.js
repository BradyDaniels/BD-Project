import React from 'react';
import RespuestasTable from './RespuestasTable'
import RespuestasForm from './RespuestasForm'

const Respuestas = () => {
    return (
        <div className="content-container">
            <h1 className="content-title">Respuestas</h1>
            <div className="form-container">
                <RespuestasForm />
            </div>
            <div className="table-container">
                <RespuestasTable />
            </div>
        </div>
    )
}

export default Respuestas;