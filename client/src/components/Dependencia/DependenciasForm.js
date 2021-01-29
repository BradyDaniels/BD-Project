import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import React from 'react';
import useForm from '../useForm/useForm';

const DependenciasForm = () => {
    // se define el nombre del endpoint que se va a utiliar para el POST
    const proxy = 'dependencias'
    const { handleChange, handleSubmit, values } = useForm ({ 
        id: '',
        nombre: '',
        centro_costo: '' 
    }, proxy)

    return (
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
                            label="Nombre"
                            name="nombre"
                            variant="outlined"
                            value={values.nombre}
                            onChange={handleChange} />
                        <TextField
                            className="text-field"
                            size="small"
                            label="Centro de Costo"
                            name="centro_costo"
                            value={values.centro_costo}
                            variant="outlined"
                            onChange={handleChange} />
                    </div>
                    {/* <TextField
                        className="text-field"
                        size="small"
                        label="Correo"
                        name="correo_particular_t"
                        variant="outlined"
                        value={values.correo_particular_t}
                        onChange={handleChange} />
                    <TextField
                        className="text-field"
                        size="small"
                        variant="outlined"
                        label="Correo UCAB"
                        name="correo_ucab_t"
                        value={values.correo_ucab_t}
                        onChange={handleChange} /> */}
                    <Button type="submit" variant="contained" size="small" disableElevation>Añadir Dependencia</Button>
                </FormControl>
            </form>
        </div>
    )
}

export default DependenciasForm