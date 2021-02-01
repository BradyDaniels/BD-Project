import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'


const OrdenRepuestaTable = () => {

    //estado del Componente
    
    const [OrdenRepuesta, setOrdenRepuesta] = useState([{}]);

    //estado para los titulos de las columnas de la tabla
    //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
    //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
    const [ state, setState ] = useState({
        columns: [
            {title: 'ID Respuesta', field: 'id_respuesta', editable: 'never'},
            {title: 'ID Orden', field: 'id_orden'},
        ],
        data: []
    })

    useEffect(() => {
        fetchOrdenRepuesta()
    }, [])

    //obtener todas las OrdenRepuesta
    const fetchOrdenRepuesta = () => {
        fetch('http://localhost:5000/orden_respuesta')
            .then(res => res.json())
            .then(result => setOrdenRepuesta(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Detalle Requisicion
    const deleteOrdenRepuesta = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/orden_respuesta/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Detalle Requisicion
    const updateOrdenRepuesta = (OrdenRepuesta) => {
        console.log(OrdenRepuesta)
        const { id_respuesta, id_orden } = OrdenRepuesta;
        const updateOR = fetch(`http://localhost:5000/orden_respuesta/${id_orden}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id_respuesta, id_orden })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateOR)
    }

    return(
        <MaterialTable
            title="Ordenes-Respuestas"
            columns={state.columns}
            data={OrdenRepuesta}
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
                                    updateOrdenRepuesta(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteOrdenRepuesta(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default OrdenRepuestaTable