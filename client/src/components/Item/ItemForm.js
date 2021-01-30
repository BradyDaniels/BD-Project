import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import useForm from '../useForm/useForm'

const ItemForm=()=>{
    const [lineas, setLineas] = useState([{}])
    //const [instituciones, setInstituciones] = useState([{}])
    const [toggle, setToggle] = useState(false)
   // se define el nombre del endpoint que se va a utiliar para el POST
   const proxy = 'items'
   const { handleChange, handleSubmit, values } = useForm ({ 
       id: '',
       nombre: '',
       descripcion: '',
       unidad_medida:'',
       precio_unitario:'',
       id_linea:''  
   }, proxy);

   

    const fetchLineas = () => {
        fetch('http://localhost:5000/lineas_suministro')
            .then(res => res.json())
            .then(result => setLineas(result))
            .catch(err => console.log(err.message))
    }
     
    useEffect(() => {
        fetchLineas()
        //fetchInstituciones()
    }, [])

   return(
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
                        label="Nombre"
                        name="nombre"
                        variant="outlined"
                        value={values.nombre}
                        onChange={handleChange} />
                    <TextField
                        className="text-field"
                        size="small"
                        label="Nombre Corto"
                        name="nombre_corto"
                        value={values.nombre_corto}
                        variant="outlined"
                        onChange={handleChange} />

                    <TextField
                        className="text-field"
                        size="small"
                        label="Descripcion"
                        name="descripcion"
                        variant="outlined"
                        value={values.descripcion}
                        onChange={handleChange} />
                    <TextField
                        className="text-field"
                        size="small"
                        variant="outlined"
                        label="Unidad de Medida"
                        name="unidad_medida"
                        value={values.unidad_medida}
                        onChange={handleChange} />
                    <TextField
                        className="text-field"
                        size="small"
                        variant="outlined"
                        label="Precio Unitario"
                        name="precio_unitario"
                        value={values.precio_unitario}
                        onChange={handleChange} /> 
            
                </div>
                    <FormControl>
                        <InputLabel id="dependencias-label">Lineas de Suministro</InputLabel>
                        <Select
                            labelId="dependencias-label"
                            id="dependencias"
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
                    </FormControl>                
                
                <Button type="submit" variant="contained" size="small" disableElevation>Añadir Item</Button>
            </FormControl>
        </form>
   </div> 
)

}

export default ItemForm;