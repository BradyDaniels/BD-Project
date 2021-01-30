import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

const ItemTable=()=>{
    const [items, setItems] = useState([{}])
    const [state, setState] = useState({
        columns: [
            { title: 'id', field: 'id', editable: 'never' },
            { title: 'Nombre', field: 'nombre' },
            { title: 'Nombre Corto', field: 'nombre_corto' },
            { title: 'Descripcion', field: 'descripcion' },
            { title: 'ID de Linea', field: 'id_linea' },
        ],
        data: []
    })

    //Cuando se renderiza el componente se llama la funcion que obtiene todas las especialidades
    useEffect(() => {
        fetchItems()
    }, [])

    //obtener todos los Trabajadores
    const fetchItems = () => {
        fetch('http://localhost:5000/items')
            .then(res => res.json())
            .then(result => setItems(result))
            .catch(err => console.log(err.message))
    }

    //eliminar un Trabajador
    const deleteItems = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/items/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar un Trabajador
    const updateItems = (items) => {
        console.log(items)
        const {  id, nombre, nombre_corto, descripcion, unidad_medida, precio_unitario, id_linea } = items;
        const updateT = fetch(`http://localhost:5000/items/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({  id, nombre, nombre_corto, descripcion, unidad_medida, precio_unitario, id_linea })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateT)
    }
     
    return (
        <MaterialTable
            title="Items"
            columns={state.columns}
            data={items}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    updateItems(newData);                //AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteItems(oldData.id);                    //AQUI SE DELETEA LA ESPECIALIDAD
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

export default ItemTable