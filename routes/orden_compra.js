const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//id, razon_social, fecha_orden, monto_total, fecha_emision, formato_pago, tipo_moneda, cedula_director

//Create Orden de Compra

router.post("/orden_compra", async(req, res)=> {
    try {
       const { id, razon_social, fecha_orden, monto_total, fecha_emision, formato_pago, tipo_moneda, cedula_director  } = req.body;
       const newOrdenCompra = await pool.query(
           "INSERT INTO orden_compra (id, razon_social, fecha_orden, monto_total, fecha_emision, formato_pago, tipo_moneda, cedula_director) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
           [ id, razon_social, fecha_orden, monto_total, fecha_emision, formato_pago, tipo_moneda, cedula_director ]
        );

    res.json(newOrdenCompra.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Ordenes de Compra

router.get ("/orden_compra", async (req, res) =>{
    try {
        const allOrdenesCompra = await pool.query(
            "SELECT * FROM orden_compra"
        );
    res.json(allOrdenesCompra.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Orden de Compra

router.get("/orden_compra/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const OrdenCompra = await pool.query(
            "SELECT * FROM orden_compra WHERE id = $1",
            [id]
        );
    res.json(OrdenCompra.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Orden de Compra

router.put("/orden_compra/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { id_orden, razon_social, fecha_orden, monto_total, fecha_emision, formato_pago, tipo_moneda, cedula_director } = req.body;
        const updateOrdenCompra = await pool.query(
            "UPDATE orden_compra SET id = $1, razon_social = $2, fecha_orden = $3, monto_total = $4, fecha_emision = $5, formato_pago =$6, tipo_moneda =$7, cedula_director = $8 WHERE  id = $9",
            [ id, razon_social, fecha_orden, monto_total, fecha_emision, formato_pago, tipo_moneda, cedula_director, id  ]
        );
    res.json ("ORden de Compra was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Orden de Compra

router.delete ("/orden_compra/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteOrdenCompra = await pool.query(
            "DELETE FROM orden_compra WHERE id = $1",
            [id]
        );
    res.json("Orden de Compra was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router