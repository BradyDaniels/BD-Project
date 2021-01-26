const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");


//Create Prueba

router.post("/pruebas", async(req, res)=> {
    try {
       const { description } = req.body;
       
       const newPrueba = await pool.query(
           "INSERT INTO prueba (description) VALUES($1) RETURNING *",
           [description]
        );

    res.json(newPrueba.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Pruebas

router.get ("/pruebas", async (req, res) =>{
    try {
        const allPruebas = await pool.query(
            "SELECT * FROM prueba"
        );
    res.json(allPruebas.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Prueba

router.get("/pruebas/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const prueba = await pool.query(
            "SELECT * FROM prueba WHERE prueba_id = $1",
            [id]
        );
    res.json(prueba.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Prueba

router.put("/pruebas/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatePrueba = await pool.query(
            "UPDATE prueba SET description = $1 WHERE  prueba_id = $2",
            [description, id]
        );
    res.json ("Prueba was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Prueba

router.delete ("/pruebas/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deletePrueba = await pool.query(
            "DELETE FROM prueba WHERE prueba_id = $1",
            [id]
        );
    res.json("Prueba was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router