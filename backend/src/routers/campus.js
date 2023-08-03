import { Router, json } from "express";
import { confiGET } from "../middleware/limit.js";
import express from "express";

const appCampus = Router();

const tamaño = express.json({limit : "100B"})

appCampus.get("/", confiGET(), (req,res)=>{
    console.log(req.rateLimit);
    res.send("Hola");
});

appCampus.post("/campus", confiGET(), tamaño, (req,res)=>{
    const jsonBody = req.body;
    const json = JSON.stringify(jsonBody);
    let tamaño = Buffer.byteLength(json, 'utf8');
    res.jsonBody;
    console.log('Tamaño de la solicitud: ', tamaño, ' bytes');
    res.status(200).send('Solicitud recibida correctamente');
});

export default appCampus;