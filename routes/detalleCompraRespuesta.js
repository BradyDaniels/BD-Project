const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

router.get("/detallecomprarespuesta/:id_respuesta", async(req, res) =>{
    try {
        const { id_respuesta } = req.params;
        const item = await pool.query(
            "SELECT * FROM detalle_compra WHERE id_respuesta = $1",
            [id_respuesta]
        );
    res.json(item.rows);
    } catch (err) {
        console.error(err.message);
    }
})


module.exports = router