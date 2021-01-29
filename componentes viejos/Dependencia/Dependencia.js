import React  from 'react';
import InputDepdencia from './InputDependencia';
import ListDependencia from './ListDependencia';
const Dependencias = () => {
    return (
        <div className="content-container">
            <div className="form-container">
                <InputDepdencia />
            </div>
            <div className="table-container">
                <ListDependencia />
            </div>
        </div>
    )
}

export default Dependencias