const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//cedula, id_dependencia, nombre,tipo

//Create Trabajador

router.post("/trabajadores", async(req, res)=> {
    try {
       const { cedula,id_dependencia,nombre,tipo } = req.body;
       const newTrabajador = await pool.query(
           "INSERT INTO trabajador (cedula, id_dependencia, nombre, tipo) VALUES($1, $2, $3, $4) RETURNING *",
           [cedula, id_dependencia, nombre, tipo]
        );

    res.json(newTrabajador.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Trabajadores

router.get ("/trabajadores", async (req, res) =>{
    try {
        const allTrabajadores = await pool.query(
            "SELECT * FROM trabajador"
        );
    res.json(allTrabajadores.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Trabajadores

router.get("/trabajadores/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const trabajador = await pool.query(
            "SELECT * FROM trabajador WHERE cedula = $1",
            [id]
        );
    res.json(trabajador.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Trabajador

router.put("/trabajadores/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { id_dependencia, nombre, tipo } = req.body;
        const updateTrabajador = await pool.query(
            "UPDATE trabajador SET id_dependencia = $1, nombre =$2, tipo=$3 WHERE  cedula = $4",
            [id_dependencia, nombre, tipo, id]
        );
    res.json ("Trabajador was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Trabajador

router.delete ("/trabajadores/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteTrabajador = await pool.query(
            "DELETE FROM trabajador WHERE cedula = $1",
            [id]
        );
    res.json("Trabajador was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router