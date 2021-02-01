import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'


const ProveedorCotizacionTable = () => {

    //estado del Componente
    
    const [ProveedorCotizacion, setProveedorCotizacion] = useState([{}]);

    //estado para los titulos de las columnas de la tabla
    //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
    //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
    const [ state, setState ] = useState({
        columns: [
            {title: 'RIF Proveedor', field: 'rif', editable: 'never'},
            {title: 'ID Cotizacion', field: 'id_cotizacion'},
        ],
        data: []
    })

    useEffect(() => {
        fetchProveedorCotizacion()
    }, [])

    //obtener todas las ProveedorCotizacion
    const fetchProveedorCotizacion = () => {
        fetch('http://localhost:5000/proveedor_cotizacion')
            .then(res => res.json())
            .then(result => setProveedorCotizacion(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Detalle Requisicion
    const deleteProveedorCotizacion = (id_cotizacion) => {
        console.log(id_cotizacion)
        fetch(`http://localhost:5000/proveedor_cotizacion/${id_cotizacion}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Detalle Requisicion
    const updateProveedorCotizacion = (ProveedorCotizacion) => {
        console.log(ProveedorCotizacion)
        const { rif, id_cotizacion } = ProveedorCotizacion;
        const updatePC = fetch(`http://localhost:5000/proveedor_cotizacion/${id_cotizacion}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ rif, id_cotizacion })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updatePC)
    }

    return(
        <MaterialTable
            title="Proveedores-Cotizacion"
            columns={state.columns}
            data={ProveedorCotizacion}
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
                                    updateProveedorCotizacion(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteProveedorCotizacion(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default ProveedorCotizacionTable