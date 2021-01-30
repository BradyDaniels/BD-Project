import React from 'react';
import ItemsTable from './ItemTable';
import ItemsForm from './ItemForm';

const Items=()=>{
    return (
        <div className="content-container">
            <h1 className="content-title">Items</h1>
            <div className="form-container">
                <ItemsForm />
            </div>
            <div className="table-container">
                <ItemsTable />
            </div>
        </div>
    )
 
}

export default Items;