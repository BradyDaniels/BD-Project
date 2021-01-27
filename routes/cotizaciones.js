const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//id , id_linea, fecha_emision


//Create Cotizacion

router.post("/cotizaciones", async(req, res)=> {
    try {
       const { id, id_linea, fecha_emision } = req.body;
       const newCotizacion = await pool.query(
           "INSERT INTO cotizacion (id, id_linea, fecha_emision) VALUES($1, $2, $3) RETURNING *",
           [ id, id_linea, fecha_emision ]
        );

    res.json(newCotizacion.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Cotizaciones

router.get ("/cotizaciones", async (req, res) =>{
    try {
        const allCotizaciones = await pool.query(
            "SELECT * FROM cotizacion"
        );
    res.json(allCotizaciones.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Cotzacion

router.get("/cotizaciones/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const cotizacion = await pool.query(
            "SELECT * FROM cotizacion WHERE id = $1",
            [id]
        );
    res.json(cotizacion.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Item

router.put("/cotizaciones/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { id_cotizacion, id_linea, fecha_emision } = req.body;
        const updateCotizacion = await pool.query(
            "UPDATE cotizacion SET id = $1, id_linea = $2, fecha_emision = $3 WHERE id = $4",
            [ id, id_linea, fecha_emision, id ]
        );
    res.json ("Cotizacion was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Cotizacion

router.delete ("/cotizaciones/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteCotizacion = await pool.query(
            "DELETE FROM cotizacion WHERE id = $1",
            [id]
        );
    res.json("Cotizacion was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router