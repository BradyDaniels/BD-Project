const express = require ("express");
const app = express();
const cors = require("cors");
//const pool = require("./db");

//Import de los endpoints
const pruebas = require ("../routes/pruebas.js")
const trabajadores = require ("../routes/trabajadores.js")
const dependencias = require ("../routes/dependencias.js")
const lineasSuministro = require("../routes/linea_suministro.js")
const proveedores = require("../routes/proveedores.js")
const items = require("../routes/items.js")
const cotizaciones = require("../routes/cotizaciones.js")
const direcctores = require("../routes/directores.js")
const jefesUnidad = require("../routes/jefes_unidad.js")
const requisiciones = require("../routes/requisiciones.js")
const respuestas = require("../routes/respuestas.js")

//middleware
app.use(cors());
app.use (express.json()); //req.body

app.use(pruebas)
app.use(trabajadores)
app.use(dependencias)
app.use(lineasSuministro)
app.use(proveedores)
app.use(items)
app.use(cotizaciones)
app.use(direcctores)
app.use(jefesUnidad)
app.use(requisiciones)
app.use(respuestas)


app.listen(5000, () =>{
    console.log ("Server has started on port 5000")
});