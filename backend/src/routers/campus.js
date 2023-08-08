import { Router, json } from "express";
import { confiGET } from "../middleware/limit.js";

const appCampus = Router();

// const tamaño = express.json({ limit: '100KB' })

appCampus.get("/", confiGET(), (req, res) => {
    console.log(req.rateLimit);
});

appCampus.post("/campus", confiGET(), (req, res, err) => {
    if(!req.rateLimit) return;
    res.send("Hola");
    console.log(req.rateLimit);
});

export default appCampus;