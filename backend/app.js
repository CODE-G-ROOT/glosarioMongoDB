// import dotenv from 'dotenv';
// import express, { application } from 'express';
// import appCampus from './src/routers/campus.js';


// console.clear();
// dotenv.config();
// const app = express();

// // app.get("/campus", appCampus,  (req,res)=>{
// //     res.send('Hola');
// // });

// app.post("/campus", appCampus);

// const server_config = JSON.parse(process.env.SERVER_CONFIG);
// console.log(server_config);

// app.listen( server_config, ()=>{
//     console.log(
//         `http://${server_config.hostname}:${server_config.port}/campus`
//     )
// })

import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
console.clear();

//TODO              CONNECTION
dotenv.config();

let uri = JSON.parse(JSON.stringify(process.env));
const client = new MongoClient(uri.URL_CONNECT);
// console.log(client);
// const dbname = uri.ATLAS_DB;

const connectDB = async () => {
    try {
        await client.connect();
        // console.log(client);
    } catch (err) {
        console.error(err);
    }
};

const main = async () =>{
    try {
        await connectDB();
        const list = await client.db().admin().listDatabases();
        list.databases.forEach(db => console.log(` - ${db.name}`));
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
};

main();