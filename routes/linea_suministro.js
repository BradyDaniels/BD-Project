const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//id int, descripcion varchar

//Create Linea de Suministro

router.post("/lineas_suministro", async(req, res)=> {
    try {
       const { id, descripcion } = req.body;
       const newLineaSuministro = await pool.query(
           "INSERT INTO linea_suministro (id, descripcion) VALUES($1, $2) RETURNING *",
           [id, descripcion]
        );
    res.json(newLineaSuministro.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Lineas de Suministro

router.get ("/lineas_suministro", async (req, res) =>{
    try {
        const allLineasSuministro = await pool.query(
            "SELECT * FROM linea_suministro"
        );
    res.json(allLineasSuministro.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Lineas de Suministro

router.get("/lineas_suministro/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const LineaSuministro = await pool.query(
            "SELECT * FROM linea_suministro WHERE id = $1",
            [id]
        );
    res.json(LineaSuministro.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Linea de Suministro

router.put("/lineas_suministro/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { id_Linea, descripcion } = req.body;
        const updateLineaSuministro = await pool.query(
            "UPDATE linea_suministro SET descripcion =$1 WHERE id = $2",
            [ descripcion, id]
        );
    res.json ("Linea de Suministro was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Linea de Suministro

router.delete ("/lineas_suministro/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteLineaSuministro = await pool.query(
            "DELETE FROM linea_suministro WHERE id = $1",
            [id]
        );
    res.json("Linea de Suministro was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router