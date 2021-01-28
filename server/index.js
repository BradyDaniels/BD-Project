const express = require ("express");
const app = express();
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
const proveedor_cotizacion = require("../routes/proveedor_cotizacion") //Revisar
const proveedor_orden = require("../routes/proveedor_orden") //Revisar
const proveedores = require("../routes/proveedores.js")
const requicision_cotizacion = require("../routes/requisicion_cotizacion") //Revisar
const requicision_dependencia = require("../routes/requisicion_dependencia") //Revisar
const requisiciones = require("../routes/requisiciones.js")
const respuestas = require("../routes/respuestas.js")
const trabajadores = require ("../routes/trabajadores.js")

//middleware
app.use(cors());
app.use (express.json()); //req.body

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
app.use(proveedor_cotizacion)
app.use(proveedor_orden)
app.use(proveedores)
app.use(requicision_cotizacion)
app.use(requicision_dependencia)
app.use(requisiciones)
app.use(respuestas)
app.use(trabajadores)

app.listen(5000, () =>{
    console.log ("Server has started on port 5000")
});