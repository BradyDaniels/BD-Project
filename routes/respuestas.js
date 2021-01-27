const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

// id, precio_total, formato_pago, tipo_moneda, rif, id_cotizacion


//Create Respuesta

router.post("/respuestas", async(req, res)=> {
    try {
       
       const { id, precio_total, formato_pago, tipo_moneda, rif, id_cotizacion } = req.body;
       const newRespuesta = await pool.query(
           "INSERT INTO respuesta (id, precio_total, formato_pago, tipo_moneda, rif, id_cotizacion) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
           [ id, precio_total, formato_pago, tipo_moneda, rif, id_cotizacion ]
        );
        
    res.json(newRespuesta.rows[0]);
    } catch (err) {
        console.error(err.message);
        
    }
});

//Get all Respuestas

router.get ("/respuestas", async (req, res) =>{
    try {
        const allRespuestas = await pool.query(
            "SELECT * FROM respuesta"
        );
    res.json(allRespuestas.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a Respuesta

router.get("/respuestas/:id", async(req, res) =>{
    try {
        const { id } = (req.params);
        const respuesta = await pool.query(
                "SELECT * FROM respuesta WHERE id = $1",
                [id]
            );
    res.json(respuesta.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a Respuesta

router.put("/respuestas/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { id_respuesta, precio_total, formato_pago, tipo_moneda, rif, id_cotizacion } = req.body;
        const updateRespuesta = await pool.query(
            "UPDATE respuesta SET id = $1, precio_total = $2, formato_pago = $3, tipo_moneda = $4, rif = $5, id_cotizacion = $6 WHERE id = $7",
            [ id, precio_total, formato_pago, tipo_moneda, rif, id_cotizacion, id ]
        );
    res.json ("Respuesta was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a Dependencia

router.delete ("/respuestas/:id", async (req,res) =>{
    try {
        const { id } = req.params;
        const deleteRespuesta = await pool.query(
            "DELETE FROM respuesta WHERE id = $1",
            [id]
        );
    res.json("Respuesta was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router