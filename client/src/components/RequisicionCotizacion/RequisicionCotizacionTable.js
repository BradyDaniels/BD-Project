import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'


const RequisicionCotizacionTable = () => {

    //estado del Componente
    
    const [RequisicionCotizacion, setRequisicionCotizacion] = useState([{}]);

    //estado para los titulos de las columnas de la tabla
    //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
    //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
    const [ state, setState ] = useState({
        columns: [
            {title: 'ID Requisicion', field: 'id_requisicion', editable: 'never'},
            {title: 'ID Cotizacion', field: 'id_cotizacion'},
        ],
        data: []
    })

    useEffect(() => {
        fetchRequisicionCotizacion()
    }, [])

    //obtener todas las RequisicionCotizacion
    const fetchRequisicionCotizacion = () => {
        fetch('http://localhost:5000/requisicion_cotizacion')
            .then(res => res.json())
            .then(result => setRequisicionCotizacion(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Detalle Requisicion
    const deleteRequisicionCotizacion = (id_requisicion) => {
        console.log(id_requisicion)
        fetch(`http://localhost:5000/requisicion_cotizacion/${id_requisicion}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Detalle Requisicion
    const updateRequisicionCotizacion = (RequisicionCotizacion) => {
        console.log(RequisicionCotizacion)
        const { id_requisicion, id_cotizacion } = RequisicionCotizacion;
        const updateRC = fetch(`http://localhost:5000/requisicion_cotizacion/${id_requisicion}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id_requisicion, id_cotizacion })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateRC)
    }

    return(
        <MaterialTable
            title="Requisicion-Cotizacion"
            columns={state.columns}
            data={RequisicionCotizacion}
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
                                    updateRequisicionCotizacion(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteRequisicionCotizacion(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default RequisicionCotizacionTable