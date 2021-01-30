import React from 'react';
import ProveedoresTable from './ProveedoresTable';
import ProveedoresForm from './ProveedoresForm';

const Proveedores=()=>{
    return (
        <div className="content-container">
            <h1 className="content-title">Proveedores</h1>
            <div className="form-container">
                <ProveedoresForm />
            </div>
            <div className="table-container">
                <ProveedoresTable />
            </div>
        </div>
    )
 
}

export default Proveedores;
