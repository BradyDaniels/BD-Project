import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

// cedula, id_dependencia, nombre, tipo 
const TrabajadoresTable = () => {
    const [trabajadores, setTrabajadores] = useState([{}])
    const [state, setState] = useState({
        columns: [
            { title: 'Cedula', field: 'cedula', editable: 'never' },
            { title: 'Dependencia', field: 'id_dependencia' },
            { title: 'Nombre', field: 'nombre' },
            { title: 'Tipo', field: 'tipo' },
        ],
        data: []
    })

    //Cuando se renderiza el componente se llama la funcion que obtiene todas las especialidades
    useEffect(() => {
        fetchTrabajadores()
    }, [])

    //obtener todos los Trabajadores
    const fetchTrabajadores = () => {
        fetch('http://localhost:5000/trabajadores')
            .then(res => res.json())
            .then(result => setTrabajadores(result))
            .catch(err => console.log(err.message))
    }

    //eliminar un Trabajador
    const deleteTrabajadores = (cedula) => {
        console.log(cedula)
        fetch(`http://localhost:5000/trabajadores/${cedula}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar un Trabajador
    const updateTrabajadores = (trabajador) => {
        console.log(trabajador)
        const { cedula, id_dependencia, nombre, tipo } = trabajador;
        const updateT = fetch(`http://localhost:5000/trabajadores/${cedula}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ cedula, id_dependencia, nombre, tipo })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateT)
    }


    return (
        <MaterialTable
            title="Trabajadores"
            columns={state.columns}
            data={trabajadores}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    updateTrabajadores(newData);                //AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteTrabajadores(oldData.cedula_p);                    //AQUI SE DELETEA LA ESPECIALIDAD
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

export default TrabajadoresTable