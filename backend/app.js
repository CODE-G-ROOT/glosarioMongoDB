import dotenv from 'dotenv';
import express, { application } from 'express';
<<<<<<< HEAD
import alquiler from './routers/alquiler.js';
=======
import appCampus from './src/routers/campus.js';
>>>>>>> da33a06 (feat: :construction: Endpoints)

console.clear();
dotenv.config();

const app = express();

<<<<<<< HEAD
//Alquiler
app.get("/alquiler", alquiler);




// app.post("/campus", appCampus);

const server_config = JSON.parse(process.env.SERVER_CONFIG);
=======
//URL FROM THE MONGO CONNECTION
let uri = JSON.parse(JSON.stringify(process.env));

app.get("/", appCampus, run())

// app.post("/campus", appCampus);


const server_config = JSON.parse(process.env.SERVER_CONFIG);

>>>>>>> da33a06 (feat: :construction: Endpoints)
app.listen( server_config, ()=>{
    console.log(
        `http://${server_config.hostname}:${server_config.port}/`
    )
<<<<<<< HEAD
})
=======
})



>>>>>>> da33a06 (feat: :construction: Endpoints)
