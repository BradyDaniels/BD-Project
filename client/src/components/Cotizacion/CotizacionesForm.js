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
import CDetalleReqTable from './CDetalleReqTable'

// cedula, id_dependencia, nombre, tipo 
const CotizacionesForm = () => {

    const [req, setReq] = useState([{}])
    const [linea, setlinea] = useState([{}])
    const [proveedor, setProveedores] = useState([{}])

    const [DetalleRequisicion, setDetalleRequisicion] = useState([{}]);

    const [toggle, setToggle] = useState(false)

    const [ state, setState ] = useState({
        columns: [
            {title: 'Nombre', field: 'nombre', editable: 'never'},
            {title: 'Cantidad Solicitada', field: 'cantidad_solicitada'},
            {title: 'Precio Estimado', field: 'precio_estimado'},
        ],
        data: []
    })
    
    const proxy = 'cotizacion'
    const { handleChange, handleSubmit, values } = useForm({
        id: '',
        id_linea: '',
        fecha_emision: getLocalDate(),
        observaciones: '',
        condiciones_entrega:'',
        id_requisicion: '',
        rif: ''
        //id_cotizacion: ''
    }, proxy)



    const toggleSelect = ({ target }) => setToggle(target.value == "" ? true : false)

    const fetchLineas = () => {
        fetch('http://localhost:5000/lineas_suministro')
            .then(res => res.json())
            .then(result => setlinea(result))
            .catch(err => console.log(err.message))
    }

    const fetchRequisiciones = () => {
        const GetRequisiciones=fetch(`http://localhost:5000/requisiciones_linea/${values.id_linea}`, {
             method: 'GET',
             headers: { 'Content-type': 'application/json' }
         })
             .then(res => res.json())
             .then(result => setReq(result))
             .catch(err => console.log(err.message))
    }

    const fetchProveedores = () => {
        fetchRequisiciones()
        const GetProveedores=fetch(`http://localhost:5000/proveedores_linea/${values.id_linea}`, {
             method: 'GET',
             headers: { 'Content-type': 'application/json' }
         })
             .then(res => res.json())
             .then(result =>  setProveedores(result))
             .catch(err => console.log(err.message))
    }

    const fetchDetalleRequisicion = () => {
        if(values.id_requisicion==''){
        fetch('http://localhost:5000/detalle_requisicion')
            .then(res => res.json())
            .then(result => setDetalleRequisicion(result))
            .catch(err => console.log(err.message))
        }else{
            const GetItems=fetch(`http://localhost:5000/detalle_requisicion_item/${values.id_requisicion}`, {
             method: 'GET',
             headers: { 'Content-type': 'application/json' }
         })
             .then(res => res.json())
             .then(result => setDetalleRequisicion(result))
             .catch(err => console.log(err.message))
        }

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
        fetchLineas()
        fetchRequisiciones()
        fetchDetalleRequisicion()
        fetchProveedores()
    }, [])

    const fetchCargarCotizacion=()=>{
        fetch(`http://localhost:5000/cotizaciones`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))

        fetch(`http://localhost:5000/requisicion_cotizacion`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({id_cotizacion:values.id,id_requisicion:values.id_requisicion})
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message)) 
      
        
        fetch(`http://localhost:5000/proveedor_cotizacion`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({id_cotizacion:values.id,rif:values.rif})
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))   
    }

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
                            label="Fecha de Emision"
                            name="fecha_emision"
                            variant="outlined"
                            value={getLocalDate()} />
                    </div>
                    <TextField
                        className="text-field"
                        size="small"
                        label="Observaciones"
                        name="observaciones"
                        variant="outlined"
                        value={values.observaciones}
                        onChange={handleChange} />
                        <TextField
                            className="text-field"
                            size="small"
                            label="Condiciones de Entrega"
                            name="condiciones_entrega"
                            variant="outlined"
                            value={values.condiciones_entrega}
                            onChange={handleChange} />
                   <FormControl>
                        <InputLabel id="lineas-label">Linea</InputLabel>
                        <Select
                            labelId="lineas-label"
                            id="linea"
                            value={values.id_linea}
                            name="id_linea"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                            {linea.map((lineas, i) => (
                                <MenuItem value={lineas.id} key={i} onClick={fetchProveedores}>
                                    {lineas.descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="lineas-label">Proveedor</InputLabel>
                        <Select
                            labelId="lineas-label"
                            id="proveedor"
                            value={values.rif}
                            name="rif"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                            {proveedor.map((proveedor, i) => (
                                <MenuItem value={proveedor.rif} key={i}>
                                    {proveedor.razon_social}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="requisicion-label">Requisicion</InputLabel>
                        <Select
                            labelId="requisicion-label"
                            id="requisicion"
                            value={values.id_requisicion}
                            name="id_requisicion"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                            {req.map((req, i) => (
                                <MenuItem value={req.id} key={i} onClick={fetchDetalleRequisicion}>
                                    {req.id}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" size="small" disableElevation onClick={fetchCargarCotizacion}>Añadir Cotizacion</Button>
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
                                    //updateDetalleRequisicion(newData);//AQUI SE ACTUALIZA EL CAMPO
                                    console.log(newData);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        //deleteDetalleRequisicion(oldData.id);//AQUI SE DELETEA LA ESPECIALIDAD
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

export default CotizacionesForm