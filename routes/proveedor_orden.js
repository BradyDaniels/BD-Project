const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//rif, id_orden

//Create Proveedor orden

router.post("/proveedor_orden", async(req, res)=> {
    try {
       const { rif, id_orden } = req.body;
       const newProveedorOrden = await pool.query(
           "INSERT INTO proveedor_orden ( rif, id_orden ) VALUES($1, $2) RETURNING *",
           [ rif, id_orden ]
        );
    res.json(newProveedorOrden.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Proveedor orden

router.get ("/proveedor_orden", async (req, res) =>{
    try {
        const allProveedorOrden = await pool.query(
            "SELECT * FROM proveedor_orden"
        );
    res.json(allProveedorOrden.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Proveedor orden 

router.get("/proveedor_orden/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const Proveedororden = await pool.query(
            "SELECT * FROM proveedor_orden WHERE id_orden = $1", //Revisar como hacer el get
            [id]
        );
    res.json(Proveedororden.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Proveedor orden Revisar

router.put("/proveedor_orden/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { rif, id_orden } = req.body;
        const updateProveedororden = await pool.query(
            "UPDATE proveedor_orden SET rif = $1, id_orden = $2 WHERE id_orden = $3",
            [ rif, id_orden, id]
        );
    res.json ("Proveedor orden was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Proveedor orden Revisar

router.delete ("/proveedor_orden/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteProveedororden = await pool.query(
            "DELETE FROM proveedor_orden WHERE id_orden = $1",
            [id]
        );
    res.json("Proveedor orden was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router