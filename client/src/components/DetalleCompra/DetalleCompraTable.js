import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'


const DetalleCompraTable = () => {

    //estado del Componente
    
    const [DetalleCompra, setDetalleCompra] = useState([{}]);

    //estado para los titulos de las columnas de la tabla
    //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
    //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
    const [ state, setState ] = useState({
        columns: [
            {title: 'ID', field: 'id', editable: 'never'},
            {title: 'Cantidad', field: 'cantidad'},
            {title: 'Precio de Compra', field: 'precio_compra'},
            {title: 'Id Detalle Requisicion', field: 'id_detalle_req'}, //idk
            {title: 'ID Requisicion', field: 'id_requisicion'},
            {title: 'ID Item', field: 'id_item'},
            {title: 'ID Respuesta', field: 'id_respuesta'},
            {title: 'RIF Proveedor', field: 'rif'},
            {title: 'ID Cotizacion', field: 'id_cotizacion'},
            {title: 'ID Orden', field: 'id_orden'},
        ],
        data: []
    })

    useEffect(() => {
        fetchDetalleCompra()
    }, [])

    //obtener todas las DetalleCompra
    const fetchDetalleCompra = () => {
        fetch('http://localhost:5000/detalle_compra')
            .then(res => res.json())
            .then(result => setDetalleCompra(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Detalle Compra
    const deleteDetalleCompra = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/detalle_compra/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Detalle Compra
    const updateDetalleCompra = (detalleCompra) => {
        console.log(detalleCompra)
        const { id, cantidad, precio_compra, id_detalle_req, id_requisicion, id_item, id_respuesta, rif, id_cotizacion, id_orden  } = detalleCompra;
        const updateDC = fetch(`http://localhost:5000/DetalleCompra/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id, cantidad, precio_compra, id_detalle_req, id_requisicion, id_item, id_respuesta, rif, id_cotizacion, id_orden })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateDC)
    }

    return(
        <MaterialTable
            title="Detalles De Compra"
            columns={state.columns}
            data={DetalleCompra}
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
                                    updateDetalleCompra(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteDetalleCompra(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default DetalleCompraTable