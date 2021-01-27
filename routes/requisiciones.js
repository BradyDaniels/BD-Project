const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");


//Create Requisicion

router.post("/requisiciones", async(req, res)=> {
    try {
       const { id, id_dependencia, id_linea, fecha_emision, cedula_trabajador, cedula_director, cedula_jefeunidad } = req.body;
       
       const newRequisicion = await pool.query(
           "INSERT INTO requisicion (id, id_dependencia, id_linea, fecha_emision, cedula_trabajador, cedula_director, cedula_jefeunidad) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
           [id, id_dependencia, id_linea, fecha_emision, cedula_trabajador, cedula_director, cedula_jefeunidad]
        );

    res.json(newRequisicion.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Requisiciones

router.get ("/requisiciones", async (req, res) =>{
    try {
        const allRequisiciones = await pool.query(
            "SELECT * FROM requisicion"
        );
    res.json(allRequisiciones.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a requisicione

router.get("/requisiciones/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const requisicion = await pool.query(
            "SELECT * FROM requisicion WHERE id = $1",
            [id]
        );
    res.json(requisicion.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Eequisiciones 

router.put("/requisiciones/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { id_requisiciones, id_dependencia, id_linea, fecha_emision, cedula_trabajador, cedula_director, cedula_jefeunidad } = req.body;
        const updateRequisiciones = await pool.query(
            "UPDATE requisicion SET id = $1, id_dependencia = $2, id_linea = $3, fecha_emision = $4, cedula_trabajador = $5, cedula_director = $6, cedula_jefeunidad = $7 WHERE  id = $8",
            [id, id_dependencia, id_linea, fecha_emision, cedula_trabajador, cedula_director, cedula_jefeunidad, id]
        );
    res.json ("Requisicion was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a requisicione

router.delete ("/requisiciones/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteRequsicion = await pool.query(
            "DELETE FROM requisicion WHERE id = $1",
            [id]
        );
    res.json("Requisicion was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router