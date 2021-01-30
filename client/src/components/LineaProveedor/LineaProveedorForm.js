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
import Proveedores from '../Proveedores/Proveedores'

// id_Linea, rif 
const LineaProveedorForm = () => {
    const [lineas, setLineas] = useState([{}])
    const [proveedores, setProveedores] = useState([{}])
    const [toggle, setToggle] = useState(false)
    const proxy = 'linea_proveedor'
    const { handleChange, handleSubmit, values } = useForm({
        id_linea: '',
        rif: '',
    }, proxy)

    const toggleSelect = ({ target }) => setToggle(target.value == "" ? true : false)

    const fetchLineas = () => {
        fetch('http://localhost:5000/lineas_suministro')
            .then(res => res.json())
            .then(result => setLineas(result))
            .catch(err => console.log(err.message))
    }
    const fetchProveedores = () => {
        fetch('http://localhost:5000/proveedores')
            .then(res => res.json())
            .then(result => setProveedores(result))
            .catch(err => console.log(err.message))
    }


    useEffect(() => {
        fetchLineas()
        fetchProveedores()
    }, [])

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormControl className="form-trabajador">
                    <div className="form-trabajador-1">    
                        <InputLabel id="Lineas-label">Linea</InputLabel>
                            <Select
                                labelId="lineas-label"
                                id="id_linea"
                                value={values.id_linea}
                                name="id_linea"
                                onChange={handleChange}
                                onBlur={handleChange}
                                >
                                {lineas.map((linea, i) => (
                                    <MenuItem value={linea.id} key={i}>
                                        {linea.descripcion}
                                    </MenuItem>
                                ))}
                            </Select>
                    </div>
                    <FormControl>
                            
                            <InputLabel id="Rif-label">Proveedor</InputLabel>
                            <Select
                                labelId="rif-label"
                                id="razon_social"
                                value={values.rif}
                                name="rif"
                                onChange={handleChange}
                                onBlur={handleChange}
                                >
                                {proveedores.map((proveedor, i) => (
                                    <MenuItem value={proveedor.rif} key={i}>
                                        {proveedor.razon_social}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    <Button type="submit" variant="contained" size="small" disableElevation>Añadir Linea-Proveedor</Button>
                </FormControl>
            </form>
        </div>
    )
}

export default LineaProveedorForm