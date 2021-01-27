const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");


//Create Jefe Unidad

router.post("/jefes_unidad", async(req, res)=> {
    try {
       const { cedula } = req.body;
       
       const newJefeUnidad = await pool.query(
           "INSERT INTO jefe_unidad (cedula) VALUES($1) RETURNING *",
           [cedula]
        );

    res.json(newJefeUnidad .rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Jefe Unidad

router.get ("/jefes_unidad", async (req, res) =>{
    try {
        const allJefesUnidad  = await pool.query(
            "SELECT * FROM jefe_unidad"
        );
    res.json(allJefesUnidad .rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Jefe Unidad

router.get("/jefes_unidad/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const JefeUnidad  = await pool.query(
            "SELECT * FROM jefe_unidad WHERE cedula = $1",
            [id]
        );
    res.json(JefeUnidad .rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Jefe Unidad no creo que se use 

router.put("/jefes_unidad/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { cedula } = req.body;
        const updateJefeUnidad  = await pool.query(
            "UPDATE jefe_unidad SET cedula = $1 WHERE  id = $2",
            [cedula, id]
        );
    res.json ("Jefe de Unidad was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Jefe Unidad

router.delete ("/jefes_unidad/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteJefeUnidad  = await pool.query(
            "DELETE FROM jefe_unidad WHERE cedula = $1",
            [id]
        );
    res.json("jefe de Unidad was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router