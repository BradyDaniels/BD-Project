import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'


const OrdenCompraTable = () => {

    //estado del Componente
    
    const [OrdenCompra, setOrdenCompra] = useState([{}]);

    //estado para los titulos de las columnas de la tabla
    //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
    //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
    const [ state, setState ] = useState({
        columns: [
            {title: 'ID', field: 'id', editable: 'never'},
            {title: 'Fecha Orden', field: 'fecha_orden'},
            {title: 'Monto Total', field: 'monto_total'},
            {title: 'Fecha de Entrega', field: 'fecha_entrega'},
            {title: 'Formato de Pago', field: 'formato_pago'},
            {title: 'Tipo Moneda', field: 'tipo_moneda'},
            {title: 'Cedula Direcctor', field: 'cedula_director'},
            {title: 'Observaciones', field: 'observaciones'},
            {title: 'Condiciones de Entrega', field: 'condiciones_entrega'},
        ],
        data: []
    })

    useEffect(() => {
        fetchOrdenCompra()
    }, [])

    //obtener todas las OrdenCompra
    const fetchOrdenCompra = () => {
        fetch('http://localhost:5000/orden_compra')
            .then(res => res.json())
            .then(result => setOrdenCompra(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Detalle Requisicion
    const deleteOrdenCompra = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/orden_compra/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Detalle Requisicion
    const updateOrdenCompra = (OrdenCompra) => {
        console.log(OrdenCompra)
        const { id, fecha_orden, monto_total, fecha_entrega, formato_pago, tipo_moneda, cedula_director, observaciones, condiciones_entrega } = OrdenCompra;
        const updateOC = fetch(`http://localhost:5000/orden_compra/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id, fecha_orden, monto_total, fecha_entrega, formato_pago, tipo_moneda, cedula_director, observaciones, condiciones_entrega })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateOC)
    }

    return(
        <MaterialTable
            title="Ordenes de Compra"
            columns={state.columns}
            data={OrdenCompra}
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
                                    updateOrdenCompra(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteOrdenCompra(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default OrdenCompraTable