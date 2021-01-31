const express = require ("../server/node_modules/express");
const { builtinModules } = require("module");
const router = express.Router()
const pool = require("../server/db");

//id_respuesta, id_orden


//Create orden_respuesta

router.post("/orden_respuesta", async(req, res)=> {
    try {
       const { id_linea, rif } = req.body;
       const newOrdenRespuesta = await pool.query(
           "INSERT INTO orden_respuesta (id_respuesta, id_orden) VALUES($1, $2) RETURNING *",
           [ id_linea, rif ]
        );

    res.json(newOrdenRespuesta.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//Get all orden_respuesta

router.get ("/orden_respuesta", async (req, res) =>{
    try {
        const allORdenRespuesta = await pool.query(
            "SELECT * FROM orden_respuesta"
        );
    res.json(allORdenRespuesta.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Get a orden_respuesta //Revisar por que no se si se busca por linea o por rif

router.get("/orden_respuesta/:id", async(req, res) =>{
    try {
        const { id } = req.params;
        const ordenRespuesta = await pool.query(
            "SELECT * FROM orden_respuesta WHERE id_orden = $1",
            [id]
        );
    res.json(ordenRespuesta.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//Update a orden_respuesta No creo que se use pero igual revisar  

router.put("/orden_respuesta/:id", async(req,res) =>{
    try {
        const { id } = req.params;
        const { id_orden, id_respuesta } = req.body;
        const updateordenRespuesta = await pool.query(
            "UPDATE orden_respuesta SET id_orden = $1, id_respuesta = $2 WHERE id_orden = $3",
            [ id, id_respuesta, id ]
        );
    res.json ("Orden Restpuesta was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//Delete a orden_respuesta //Hay que ver esto bien por que tendria que ser compuesto id y rif

router.delete ("/orden_respuesta/:id/:id2", async (req,res) =>{
    try {
        const { id,id2 } = req.params;
        const deleteordenRespuesta = await pool.query(
            "DELETE FROM orden_respuesta WHERE id_orden = $1 AND id_respuesta =$2",
            [id,id2]
        );
    res.json("Orden Respuesta was deleted");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router