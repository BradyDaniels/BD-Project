import React from 'react';
import Areq_FormHeader from './AReq_FormHeader';
import Areq_FormItem from './AReq_FormItems';
import RequisicionTable from './RequisicionTable'

const Items=()=>{
    return (
        <div className="content-container">
            <h1 className="content-title">UNIVERSIDAD CATÓLICA ANDRES BELLO-GUAYANA</h1>
            <h1 className="content-title"> Nueva Requisicion</h1>
            <div className="form-container">
                <Areq_FormHeader />
                {/*<Areq_FormItem/>*/}
            <h1 className="content-title">Requisiciones</h1>
                <RequisicionTable/>
            </div>

        </div>
    )
 
}

export default Items;