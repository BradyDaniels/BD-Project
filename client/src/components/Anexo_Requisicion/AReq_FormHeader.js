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


import Areq_FormItem from './AReq_FormItems';

const AReq_FormHeader=()=>{
    const [dependencias, setDependencias] = useState([{}])
    const [lineas, setLineas] = useState([{}])
    const [trabajadores,setTrabajador]=useState([{}])//Director
    const [JefeUnidad,setJefeUnidad]=useState([{}])  
    const [items, setItems] = useState([{}])
  

    const proxy = 'Requisicion'
    const { handleChange, handleSubmit, values } = useForm ({ 
        id: '',
        id_dependencia:'',
        id_linea:'',
        fecha_emision:'',
        cedula_director:'',
        cedula_jefeunidad:'',
        observaciones:'',
        prioridad:'',

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

    const fetchDependencias = () => {
        fetch('http://localhost:5000/dependencias')
            .then(res => res.json())
            .then(result => setDependencias(result))
            .catch(err => console.log(err.message))
        
            
    }
 
    const fetchLineas = () => {
        fetch('http://localhost:5000/lineas_suministro')
            .then(res => res.json())
            .then(result => setLineas(result))
            .catch(err => console.log(err.message))
    }

    const fetchTrabajadores=()=>{
        fetch('http://localhost:5000/Tdirectores')
            .then(res => res.json())
            .then(result => setTrabajador(result))
            .catch(err => console.log(err.message))
    }
    
    const fetchJefeUnidad=()=>{
       if(values.id_dependencia==''){ 
        fetch('http://localhost:5000/TjefeUnidad')
            .then(res => res.json())
            .then(result => setJefeUnidad(result))
            .catch(err => console.log(err.message))
         
       }
       else{
        const GetJU=fetch(`http://localhost:5000/TjefeUnidad/${values.id_dependencia}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => res.json())
            .then(result => setJefeUnidad(result))
            .catch(err => console.log(err.message))
      
         
        
       }
    }
    
    const a=async ()=>{fetchJefeUnidad()
        console.log(require.body)
     }
    useEffect(() => {
        fetchDependencias()
        fetchLineas()
        fetchTrabajadores()
        fetchJefeUnidad()
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
                            label="Nro Requisicion"
                            name="id"
                            variant="outlined"
                            value={values.id}
                            onChange={handleChange} />
                        <TextField
                            className="text-field"
                            size="small"
                            label="Fecha Emision"
                            name="fecha_emision"
                            variant="outlined"
                            value={values.fecha_emision}
                            onChange={handleChange} />
                       
                        
                    </div>
                   
                    <FormControl>
                        <InputLabel id="dependencias-label" >Dependencias</InputLabel>
                        <Select 
                           
                           
                            labelId="dependencias-label"
                            id="dependencias"
                            value={values.id_dependencia}
                            name="id_dependencia"
                            onChange={handleChange}
                      
                        >
                            {dependencias.map((dependencia, i) => (
                                <MenuItem value={dependencia.id} key={i}   onClick={fetchJefeUnidad}  >
                                    {dependencia.nombre
                                    }
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
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
                        <InputLabel id="dependencias-label">Prioridad</InputLabel>
                        <Select
                            labelId="dependencias-label"
                            id="dependencias"
                            value={values.prioridad}
                            name="prioridad"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                           
                                <MenuItem value={0} key={0}>
                                    Baja
                                </MenuItem>
                                <MenuItem value={1} key={1}>
                                    Media
                                </MenuItem>
                                <MenuItem value={2} key={2}>
                                    Alta
                                </MenuItem>
                         
                        </Select>
                    </FormControl>
                    <br></br> <br></br>
                    <FormControl>
                        <InputLabel id="dependencias-label">Aprobado por</InputLabel>
                        <Select
                            labelId="dependencias-label"
                            id="dependencias"
                            value={values.cedula_director}
                            name="cedula_director"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                            {trabajadores.map((trabajador, i) => (
                                
                                <MenuItem value={trabajador.cedula} key={i} onClick={a}>
                                    {trabajador.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="dependencias-label">Autorizado por</InputLabel>
                        <Select
                            labelId="dependencias-label"
                            id="dependencias"
                            value={values.cedula_jefeunidad}
                            name="cedula_jefeunidad"
                            onChange={handleChange}
                            onBlur={handleChange}
                        >
                            {JefeUnidad.map((Junidad, i) => (
                                <MenuItem value={Junidad.cedula} key={i}>
                                    {Junidad.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br></br> <br></br>  <br></br> <br></br>
                    <FormControl>
                        <div className="form-trabajador-1">
                        <TextField
                            className="text-field"
                            size="big"
                            label="Observaciones"
                            name="observaciones"
                            variant="outlined"
                            value={values.observaciones}
                            onChange={handleChange} />
                        </div>
                    </FormControl>
                </FormControl>
            </form>
             <Areq_FormItem items={items} Rvalues={values}/>
        </div>
    )

}

export default AReq_FormHeader