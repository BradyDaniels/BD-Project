import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import React from 'react';
import useForm from '../useForm/useForm';

const LineaSuministroForm=()=>{
    // se define el nombre del endpoint que se va a utiliar para el POST
    const proxy = 'lineas_suministro'
    const { handleChange, handleSubmit, values } = useForm ({ 
        id: '',
        descripcion: '' 
    }, proxy)

    return(
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <FormControl className="form-dependenciia">
                <div className="form-dependencia-1">
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
                        label="Descripcion"
                        name="descripcion"
                        variant="outlined"
                        value={values.descripcion}
                        onChange={handleChange} />
                 </div>
                <Button type="submit" variant="contained" size="small" disableElevation>Añadir Linea de Suministro</Button>
            </FormControl>
        </form>
    </div>
    )
   
}

export default LineaSuministroForm;