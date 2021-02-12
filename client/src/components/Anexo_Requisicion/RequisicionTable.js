import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'


const RequisicionTable = () => {

    //estado del Componente
    
    const [requisiciones, setrequisiciones] = useState([{}]);

    //estado para los titulos de las columnas de la tabla
    //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
    //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
    const [ state, setState ] = useState({
        columns: [
            {title: 'ID Requisicion', field: 'id', editable: 'never'},
            {title: 'ID Dependencia', field: 'id_dependencia', editable: 'never'},
            {title: 'ID Linea Suministro', field: 'id_linea', editable: 'never'},
            {title: 'Fecha de Emision', field: 'fecha_emision', editable: 'never'},
            {title: 'Cedula Director', field: 'cedula_director', editable: 'never'},
            {title: 'Cedula Jefe Unidad', field: 'cedula_jefeunidad', editable: 'never'},
            {title: 'Observaciones', field: 'observaciones', editable: 'never'},
            {title: 'Prioridad', field: 'prioridad', editable: 'never'},
        ],
        data: []
    })

    useEffect(() => {
        fetchrequisiciones()
    }, [])

    //obtener todas las requisiciones
    const fetchrequisiciones = () => {
        fetch('http://localhost:5000/requisiciones')
            .then(res => res.json())
            .then(result => setrequisiciones(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una requisicion
    const deleterequisicion = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/requisiciones/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una requisicion
    const updaterequisicion = (requisicion) => {
        console.log(requisicion)
        const { id, nombre, centro_costo } = requisicion;
        const updateD = fetch(`http://localhost:5000/requisiciones/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id, nombre, centro_costo })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateD)
    }

    return(
        <MaterialTable
            title="requisiciones"
            columns={state.columns}
            data={requisiciones}
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
                                    updaterequisicion(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleterequisicion(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default RequisicionTable