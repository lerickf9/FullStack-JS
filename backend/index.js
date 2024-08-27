import express from "express";
import dotenv from "dotenv"
import conectarDB from "./config/db.js";

import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js"

const app = express();//Creamos el servidor
app.use(express.json()); //Envia datos al servidor de tipo json


dotenv.config(); //busca las variables de entorno

conectarDB();

//aqui esta el localhost
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000; //Esto servira cuando se haga el deployment... sino el puerto sera 4000

//Registramos o reportamos el puerto 4000
app.listen(4000, () => {
    console.log(`Servidor funcionando en el puerto ${PORT} para backend`);
})