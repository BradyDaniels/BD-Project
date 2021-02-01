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

const AReq_FormItems=()=>{
    const [lineas, setLineas] = useState([{}])

    const [items, setItems] = useState([{}])

    const [ReqItems,setReqItems]=useState([{}])
    
    const [state, setState] = useState({
        columns: [
            { title: 'id', field: 'id', editable: 'never' },
            { title: 'Item', field: 'id_item' },
            { title: 'Cantidad', field: 'cantidad' },
            { title: 'Precio', field: 'precio' },
        ],
        data: []
    })
    
    const proxy='Requisicion';
    const { handleChange, handleSubmit, values } = useForm ({ 
        id: '',
        nombre: '',
        descripcion: '',
        unidad_medida:'',
        precio_unitario:'',
        id_linea:''  
    }, proxy);

    const fetchLineaItems=()=>{
        if(values.id_linea==''){ 
         fetch('http://localhost:5000/Items')
             .then(res => res.json())
             .then(result => setItems(result))
             .catch(err => console.log(err.message))
          
        }
        else{
         const GetItems=fetch(`http://localhost:5000/Lineaitems/${values.id_linea}`, {
             method: 'GET',
             headers: { 'Content-type': 'application/json' }
         })
             .then(res => res.json())
             .then(result => setItems(result))
             .catch(err => console.log(err.message))
       
          
         
        }
    }   
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

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <FormControl  className="form-trabajador">
                        <FormControl>
                            <InputLabel id="dependencias-label">Linea de Suministro</InputLabel>
                            <Select
                                labelId="dependencias-label"
                                id="dependencias"
                                value={values.id_linea}
                                name="id_linea"
                                onChange={handleChange}
                                onBlur={handleChange}
                            >
                                {lineas.map((linea, i) => (
                                    <MenuItem value={linea.id} key={i} onClick={fetchLineaItems}>
                                        {linea.descripcion}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <InputLabel id="dependencias-label">Items</InputLabel>
                            <Select
                                labelId="dependencias-label"
                                id="dependencias"
                                value={values.id}
                                name="id"
                                onChange={handleChange}
                                onBlur={handleChange}
                            >
                                {items.map((item, i) => (
                                    <MenuItem value={item.id} key={i}>
                                        {item.nombre}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" size="small" disableElevation>Añadir Item</Button>     

                </FormControl>
            </form>
            <MaterialTable
                title="Items"
                columns={state.columns}
                data={ReqItems}
            />
        </div>
    )
}

export default AReq_FormItems 