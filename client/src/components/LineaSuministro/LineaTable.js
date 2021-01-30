import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table'

const LineaTable=()=>{
    //estado del Componente
    
    const [lineas, setLineas] = useState([{}]);

    //estado para los titulos de las columnas de la tabla
    //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
    //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
    const [ state, setState ] = useState({
        columns: [
            {title: 'id', field: 'id', editable: 'never'},
            {title: 'Descripcion', field: 'descripcion'},
        ],
        data: []
    })

    useEffect(() => {
        fetchLineas()
    }, [])

    //obtener todas las Dependencias
    const fetchLineas = () => {
        fetch('http://localhost:5000/lineas_suministro')
            .then(res => res.json())
            .then(result => setLineas(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Dependencia
    const deleteLinea = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/lineas_suministro/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Dependencia
    const updateLinea = (linea) => {
        console.log(linea)
        const { id, descripcion } = linea;
        const updateD = fetch(`http://localhost:5000/lineas_suministro/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id, descripcion })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateD)
    }
    return(
        <MaterialTable
            title="Linea_Sumninistro"
            columns={state.columns}
            data={lineas}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    updateLinea(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteLinea(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default LineaTable;