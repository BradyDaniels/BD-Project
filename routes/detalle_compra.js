const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

// id, cantidad, precio_compra, id_detalle_req, id_requisicion, id_item, id_respuesta, rif, id_cotizacion, id_orden


//Create Detalle Compra

router.post("/detalle_compra", async(req, res)=> {
    try {
       const { id, cantidad, precio_compra, id_detalle_req, id_requisicion, id_item, id_respuesta, rif, id_cotizacion, id_orden } = req.body;
       const newDetalleCompra = await pool.query(
           "INSERT INTO detalle_compra ( id, cantidad, precio_compra, id_detalle_req, id_requisicion, id_item, id_respuesta, rif, id_cotizacion, id_orden ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
           [ id, cantidad, precio_compra, id_detalle_req, id_requisicion, id_item, id_respuesta, rif, id_cotizacion, id_orden ]
        );
    
    console.log('ROUTES: ',req.body)   
    res.json(newDetalleCompra.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Detalles de Compra

router.get ("/detalle_compra", async (req, res) =>{
    try {
        const allDetallesCompra = await pool.query(
            "SELECT * FROM detalle_compra"
        );
    res.json(allDetallesCompra.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a detalle_requisicion Revisar como se hace el get por que el pk es un desastre

router.get("/detalle_compra/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const item = await pool.query(
            "SELECT * FROM detalle_compra WHERE id = $1",
            [id]
        );
    res.json(item.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a detalle_requisicion revisar

router.put("/detalle_compra/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const {cantidad, precio_compra, id_detalle_req, id_requisicion, id_item, id_respuesta, rif, id_cotizacion, id_orden} = req.body;
        const updateDetalleCompra = await pool.query(
            "UPDATE detalle_compra SET id = $1, cantidad= $2, precio_compra = $3, id_detalle_req = $4, id_requisicion = $5, id_item = $6, id_respuesta = $7, rif = $8, id_cotizacion = $9, id_orden = $10 WHERE id = $11",// revisar el where
            [ id, cantidad, precio_compra, id_detalle_req, id_requisicion, id_item, id_respuesta, rif, id_cotizacion, id_orden, id ]
        );
    res.json ("Detalle Compra was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Detalle Requisicion Revisar

router.delete ("/detalle_compra/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteDetalleCompra = await pool.query(
            "DELETE FROM detalle_compra WHERE id = $1", //Revisar
            [id]
        );
    res.json("Detalle Compra was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router