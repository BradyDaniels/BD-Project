import React from 'react'
import DependenciasTable from './DependenciasTable'
import DependenciasForm from './DependenciasForm'

const Dependencias = () => {

    return (
        <div className="content-container">
            <h1 className="content-title">Dependencias</h1>
            <div className="form-container">
                <DependenciasForm />
            </div>
            <div className="table-container">
                <DependenciasTable />
            </div>
        </div>
    )
}

export default Dependencias