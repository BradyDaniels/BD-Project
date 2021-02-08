const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//id_requisicion, id_cotizacion

//Create Requiscion Cotizacion

router.post("/requisicion_cotizacion", async(req, res)=> {
    try {
       const {  id_requisicion, id_cotizacion } = req.body;
       const newRequisicionCotizacion = await pool.query(
           "INSERT INTO requisicion_cotizacion (  id_requisicion, id_cotizacion ) VALUES($1, $2) RETURNING *",
           [  id_requisicion, id_cotizacion ]
        );
    res.json(newRequisicionCotizacion.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Requisicion Cotizacon

router.get ("/requisicion_cotizacion", async (req, res) =>{
    try {
        const allRequisicionCotizacion = await pool.query(
            "SELECT * FROM requisicion_cotizacion"
        );
    res.json(allRequisicionCotizacion.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Requisicion Cotizacion Revisar

router.get("/requisicion_cotizacion/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const RequisicionCotizacion = await pool.query(
            "SELECT * FROM requisicion_cotizacion WHERE id_requisicion = $1", //Revisar como hacer el get
            [id]
        );
    res.json(RequisicionCotizacion.rows);
    } catch (err) {
        console.error(err.message);
    }
})

router.get("/requisicion_cotizacion_c/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const RequisicionCotizacion = await pool.query(
            "SELECT id_requisicion FROM requisicion_cotizacion WHERE id_cotizacion = $1", //Revisar como hacer el get
            [id]
        );
    res.json(RequisicionCotizacion.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Requisicion Cotizacion Revisar No creo que se use

router.put("/requisicion_cotizacion/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const {  id_requisicion, id_cotizacion } = req.body;
        const updateRequisicionCotizacion = await pool.query(
            "UPDATE requisicion_cotizacion SET id_requisicion = $1, id_cotizacion = $2 WHERE id_requisicion = $3",
            [  id_requisicion, id_cotizacion, id]
        );
    res.json ("Requisicion Cotizacion was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Requisicion Cotizacion Revisar

router.delete ("/requisicion_cotizacion/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteRequisicionCotizacion = await pool.query(
            "DELETE FROM requisicion_cotizacion WHERE id_requisicion = $1", //Revisar
            [id]
        );
    res.json("Requisicion Cotizacion was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router