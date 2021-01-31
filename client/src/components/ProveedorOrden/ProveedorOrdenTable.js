import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'


const ProveedorOrdenTable = () => {

    //estado del Componente
    
    const [ProveedorOrden, setProveedorOrden] = useState([{}]);

    //estado para los titulos de las columnas de la tabla
    //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
    //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
    const [ state, setState ] = useState({
        columns: [
            {title: 'RIF Proveedor', field: 'rif', editable: 'never'},
            {title: 'ID Orden', field: 'id_orden'},
        ],
        data: []
    })

    useEffect(() => {
        fetchProveedorOrden()
    }, [])

    //obtener todas las ProveedorOrden
    const fetchProveedorOrden = () => {
        fetch('http://localhost:5000/proveedor_orden')
            .then(res => res.json())
            .then(result => setProveedorOrden(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Detalle Requisicion
    const deleteProveedorOrden = (id_orden) => {
        console.log(id_orden)
        fetch(`http://localhost:5000/proveedor_orden/${id_orden}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Detalle Requisicion
    const updateProveedorOrden = (ProveedorOrden) => {
        console.log(ProveedorOrden)
        const { rif, id_orden } = ProveedorOrden;
        const updatePO = fetch(`http://localhost:5000/proveedor_orden/${id_orden}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ rif, id_orden })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updatePO)
    }

    return(
        <MaterialTable
            title="Proveedores-ordenes"
            columns={state.columns}
            data={ProveedorOrden}
            options={{
                filtering: true
              }}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    updateProveedorOrden(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteProveedorOrden(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
                        console.log(oldData.id);
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    )
}

export default ProveedorOrdenTable