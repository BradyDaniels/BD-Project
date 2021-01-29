import React  from 'react';
import InputProveedor from './InputProveedor';
import ListProveedor from './ListProveedor';
const Proveedores = () => {
    return (
        <div className="content-container">
            <div className="form-container">
                <InputProveedor />
            </div>
            <div className="table-container">
                <ListProveedor />
            </div>
        </div>
    )
}

export default Proveedores