const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

// id, cantidad_solicitada, precio_estimado, id_requisicion, id_item


//Create Detalle Requisicion

router.post("/detalle_requisicion", async(req, res)=> {
    try {
       const { id, cantidad_solicitada, precio_estimado, id_requisicion, id_item } = req.body;
       const newDetalleReq = await pool.query(
           "INSERT INTO detalle_requisicion ( id, cantidad_solicitada, precio_estimado, id_requisicion, id_item ) VALUES($1, $2, $3, $4, $5) RETURNING *",
           [ id, cantidad_solicitada, precio_estimado, id_requisicion, id_item ]
        );

    res.json(newDetalleReq.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all Items

router.get ("/detalle_requisicion", async (req, res) =>{
    try {
        const allItems = await pool.query(
            "SELECT * FROM detalle_requisicion"
        );
    res.json(allItems.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a detalle_requisicion

router.get("/detalle_requisicion/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const item = await pool.query(
            "SELECT * FROM detalle_requisicion WHERE id_requisicion = $1",
            [id]
        );
    res.json(item.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a detalle_requisicion revisar

router.put("/detalle_requisicion/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { id_detalleReq, cantidad_solicitada, precio_estimado, id_requisicion, id_item } = req.body;
        const updateDetalleReq = await pool.query(
            "UPDATE detalle_requisicion SET id = $1, cantidad_solicitada = $2, precio_estimado = $3, id_requisicion = $4, id_item = $5 WHERE id = $6",// revisar el where
            [ id, cantidad_solicitada, precio_estimado, id_requisicion, id_item, id ]
        );
    res.json ("Detalle Reqsuicision was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Detalle Requisicion Revisar

router.delete ("/detalle_requisicion/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteDetalleReq = await pool.query(
            "DELETE FROM detalle_requisicion WHERE id = $1", //Revisar
            [id]
        );
    res.json("Detalle Requisicion was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router