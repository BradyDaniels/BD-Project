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

// cedula, id_dependencia, nombre, tipo 
const TrabajadoresForm = () => {
    const [dependencias, setDependencias] = useState([{}])
    //const [instituciones, setInstituciones] = useState([{}])
    const [toggle, setToggle] = useState(false)
    const proxy = 'trabajadores'
    const { handleChange, handleSubmit, values } = useForm({
        cedula: '',
        id_dependencia: '',
        nombre: '',
        tipo: '',
    }, proxy)

    const toggleSelect = ({ target }) => setToggle(target.value == "" ? true : false)

    const fetchDependencias = () => {
        fetch('http://localhost:5000/dependencias')
            .then(res => res.json())
            .then(result => setDependencias(result))
            .catch(err => console.log(err.message))
    }

    // const fetchInstituciones = () => {
    //     fetch('http://tesis-manager.herokuapp.com/instituciones')
    //         .then(res => res.json())
    //         .then(result => setInstituciones(result))
    //         .catch(err => console.log(err.message))
    // }

    useEffect(() => {
        fetchDependencias()
        //fetchInstituciones()
    }, [])

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormControl className="form-trabajador">
                    <div className="form-trabajador-1">
                        <TextField
                            className="text-field"
                            size="small"
                            label="Cedula"
                            name="cedula"
                            variant="outlined"
                            value={values.cedula}
                            onChange={handleChange} />
                        <TextField
                            className="text-field"
                            size="small"
                            label="Nombre"
                            name="nombre"
                            variant="outlined"
                            value={values.nombre}
                            onChange={handleChange} />
                        {/* <TextField
                            className="text-field"
                            size="small"
                            label="Direccion"
                            name="direccion_p"
                            variant="outlined"
                            value={values.direccion_p}
                            onChange={handleChange} /> */}
                    </div>
                    {/* <TextField
                        className="text-field"
                        size="small"
                        label="Correo"
                        name="correo_p"
                        variant="outlined"
                        value={values.correo_p}
                        onChange={handleChange} />
                    <TextField
                        className="text-field"
                        size="small"
                        label="Telefono"
                        name="telefono_p"
                        variant="outlined"
                        value={values.telefono_p}
                        onChange={handleChange} /> */}
                    <RadioGroup aria-label="tipo" name="tipo" value={values.tipo} onChange={handleChange}>
                        <FormControlLabel onClick={toggleSelect} value="J" control={<Radio />} label="Jefe de Unidad" />
                        <FormControlLabel onClick={toggleSelect} value="D" control={<Radio />} label="Director" />
                        <FormControlLabel onClick={toggleSelect} value="" control={<Radio />} label="N/A" />
                    </RadioGroup>
                    <FormControl>
                        <InputLabel id="dependencias-label">Dependencias</InputLabel>
                        <Select
                            labelId="dependencias-label"
                            id="dependencias"
                            value={values.id_dependencia}
                            name="id_dependencia"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                            {dependencias.map((dependencia, i) => (
                                <MenuItem value={dependencia.id} key={i}>
                                    {dependencia.nombre}
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

export default TrabajadoresForm