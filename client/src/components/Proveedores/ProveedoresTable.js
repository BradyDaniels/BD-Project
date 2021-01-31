import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import ProLineaTable from './Proveedores_Linea/ProLineaTable';
import Button from '@material-ui/core/Button'



const ProveedoresTable=()=>{
   //estado del Componente
    
   const [proveedores, setProveedores] = useState([{}]);

   //estado para los titulos de las columnas de la tabla
   //NOTA: EL CAMPO FIELD DEBE SER EL MISMO NOMBRE QUE TIENE EL ATRIBUTO EN LA BD, SINO SE ROMPE
   //TODAS LAS VARIABLES DE LAS TABLAS DEBEN TENER EL MISMO NOMBRE QUE EN LA BD
   const [ state, setState ] = useState({
       columns: [
           {title: 'id', field: 'rif', editable: 'never'},
           {title: 'Razon Social', field: 'razon_social'},
           {title: 'Telefono', field: 'telefono'},
           {title: 'Correo', field: 'correo'},
           {title: 'Direccion', field: 'direccion'},
       ],
       data: []
   })

   useEffect(() => {
    fetchProveedores()
   }, [])

   //obtener todas las Dependencias
   const fetchProveedores = () => {
        fetch('http://localhost:5000/proveedores')
            .then(res => res.json())
            .then(result => setProveedores(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Dependencia
    const deleteProveedor = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/proveedores/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Dependencia
    const updateProveedor = (proveedor) => {
        console.log(proveedor)
        const { rif, razon_social, telefono,correo,direccion } = proveedor;
        const updateD = fetch(`http://localhost:5000/proveedores/${rif}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ rif, razon_social, telefono,correo,direccion })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateD)
    }
    
    return(
        <MaterialTable
            title="Proveedores"
            columns={state.columns}
            data={proveedores}
            options={{
                filtering: true
              }}
           detailPanel={[
               {
                tooltip: 'Show Name',
                render: rowData => {
                  return (
                    <ProLineaTable/>
                  )
                }
               }
           ]}
            editable={{
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    updateProveedor(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteProveedor(oldData.rif);//AQUI SE DELETEA LA ESPECIALIDAD
                        console.log(oldData.rif);
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
        >
            
        </MaterialTable>
    )

}

export default ProveedoresTable;