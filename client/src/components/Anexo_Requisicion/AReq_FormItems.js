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

const AReq_FormItems=({items,Rvalues})=>{
    const [lineas, setLineas] = useState([{}])

    //const [items, setItems] = useState([{}])

    const [ReqItems,setReqItems]=useState([{id:null}])

    
    const [state, setState] = useState({
        columns: [
            { title: 'id', field: 'id_item', editable: 'never' },
            { title: 'Item', field: 'nombre' ,editable: 'never'},
            { title: 'Cantidad', field: 'cantidad_solicitada',type: 'numeric'},
            { title: 'Precio', field: 'precio_estimado' ,type: 'numeric',editable: 'never'},
        ],
        data: []
    })
    
    const proxy='Requisicion';
    const { handleChange, handleSubmit, values } = useForm ({ 
        id: '',
        id_item:'',
        nombre: '',
        descripcion: '',
        unidad_medida:'',
        precio_unitario:'',
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
    
    const check=()=>{
       var aux=false 
       ReqItems.map((item,i)=>{
           if(item.id==values.id){
              aux=true
            
           }     
       })
        
       return aux;
    }

    const cargar=()=>{
     
        items.map((item,i)=>{
            if(values.id==item.id){
           
                if(ReqItems[0].id==null){
                        setReqItems([{id_requisicion:Rvalues.id,id:i,id_linea:item.id_linea,id_item:item.id,nombre:item.nombre,cantidad_solicitada:1,precio_estimado:item.precio_unitario,precio:item.precio_unitario}])
                }
                else if(!check() && values.id_linea==ReqItems[0].id_linea){
                    setReqItems(ReqItems.concat([{id_requisicion:Rvalues.id,id:i,id_linea:item.id_linea,id_item:item.id,nombre:item.nombre,cantidad_solicitada:1,precio_estimado:item.precio_unitario,precio:item.precio_unitario}]))
                
                    }
          
            }
        })
 
    }
    const fetchCargarRequisicion=()=>{
        console.log('VALORES: ',Rvalues.id)
        console.log('LISTA DE ITMES: ',ReqItems[0].id_requisicion)
        fetch(`http://localhost:5000/requisiciones`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(Rvalues)
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message))
       ReqItems.map((item,i)=>{
        fetch(`http://localhost:5000/detalle_requisicion`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(ReqItems[i])
        })
            .then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err.message)) 
       }) 
          
    }
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
                                    <MenuItem value={linea.id} key={i}>
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
                        <Button onClick={cargar} variant="contained" size="small" disableElevation>Añadir Item</Button>     

                </FormControl>
            </form>
            <MaterialTable
                title="Items"
                columns={state.columns}
                data={ReqItems}
                editable={{
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                               if(ReqItems[0].id!=null){ 
                                const dataDelete = [...ReqItems];
                                const index = oldData.tableData.id;
                                console.log(oldData.id)
                                dataDelete.splice(index, 1);
                                if(ReqItems[0].id!=oldData.id)
                                setReqItems([...dataDelete]);
                                else
                                setReqItems([{id:null}])  
                               }  
                            resolve()
                            }, 1000)
                        }),
                    }}
         
                cellEditable={{
                    onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                      return new Promise((resolve, reject) => {
                        console.log('newValue: ' + rowData.id_item);
                          
                         rowData.cantidad=newValue
                        rowData.precio=rowData.precio_unitario*rowData.cantidad
                        setTimeout(resolve, 1000);
                      });
                    }
                  }}
            />
            <Button onClick={fetchCargarRequisicion} variant="contained" size="small" disableElevation>CARGAR REQUISICION</Button>
        </div>
    )
}

export default AReq_FormItems 