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

const OrdenCompraForm = () => {
    const [trabajadores, settrabajadores] = useState([{}])
    const [cotizaciones, setCotizaciones] = useState([{}])
    const [precioTotal, setPrecioTotal] = useState([{}])
    const [respuestas, setRespuestas] = useState([{}])
    var [subtotal, setSubtotal] = useState([{}])
    //var subtotal = 0;

    const iva = 0.12
    
    const [DetalleCompra, setDetalleCompra] = useState([{}]);

    
    const [toggle, setToggle] = useState(false)

    const [ state, setState ] = useState({
        columns: [
            {title: 'ID Item', field: 'id_item', editable: 'never'},
            {title: 'Cantidad', field: 'cantidad'},
            {title: 'Precio Compra', field: 'precio_compra'},
        ],
        data: []
    })
    
    const proxy = 'orden_compra'
    const { handleChange, handleSubmit, values } = useForm({
        id: '',
        fecha_orden: getLocalDate(),
        monto_total: '',
        fecha_entrega: '',
        formato_pago: '',
        tipo_moneda: '',
        cedula_director: '',
        observaciones: '',
        condiciones_entrega: '',
    }, proxy)


    const toggleSelect = ({ target }) => setToggle(target.value == "" ? true : false)

    const fetchtrabajadores = () => {
        fetch('http://localhost:5000/directores')
            .then(res => res.json())
            .then(result => settrabajadores(result))
            .catch(err => console.log(err.message))
    }

    const fetchCotizaciones = () => {
        fetch('http://localhost:5000/cotizaciones')
            .then(res => res.json())
            .then(result => setCotizaciones(result))
            .catch(err => console.log(err.message))
    }

    
    //obtener todas las DetalleCompra
    const fetchDetalleCompra = () => {
        if(values.id_respuesta == undefined){
            console.log("No hay Respuesta")
         fetch('http://localhost:5000/detalle_compra')
             .then(res => res.json())
             .then(result => setDetalleCompra(result))
             .catch(err => console.log(err.message))
          
        }
        else{
            console.log("Hay una Respuesta")
         const GetDetalleCompra=fetch(`http://localhost:5000/detallecomprarespuesta/${values.id_respuesta}`, {
             method: 'GET',
             headers: { 'Content-type': 'application/json' }
         })
             .then(res => res.json())
             .then(result => setDetalleCompra(result))
             .catch(err => console.log(err.message))
        
        }
    }

    const fetchRespuestas = () => {
        if(values.id_cotizacion == undefined){
         fetch('http://localhost:5000/respuestas')
             .then(res => res.json())
             .then(result => setRespuestas(result))
             .catch(err => console.log(err.message))
          
        }
        else{
         const GetRespuestas=fetch(`http://localhost:5000/respuesta_cotizacion/${values.id_cotizacion}`, {
             method: 'GET',
             headers: { 'Content-type': 'application/json' }
         })
             .then(res => res.json())
             .then(result => setRespuestas(result))
             .catch(err => console.log(err.message))
        
        }
    }
    const fetchSubtotal = () => {
        if(values.id_respuesta == undefined){
            console.log("Subtotal Vacio")
        //  fetch('http://localhost:5000/subtotal')
        //      .then(res => res.json())
        //      .then(result => setSubtotal(result))
        //      .catch(err => console.log(err.message))
          
        }
        else{
            console.log ("Subtotal antes del fetch")
         const GetSubtotal=fetch(`http://localhost:5000/subtotal/${values.id_respuesta}`, {
             method: 'GET',
             headers: { 'Content-type': 'application/json' }
         })
             .then(res => res.json())
             //.then(result => console.log(result))
             .then (result => subtotal = result[0] ) 
             .then (() => console.log(subtotal.sum)) 
             .catch(err => console.log(err.message))
        
        }
    }
    //eliminar una Detalle Requisicion
    const deleteDetalleCompra = (id) => {
        console.log(id)
        fetch(`http://localhost:5000/detalle_compra/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    //actualizar una Detalle Requisicion
    const updateDetalleCompra = (DetalleCompra) => {
        console.log(DetalleCompra)
        const { id, cantidad_solicitada, precio_estimado, id_requisicion, id_item } = DetalleCompra;
        const updateDR = fetch(`http://localhost:5000/detalle_compra/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ id, cantidad_solicitada, precio_estimado, id_requisicion, id_item })
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
    }

    
    function getLocalDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;
        return today;
    }
    
    useEffect(() => {
        fetchtrabajadores()
        fetchCotizaciones()
        fetchRespuestas();
        fetchSubtotal()
    }, [])

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                
                <FormControl className="form-trabajador">
                <TextField
                            className="text-field"
                            size="small"
                            label="ID Orden"
                            name="id"
                            variant="outlined"
                            value={values.id}
                            onChange={handleChange} />   
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
                                <MenuItem value={cotizaciones.id} key={i}  onClick = {fetchRespuestas}>
                                    {cotizaciones.id}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="proveedor-label">Respuesta</InputLabel>
                        <Select
                            labelId="proveedor-label"
                            id="respuestas"
                            value={values.id_respuesta}
                            name="id_respuesta"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                            {respuestas.map((respuestas, i) => (
                                <MenuItem value={respuestas.id} key={i} onClick = {fetchDetalleCompra}>
                                    {respuestas.id}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    <br></br>
                    <div className="form-trabajador-1">
                            <TextField
                                className="text-field"
                                size="small"
                                label="Fecha de Emision"
                                name="fecha_orden"
                                variant="outlined"
                                // Se quito el ConChange
                                value={getLocalDate()} />
                            
                        <TextField
                            className="text-field"
                            size="small"
                            label="Fecha de Entrega"
                            name="fecha_entrega"
                            variant="outlined"
                            value={values.fecha_entrega}
                            onChange={handleChange} />
                            <br></br><br></br>
                        <div>
                        <TextField
                            className="text-field"
                            size="small"
                            label="Subtotal"
                            name="subtotal"
                            variant="outlined"
                            // Se quito el ConChange
                            value={subtotal} 
                            onChange={handleChange} /> 
                        </div>      
                        <div>
                        <TextField
                            className="text-field"
                            size="small"
                            label="IVA"
                            name="iva"
                            variant="outlined"
                            // Se quito el ConChange
                            value={iva} 
                            onChange={handleChange} />     
                        </div>
                        <TextField
                            className="text-field"
                            size="small"
                            label="Monto Total"
                            name="monto_total"
                            variant="outlined"
                            // Se quito el ConChange
                            value={values.monto_total} 
                            onChange={handleChange} />     
                    </div>
                   <RadioGroup aria-label="Tipo de Moneda" name="tipo_moneda" value={values.tipo_moneda} onChange={handleChange}>
                            <FormControlLabel onClick={toggleSelect} value="bolivares" control={<Radio />} label="Bolivares" />
                            <FormControlLabel onClick={toggleSelect} value="divisas" control={<Radio />} label="Divisas" />
                        </RadioGroup>
                    <br></br>
                    <RadioGroup aria-label="Formato de Pago" name="formato_pago" value={values.formato_pago} onChange={handleChange}>
                        <FormControlLabel onClick={toggleSelect} value="contado" control={<Radio />} label="Contado" />
                        <FormControlLabel onClick={toggleSelect} value="credito" control={<Radio />} label="Credito" />
                    </RadioGroup>
                     <TextField
                            className="text-field"
                            size="small"
                            label="Observaciones"
                            name="observaciones"
                            variant="outlined"
                            value={values.observaciones} 
                            onChange={handleChange}/>
                        <br></br>
                        <TextField
                            className="text-field"
                            size="small"
                            label="Condiciones de Entrega"
                            name="condiciones_entrega"
                            variant="outlined"
                            value={values.condiciones_entrega} 
                            onChange={handleChange}/>
                    <FormControl>
                        <InputLabel id="proveedor-label">Director</InputLabel>
                        <Select
                            labelId="proveedor-label"
                            id="trabajadores"
                            value={values.cedula_director}
                            name="cedula_director"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                            {trabajadores.map((trabajadores, i) => (
                                <MenuItem value={trabajadores.cedula} key={i}>
                                    {trabajadores.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" size="small" disableElevation>Registrar Orden de Compra</Button>
                </FormControl>
            </form>
            <br></br>
            
        <MaterialTable
            title="Detalles de Compra"
            columns={state.columns}
            data={DetalleCompra}
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
                                   // updateDetalleCompra(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                       // deleteDetalleCompra(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default OrdenCompraForm