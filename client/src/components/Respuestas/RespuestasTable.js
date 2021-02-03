import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

// cedula, id_dependencia, nombre, tipo 
const RespuestasTable = () => {
    const [respuestas, setrespuestas] = useState([{}])
    const [state, setState] = useState({
        columns: [
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Precio Total', field: 'precio_total', editable: 'never' },
            { title: 'Formato de Pago', field: 'formato_pago' },
            { title: 'Tipo Moneda', field: 'tipo_moneda' },
            { title: 'RIF', field: 'rif', editable: 'never' },
            { title: 'ID Cotizacion', field: 'id_cotizacion', editable: 'never' },
        ],
        data: []
    })

    //Cuando se renderiza el componente se llama la funcion que obtiene todas las especialidades
    useEffect(() => {
        fetchrespuestas()
    }, [])

    //obtener todos los respuestas
    const fetchrespuestas = () => {
        fetch('http://localhost:5000/respuestas')
            .then(res => res.json())
            .then(result => setrespuestas(result))
            .catch(err => console.log(err.message))
    }

    //eliminar un Trabajador
    const deleterespuestas = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/respuestas/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar un Trabajador
    const updaterespuestas = (respuesta) => {
        console.log(respuesta)
        const { id, precio_total, formato_pago, tipo_moneda, rif, id_cotizacion } = respuesta;
        const updateR = fetch(`http://localhost:5000/respuestas/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id, precio_total, formato_pago, tipo_moneda, rif, id_cotizacion })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateR)
    }


    return (
        <MaterialTable
            title="Respuestas"
            columns={state.columns}
            data={respuestas}
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
                                    updaterespuestas(newData);                //AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleterespuestas(oldData.cedula_p);                    //AQUI SE DELETEA LA ESPECIALIDAD
                        console.log(oldData.cedula_p);
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

export default RespuestasTable