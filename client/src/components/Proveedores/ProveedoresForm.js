import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import React from 'react';
import useForm from '../useForm/useForm';

const ProveedoresForm=()=>{
    // se define el nombre del endpoint que se va a utiliar para el POST
    const proxy = 'proveedores'
    const { handleChange, handleSubmit, values } = useForm ({ 
        rif: '',
        razon_social: '',
        telefono: '',
        correo:'',
        direccion:''  
    }, proxy);
    return(
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <FormControl className="form-dependenciia">
                <div className="form-dependencia-1">
                    <TextField
                        className="text-field"
                        size="small"
                        label="RIF"
                        name="rif"
                        variant="outlined"
                        value={values.rif}
                        onChange={handleChange} />
                    <TextField
                        className="text-field"
                        size="small"
                        label="Razon Social"
                        name="razon_social"
                        variant="outlined"
                        value={values.razon_social}
                        onChange={handleChange} />
                    <TextField
                        className="text-field"
                        size="small"
                        label="Telefono"
                        name="telefono"
                        value={values.telefono}
                        variant="outlined"
                        onChange={handleChange} />

                    <TextField
                        className="text-field"
                        size="small"
                        label="Correo"
                        name="correo"
                        variant="outlined"
                        value={values.correo}
                        onChange={handleChange} />
                    <TextField
                        className="text-field"
                        size="small"
                        variant="outlined"
                        label="Direccion"
                        name="direccion"
                        value={values.direccion}
                        onChange={handleChange} />     
                </div>
                
                <Button type="submit" variant="contained" size="small" disableElevation>Añadir Proveedor</Button>
            </FormControl>
        </form>
    </div> 
    )

}

export default ProveedoresForm;