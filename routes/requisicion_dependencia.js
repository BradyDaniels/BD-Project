const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//id_requisicion, id_dependencia

//Create Requiscion Dependencia

router.post("/requisicion_dependencia", async(req, res)=> {
    try {
       const {  id_requisicion, id_dependencia } = req.body;
       const newRequisicionDependencia = await pool.query(
           "INSERT INTO requisicion_dependencia (  id_requisicion, id_dependencia ) VALUES($1, $2) RETURNING *",
           [  id_requisicion, id_dependencia ]
        );
    res.json(newRequisicionDependencia.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Requisicion Dependencia

router.get ("/requisicion_dependencia", async (req, res) =>{
    try {
        const allRequisicionDependencia = await pool.query(
            "SELECT * FROM requisicion_dependencia"
        );
    res.json(allRequisicionDependencia.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Requisicion Dependencia Revisar

router.get("/requisicion_dependencia/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const RequisicionDependencia = await pool.query(
            "SELECT * FROM requisicion_dependencia WHERE id_requisicion = $1", //Revisar como hacer el get
            [id]
        );
    res.json(RequisicionDependencia.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Requisicion Cotizacion Revisar No creo que se use

router.put("/requisicion_dependencia/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const {  id_requisicion, id_dependencia } = req.body;
        const updateRequisicionDependencia = await pool.query(
            "UPDATE requisicion_dependencia SET id_requisicion = $1, id_dependencia = $2 WHERE id_requisicion = $3",
            [  id_requisicion, id_dependencia, id]
        );
    res.json ("Requisicion Dependencia was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Requisicion Cotizacion Revisar

router.delete ("/requisicion_dependencia/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteRequisicionDependencia = await pool.query(
            "DELETE FROM requisicion_dependencia WHERE id_requisicion = $1", //Revisar
            [id]
        );
    res.json("Requisicion Dependencia was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router