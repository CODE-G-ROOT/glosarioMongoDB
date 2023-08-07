import { Router, json } from "express";
import { confiGET } from "../middleware/limit.js";

const appCampus = Router();

// const tamaño = express.json({ limit: '100KB' })

appCampus.get("/campus", confiGET(), (req, res) => {
    console.log(req.rateLimit);
    res.send("Hola");
});

appCampus.post("/campus", confiGET(), (req, res, err) => {
    if(!req.rateLimit) return;
    res.send("Hola");
    console.log(req.rateLimit);
});

export default appCampus;