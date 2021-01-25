const express = require ("express");
const app = express();
const cors = require("cors");
//const pool = require("./db");

//Import de los endpoints
const pruebas = require ("../routes/pruebas.js")

//middleware
app.use(cors());
app.use (express.json()); //req.body

//ROUTES//

// //Create Prueba

// app.post("/pruebas", async(req, res)=> {
//     try {
//        const { description } = req.body;
//        const newPrueba = await pool.query(
//            "INSERT INTO prueba (description) VALUES($1) RETURNING *",
//            [description]
//         );

//     res.json(newPrueba.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// });

// //Get all Pruebas

// app.get ("/pruebas", async (req, res) =>{
//     try {
//         const allPruebas = await pool.query(
//             "SELECT * FROM prueba"
//         );
//     res.json(allPruebas.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// //Get a Prueba

// app.get("/pruebas/:id", async(req, res) =>{
//     try {
//         const { id } = req.params;
//         const prueba = await pool.query(
//             "SELECT * FROM prueba WHERE prueba_id = $1",
//             [id]
//         );
//     res.json(prueba.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// //Update a Prueba

// app.put("/pruebas/:id", async(req,res) =>{
//     try {
//         const { id } = req.params;
//         const { description } = req.body;
//         const updatePrueba = await pool.query(
//             "UPDATE prueba SET description = $1 WHERE  prueba_id = $2",
//             [description, id]
//         );
//     res.json ("Prueba was updated");
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// //Delete a Prueba

// app.delete ("/pruebas/:id", async (req,res) =>{
//     try {
//         const { id } = req.params;
//         const deletePrueba = await pool.query(
//             "DELETE FROM prueba WHERE prueba_id = $1",
//             [id]
//         );
//     res.json("Prueba was deleted");
//     } catch (err) {
//         console.error(err.message)
//     }
// })

app.use(pruebas)

app.listen(5000, () =>{
    console.log ("Server has started on port 5000")
});