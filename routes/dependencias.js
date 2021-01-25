const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

// id, nombre, centro_costo


//Create Dependencia

router.post("/dependencias", async(req, res)=> {
    try {
       const { id, nombre, centro_costo } = req.body;
       const newDependencia = await pool.query(
           "INSERT INTO dependencia (id, nombre, centro_costo) VALUES($1, $2, $3) RETURNING *",
           [id, nombre, centro_costo]
        );

    res.json(newDependencia.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Dependencias

router.get ("/dependencias", async (req, res) =>{
    try {
        const allDependencias = await pool.query(
            "SELECT * FROM dependencia"
        );
    res.json(allDependencias.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Dependencia

router.get("/dependencias/:id", async(req, res) =>{
    try {
        const { id } = (req.params);
        const dependencia = await pool.query(
                "SELECT * FROM dependencia WHERE id = $1",
                [id]
            );
            // console.log (id);
            // console.log(dependencia.rows[0]);
    res.json(dependencia.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Dependencia

router.put("/dependencias/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { nombre, centro_costo } = req.body;
        const updateDependencia = await pool.query(
            "UPDATE dependencia SET nombre = $1, centro_costo =$2 WHERE id = $3",
            [nombre, centro_costo, id]
        );
    res.json ("Dependencia was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Dependencia

router.delete ("/dependencias/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteDependencia = await pool.query(
            "DELETE FROM dependencia WHERE id = $1",
            [id]
        );
    res.json("Dependencia was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router