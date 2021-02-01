import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'


const DependenciasTable = () => {

    //estado del Componente
    
    const [dependencias, setDependencias] = useState([{}]);

    //estado para los titulos de las columnas de la tabla
    //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
    //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
    const [ state, setState ] = useState({
        columns: [
            {title: 'ID', field: 'id', editable: 'never'},
            {title: 'Nombre Dependencia', field: 'nombre'},
            {title: 'Centro de Costo', field: 'centro_costo'},
        ],
        data: []
    })

    useEffect(() => {
        fetchDependencias()
    }, [])

    //obtener todas las Dependencias
    const fetchDependencias = () => {
        fetch('http://localhost:5000/dependencias')
            .then(res => res.json())
            .then(result => setDependencias(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Dependencia
    const deleteDependencia = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/dependencias/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Dependencia
    const updateDependencia = (dependencia) => {
        console.log(dependencia)
        const { id, nombre, centro_costo } = dependencia;
        const updateD = fetch(`http://localhost:5000/dependencias/${id}`, {
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
            title="Dependencias"
            columns={state.columns}
            data={dependencias}
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
                                    updateDependencia(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteDependencia(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default DependenciasTable