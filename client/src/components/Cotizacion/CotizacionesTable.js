import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'


const CotizacionesTable = () => {

    //estado del Componente
    
    const [Cotizaciones, setCotizaciones] = useState([{}]);

    //estado para los titulos de las columnas de la tabla
    //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
    //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
    const [ state, setState ] = useState({
        columns: [
            {title: 'ID', field: 'id', editable: 'never'},
            {title: 'ID Linea', field: 'id_linea', editable: 'never'},
            {title: 'Fecha de Emision', field: 'fecha_emision', editable: 'never'},
            {title: 'Observaciones', field: 'observaciones', editable: 'never'},
            {title: 'Condiciones de Entrega', field: 'condiciones_entrega', editable: 'never'},
        ],
        data: []
    })

    useEffect(() => {
        fetchCotizaciones()
    }, [])

    //obtener todas las Cotizaciones
    const fetchCotizaciones = () => {
        fetch('http://localhost:5000/cotizaciones')
            .then(res => res.json())
            .then(result => setCotizaciones(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Cotizacion
    const deleteCotizacion = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/cotizaciones/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Cotizacion
    const updateCotizacion = (cotizacion) => {
        console.log(cotizacion)
        const { id, id_linea, fecha_emision, observaciones, condiciones_entrega } = cotizacion;
        const updateC = fetch(`http://localhost:5000/cotizaciones/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id, id_linea, fecha_emision, observaciones, condiciones_entrega })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateC)
    }

    return(
        <MaterialTable
            title="Cotizaciones"
            columns={state.columns}
            data={Cotizaciones}
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
                                    updateCotizacion(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteCotizacion(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default CotizacionesTable