import React  from 'react';
import InputTrabajadores from './InputTrabajadores';
import ListTrabajadores from './ListTrabajadores';
const Trabajadores = () => {
    return (
        <div className="content-container">
            <div className="form-container">
                <InputTrabajadores />
            </div>
            <div className="table-container">
                <ListTrabajadores />
            </div>
        </div>
    )
}

export default Trabajadores