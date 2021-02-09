const { createServer } = require('http') //no estaba
const express = require ("express"); 
const compression = require ('compression') //no estaba
const morgan = require('morgan') //no estaba
const path = require ('path') //no estaba
const cors = require("cors");

//Import de los endpoints
const cotizaciones = require("../routes/cotizaciones.js")
const dependencias = require ("../routes/dependencias.js")
const detalle_compra = require("../routes/detalle_compra")
const detalle_requisicion = require("../routes/detalle_requisicion") //Revisar
const directores = require("../routes/directores.js")
const items = require("../routes/items.js")
const jefesUnidad = require("../routes/jefes_unidad.js")
const linea_proveedor = require("../routes/linea_proveedor") //Revisar
const lineasSuministro = require("../routes/linea_suministro.js")
const orden_compra = require("../routes/orden_compra")
const orden_respuesta = require("../routes/orden_respuesta") //Revisar
const proveedor_cotizacion = require("../routes/proveedor_cotizacion") //Revisar
const proveedor_orden = require("../routes/proveedor_orden") //Revisar
const proveedores = require("../routes/proveedores.js")
const requicision_cotizacion = require("../routes/requisicion_cotizacion") //Revisar
const requicision_dependencia = require("../routes/requisicion_dependencia") //Revisar
const requisiciones = require("../routes/requisiciones.js")
const respuestas = require("../routes/respuestas.js")
const trabajadores = require ("../routes/trabajadores.js")
const precio_total = require ("../routes/precio_total.js")
const respuesta_cotizacion = require ("../routes/respuestacotizacion")
const subtotal = require ("../routes/subtotal")
const detalleCompraRespuesta = require ("../routes/detalleCompraRespuesta")

//guardar credenciales de la bd
// const pool = require('./db')
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

//puerto donde va a correr el back (si esta en produccion correra en port y si no correra en localhost5000)
const normalizePort = port => parseInt(port, 10) //no estaba
const PORT = normalizePort(process.env.PORT || 5000) //no estaba
const app = express()
const dev = app.get('env') !== 'production' //no estaba

//middleware
app.use(cors());
app.use (express.json()); //req.body

if (!dev) { //no estaba
    app.use(compression()) //no estaba
    app.use(morgan('common')) //no estaba
    app.use(express.static(path.resolve(__dirname, 'dist'))) //no estaba
} else { //no estaba
    app.use(morgan('dev')) //no estaba
}


//Uso de los endpoints
app.use(cotizaciones)
app.use(dependencias)
app.use(detalle_compra)
app.use(detalle_requisicion)
app.use(directores)
app.use(items)
app.use(jefesUnidad)
app.use(linea_proveedor)
app.use(lineasSuministro)
app.use(orden_compra)
app.use(orden_respuesta)
app.use(proveedor_cotizacion)
app.use(proveedor_orden)
app.use(proveedores)
app.use(requicision_cotizacion)
app.use(requicision_dependencia)
app.use(requisiciones)
app.use(respuestas)
app.use(trabajadores)
app.use(precio_total)
app.use(respuesta_cotizacion)
app.use(subtotal)
app.use(detalleCompraRespuesta)

const server = createServer(app)

server.listen(PORT, err => {
    if (err) throw err
    console.log('Servidor iniciado en localhost:', PORT)
})

// app.listen(5000, () =>{
//     console.log ("Server has started on port 5000")
// });