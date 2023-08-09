import { Router, json } from "express";
import { confiGET } from "../middleware/limit.js";
import db from "../connection/mongo.js";
import { ObjectId } from "mongodb";

const alquiler = Router();
// const tamaño = express.json({ limit: '100KB' })

//? CHECK
alquiler.get("/all", confiGET(), async (req, res) => {
    let collection = await db.collection("alquiler");
    let results = await collection.find({})
    .limit(50)
    .toArray();
    
    console.log(req.rateLimit);
    res.send(results).status(200)
});

//TODO IN PROCCESS
alquiler.get("/all/:id", confiGET(), async (req, res) => {

    let collection = await db.collection("alquiler");
    let query = {
        _id : new ObjectId(req.params.id)
    }
    let results = await collection.find(query)
    .limit(50)
    .toArray();
    
    if(!results) res.send(results).status(200)
    else res.send(results).status(200);
});

export default alquiler;