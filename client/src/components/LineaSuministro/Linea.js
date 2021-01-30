import React from 'react'
import LineaTable from './LineaTable'
import LineaForm from './LineaForm'

const Linea=()=>{
    return (
        <div className="content-container">
            <h1 className="content-title">Lineas de Suministro</h1>
            <div className="form-container">
                <LineaForm />
            </div>
            <div className="table-container">
                <LineaTable />
            </div>
        </div>
    )
}

export default Linea