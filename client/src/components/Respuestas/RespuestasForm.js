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

// id, precio_total, formato_pago, tipo_moneda, rif, id_cotizacion

const RespuestasForm = () => {
    const [proveedores, setProveedores] = useState([{}])
    const [cotizaciones, setCotizaciones] = useState([{}])
    const [precioTotal, setPrecioTotal] = useState([{}])

    
    const [toggle, setToggle] = useState(false)
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

    useEffect(() => {
        fetchProveedores()
        fetchCotizaciones()
        fetchPrecioTotal()
    }, [])

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormControl className="form-trabajador">
                    <div className="form-trabajador-1">
                        <TextField
                            className="text-field"
                            size="small"
                            label="ID"
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
                    <FormControl>
                        <InputLabel id="proveedor-label">Proveedor</InputLabel>
                        <Select
                            labelId="proveedor-label"
                            id="proveedor"
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
                    {/* {toggle ?
                        <FormControl className="instituciones">
                            <InputLabel id="instituciones-label">Instituciones</InputLabel>
                            <Select
                                labelId="instituciones-label"
                                id="instituciones"
                                value={values.cod_inst}
                                name="cod_inst"
                                onChange={handleChange}
                                onBlur={handleChange}
                            >
                                {instituciones.map((institucion, i) => (
                                    <MenuItem value={institucion.cod_inst} key={i}>
                                        {institucion.nombre_inst}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        : <div></div>
                    } */}
                    <Button type="submit" variant="contained" size="small" disableElevation>Añadir Trabajador</Button>
                </FormControl>
            </form>
        </div>
    )
}

export default RespuestasForm