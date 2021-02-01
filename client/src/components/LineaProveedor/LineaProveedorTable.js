import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'

// id_linea, rif 
const LineaProveedorTable = () => {
    const [lineaProveedor, setLineaProveedor] = useState([{}])
    const [state, setState] = useState({
        columns: [
            { title: 'Linea', field: 'id_linea', editable: 'never' },
            { title: 'RIF', field: 'rif', editable: 'never' },
        ],
        data: []
    })

    //Cuando se renderiza el componente se llama la funcion que obtiene todas las especialidades
    useEffect(() => {
        fetchLineaProveedor()
    }, [])

    //obtener todos los Trabajadores
    const fetchLineaProveedor = () => {
        fetch('http://localhost:5000/linea_proveedor')
            .then(res => res.json())
            .then(result => setLineaProveedor(result))
            .catch(err => console.log(err.message))
    }

    //eliminar un Trabajador
    const deleteLineaProveedor = (id_linea, rif) => {
        console.log(id_linea, rif)
        fetch(`http://localhost:5000/linea_proveedor/${id_linea}/${rif}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar un Trabajador
    const updateLineaProveedor = (lineaProveedor) => {
        console.log(lineaProveedor)
        const { id_linea, rif } = lineaProveedor;
        const updateLP = fetch(`http://localhost:5000/linea_proveedor/${id_linea}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id_linea, rif })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateLP)
    }


    return (
        <MaterialTable
            title="Linea Proveedor"
            columns={state.columns}
            data={lineaProveedor}
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
                                    updateLineaProveedor(newData);                //AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteLineaProveedor(oldData.id_linea, oldData.rif);                    //AQUI SE DELETEA LA ESPECIALIDAD
                        console.log(oldData.id_linea, oldData.rif);
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

export default LineaProveedorTable