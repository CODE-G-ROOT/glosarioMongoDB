import { Router, json } from "express";
import { confiGET } from "../middleware/limit.js";
import db from "../connection/mongo.js";

const appCampus = Router();
// const tamaño = express.json({ limit: '100KB' })

appCampus.get("/", confiGET(), async (req, res) => {
    let collection = await db.collection("alquiler");
    let results = await collection.find({})
    .limit(50)
    .toArray();

    console.log(req.rateLimit);
    console.log(results);
    
    res.send(results).status(200)
});

export default appCampus;