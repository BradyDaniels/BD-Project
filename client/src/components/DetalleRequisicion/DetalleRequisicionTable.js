import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'


const DetalleRequisicionTable = () => {

    //estado del Componente
    
    const [DetalleRequisicion, setDetalleRequisicion] = useState([{}]);

    //estado para los titulos de las columnas de la tabla
    //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
    //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
    const [ state, setState ] = useState({
        columns: [
            {title: 'ID', field: 'id', editable: 'never'},
            {title: 'Cantidad Solicitada', field: 'cantidad_solicitada'},
            {title: 'Precio Estimado', field: 'precio_estimado'},
            {title: 'ID Requisicion', field: 'id_requisicion'},
            {title: 'ID Item', field: 'id_item'},
        ],
        data: []
    })

    useEffect(() => {
        fetchDetalleRequisicion()
    }, [])

    //obtener todas las DetalleRequisicion
    const fetchDetalleRequisicion = () => {
        fetch('http://localhost:5000/detalle_requisicion')
            .then(res => res.json())
            .then(result => setDetalleRequisicion(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Detalle Requisicion
    const deleteDetalleRequisicion = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/detalle_requisicion/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Detalle Requisicion
    const updateDetalleRequisicion = (detalleRequisicion) => {
        console.log(detalleRequisicion)
        const { id, cantidad_solicitada, precio_estimado, id_requisicion, id_item } = detalleRequisicion;
        const updateDR = fetch(`http://localhost:5000/detalle_requisicion/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id, cantidad_solicitada, precio_estimado, id_requisicion, id_item })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateDR)
    }

    return(
        <MaterialTable
            title="Detalles de Requisicion"
            columns={state.columns}
            data={DetalleRequisicion}
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
                                    updateDetalleRequisicion(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteDetalleRequisicion(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default DetalleRequisicionTable