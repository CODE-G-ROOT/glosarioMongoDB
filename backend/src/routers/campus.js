import { Router, json } from "express";
import { confiGET } from "../middleware/limit.js";
import express from "express";

const appCampus = Router();

// const tamaño = express.json({ limit: '100KB' })

appCampus.get("/", confiGET(), (req, res) => {
    console.log(req.rateLimit);
    res.send("Hola");
});

appCampus.post("/campus", confiGET(), (req, res, err) => {

    if(!req.rateLimit) return;
    res.send("Hola");
    console.log(req.rateLimit);
    // solicitud en el body
    // const jsonBody = req.body;
    // const json = JSON.stringify(jsonBody);
    // let tamaño_bytes = Buffer.byteLength(json, 'utf8');

    // // tamaño en bytes de la solicitud
    // res.jsonBody;
    // res.status(200).send('Solicitud recibida correctamente');
    // console.log('Tamaño de la solicitud: ', tamaño_bytes, ' bytes');
    
    //! ESTE ES UN EJEMPLO DE COMO SE ENVIA REALMENTE UN JSON Y EL VALOR REAL EN BYTES QUE TIENE
    // const ejemplo = `{    'nombre':'Juan',    'edad':30,    'email':'juan@example.com',    'telefono':'12345678900000'}`
    // console.log(
    //     `${ejemplo}: ${ejemplo.length} characters, ` +
    //     `${Buffer.byteLength(ejemplo, 'utf8')} bytes`
    // );
});

export default appCampus;