const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//rif, id_cotizacion

//Create Proveedor Cotizacion

router.post("/proveedor_cotizacion", async(req, res)=> {
    try {
       const { rif, id_cotizacion } = req.body;
       const newProveedorCotizacion = await pool.query(
           "INSERT INTO proveedor_cotizacion ( rif, id_cotizacion ) VALUES($1, $2) RETURNING *",
           [ rif, id_cotizacion ]
        );
    res.json(newProveedorCotizacion.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Proveedor Cotizacion

router.get ("/proveedor_cotizacion", async (req, res) =>{
    try {
        const allProveedorCotizacion = await pool.query(
            "SELECT * FROM proveedor_cotizacion"
        );
    res.json(allProveedorCotizacion.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Proveedor Cotizacion 

router.get("/proveedor_cotizacion/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const ProveedorCotizacion = await pool.query(
            "SELECT * FROM proveedor_cotizacion WHERE id_cotizacion = $1", //Revisar como hacer el get
            [id]
        );
    res.json(ProveedorCotizacion.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Proveedor Cotizacion Revisar

router.put("/proveedor_cotizacion/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { rif, id_cotizacion } = req.body;
        const updateProveedorCotizacion = await pool.query(
            "UPDATE proveedor_cotizacion SET rif = $1, id_cotizacion = $2 WHERE id_cotizacion = $3",
            [ rif, id_cotizacion, id]
        );
    res.json ("Proveedor Cotizacion was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Proveedor Cotizacion Revisar

router.delete ("/proveedor_cotizacion/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteProveedorCotizacion = await pool.query(
            "DELETE FROM proveedor_cotizacion WHERE id_cotizacion = $1",
            [id]
        );
    res.json("Proveedor Cotizacion was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router