import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import useForm from '../useForm/useForm'
import MaterialTable from 'material-table'

// id, precio_total, formato_pago, tipo_moneda, rif, id_cotizacion

const RespuestasForm = () => {
    const [proveedores, setProveedores] = useState([{}])
    const [cotizaciones, setCotizaciones] = useState([{}])
    const [precioTotal, setPrecioTotal] = useState([{}])
    
    const [DetalleRequisicion, setDetalleRequisicion] = useState([{}]);

    
    const [toggle, setToggle] = useState(false)

    const [ state, setState ] = useState({
        columns: [
            {title: 'ID', field: 'id', editable: 'never'},
            {title: 'Cantidad Solicitada', field: 'cantidad_solicitada'},
            {title: 'Precio Estimado', field: 'precio_estimado'},
            {title: 'ID Item', field: 'id_item'},
        ],
        data: []
    })
    
    const proxy = 'respuestas'
    const { handleChange, handleSubmit, values } = useForm({
        id: '',
        precio_total: '',
        formato_pago: '',
        tipo_moneda: '',
        rif: '',
        id_cotizacion: '',
    }, proxy)

    

    const toggleSelect = ({ target }) => setToggle(target.value == "" ? true : false)

    const fetchProveedores = () => {
        fetch('http://localhost:5000/proveedores')
            .then(res => res.json())
            .then(result => setProveedores(result))
            .catch(err => console.log(err.message))
    }

    const fetchCotizaciones = () => {
        fetch('http://localhost:5000/cotizaciones')
            .then(res => res.json())
            .then(result => setCotizaciones(result))
            .catch(err => console.log(err.message))
    }
    const fetchPrecioTotal = () => { //Bueno aqui toca poner que llame con el id
        fetch('http://localhost:5000/precio_total/')
            .then(res => res.json())
            .then(result => setPrecioTotal(result))
            .catch(err => console.log(err.message))
    }
    //obtener todas las DetalleRequisicion
    const fetchDetalleRequisicion = () => {
        fetch('http://localhost:5000/detalle_requisicion')
            .then(res => res.json())
            .then(result => setDetalleRequisicion(result))
            .catch(err => console.log(err.message))
    }

    //eliminar una Detalle Requisicion
    const deleteDetalleRequisicion = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/detalle_requisicion/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Detalle Requisicion
    const updateDetalleRequisicion = (detalleRequisicion) => {
        console.log(detalleRequisicion)
        const { id, cantidad_solicitada, precio_estimado, id_requisicion, id_item } = detalleRequisicion;
        const updateDR = fetch(`http://localhost:5000/detalle_requisicion/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id, cantidad_solicitada, precio_estimado, id_requisicion, id_item })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
        console.log(updateDR)
    }

    useEffect(() => {
        fetchProveedores()
        fetchCotizaciones()
        fetchPrecioTotal()
        fetchDetalleRequisicion();
    }, [])

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                
                <FormControl className="form-trabajador">  
                <FormControl>
                        <InputLabel id="cotizacion-label">Cotizacion</InputLabel>
                        <Select
                            labelId="cotizacion-label"
                            id="cotizaciones"
                            value={values.id_cotizacion}
                            name="id_cotizacion"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                            {cotizaciones.map((cotizaciones, i) => (
                                <MenuItem value={cotizaciones.id} key={i}>
                                    {cotizaciones.id}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <FormControl>
                        <InputLabel id="proveedor-label">Proveedor</InputLabel>
                        <Select
                            labelId="proveedor-label"
                            id="proveedores"
                            value={values.rif}
                            name="rif"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                            {proveedores.map((proveedores, i) => (
                                <MenuItem value={proveedores.rif} key={i}>
                                    {proveedores.razon_social}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br></br>
                    <div className="form-trabajador-1">
                        <TextField
                            className="text-field"
                            size="small"
                            label="ID Respuesta"
                            name="id"
                            variant="outlined"
                            value={values.id}
                            onChange={handleChange} />
                        <TextField
                            className="text-field"
                            size="small"
                            label="Precio Total"
                            name="precio_total"
                            variant="outlined"
                            // Se quito el ConChange
                            value={values.precio_total} />
                            <br></br>
                            
                        <RadioGroup aria-label="Tipo de Moneda" name="tipo_moneda" value={values.tipo_moneda} onChange={handleChange}>
                            <FormControlLabel onClick={toggleSelect} value="bolivares" control={<Radio />} label="Bolivares" />
                            <FormControlLabel onClick={toggleSelect} value="divisas" control={<Radio />} label="Divisas" />
                        </RadioGroup>
                    </div>
                    
                    <br></br>
                    <RadioGroup aria-label="Formato de Pago" name="formato_pago" value={values.formato_pago} onChange={handleChange}>
                        <FormControlLabel onClick={toggleSelect} value="contado" control={<Radio />} label="Contado" />
                        <FormControlLabel onClick={toggleSelect} value="credito" control={<Radio />} label="Credito" />
                    </RadioGroup>
                    <Button type="submit" variant="contained" size="small" disableElevation>Registrar Repuesta</Button>
                </FormControl>
                
            </form>
            
        <MaterialTable
            title="Detalles de Requisicion"
            columns={state.columns}
            data={DetalleRequisicion}
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
                                    updateDetalleRequisicion(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        deleteDetalleRequisicion(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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
            
        </div>

        
    )
}

export default RespuestasForm