const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");


//Create Director

router.post("/directores", async(req, res)=> {
    try {
       const { cedula } = req.body;
       
       const newDirector = await pool.query(
           "INSERT INTO director (cedula) VALUES($1) RETURNING *",
           [cedula]
        );

    res.json(newDirector.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Directores

router.get ("/directores", async (req, res) =>{
    try {
        const allDirectores = await pool.query(
            "SELECT * FROM trabajador WHERE tipo = 'D'"
        );
    res.json(allDirectores.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Director

router.get("/directores/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const director = await pool.query(
            "SELECT * FROM director WHERE cedula = $1",
            [id]
        );
    res.json(director.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Director no creo que se use 

router.put("/directores/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { cedula } = req.body;
        const updateDirector = await pool.query(
            "UPDATE director SET cedula = $1 WHERE  id = $2",
            [cedula, id]
        );
    res.json ("Director was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Director

router.delete ("/directores/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteDirector = await pool.query(
            "DELETE FROM director WHERE cedula = $1",
            [id]
        );
    res.json("Director was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router