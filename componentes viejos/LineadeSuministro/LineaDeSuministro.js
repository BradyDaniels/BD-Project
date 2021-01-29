import React  from 'react';
import InputLinea from './InputLinea';
import ListLinea from './ListLinea';
const Lineas = () => {
    return (
        <div className="content-container">
            <div className="form-container">
                <InputLinea />
            </div>
            <div className="table-container">
                <ListLinea />
            </div>
        </div>
    )
}

export default Lineas