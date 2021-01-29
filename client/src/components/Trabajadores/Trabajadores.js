import React from 'react';
import TrabajadoresTable from './TrabajadoresTable'
import TrabajadoresForm from './TrabajadoresForm'

const Trabajadores = () => {
    return (
        <div className="content-container">
            <h1 className="content-title">Trabajadores</h1>
            <div className="form-container">
                <TrabajadoresForm />
            </div>
            <div className="table-container">
                <TrabajadoresTable />
            </div>
        </div>
    )
}

export default Trabajadores;