import React from 'react';
import Areq_FormHeader from './AReq_FormHeader';
import Areq_FormItem from './AReq_FormItems';

const Items=()=>{
    return (
        <div className="content-container">
            <h1 className="content-title">UNIVERSIDAD CATÓLICA ANDRES BELLO-GUAYANA</h1>
            <h1 className="content-title">Requisicion de Compras</h1>
            <div className="form-container">
                <Areq_FormHeader />
              
                {/*<Areq_FormItem/>*/}
            </div>
        </div>
    )
 
}

export default Items;