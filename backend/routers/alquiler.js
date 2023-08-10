import { Router, json } from "express";
import { confiGET } from "../middleware/limit.js";
import db from "../connection/mongo.js";
import { ObjectId } from "mongodb";

const alquiler = Router();
// const tamaño = express.json({ limit: '100KB' })

//? CHECK
alquiler.get("/alquiler", confiGET(), async (req, res) => {
    let collection = await db.collection("alquiler");
    let results = await collection.find({})
    .limit(50)
    .toArray();
    
    console.log(req.rateLimit);
    res.send(results).status(200)
});

//? CHECK
//Obtener el costo total de un alquiler específico.
alquiler.get("/alquiler/search/:id", confiGET(), async (req, res) => {
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

//? CHECK
//Listar todos los alquileres activos junto con los datos de los clientes relacionados.
alquiler.get("/alquiler/status:active", confiGET(), async (req, res) => {
    let collection = await db.collection("alquiler");
    let results = await collection.aggregate([
        {
          $lookup: {
            from: "registro_entrega",
            localField: "ID_Alquiler",
            foreignField: "ID_Alquiler",
            as: "registro_entrega",
          },
        },
        {
          $unwind: "$registro_entrega",
        },
        {
          $lookup: {
            from: "automovil",
            localField: "ID_Automovil",
            foreignField: "ID_Automovil",
            as: "automovil",
          },
        },
        {
          $unwind: "$automovil",
        },
        {
          $lookup: {
            from: "cliente",
            localField: "ID_Cliente",
            foreignField: "ID_Cliente",
            as: "cliente",
          },
        },
        {
          $unwind: "$cliente",
        },
        {
          $lookup: {
            from: "empleado",
            localField: "registro_entrega.ID_Empleado",
            foreignField: "ID_Empleado",
            as: "empleado",
          },
        },
        {
          $unwind: "$empleado",
        },
        {
          $match: {
            Estado: "Activo",
          },
        },
        {
          $group: {
            _id: "$ID_Alquiler",
            ID_Cliente: { $first: "$ID_Cliente" },
            ID_Automovil: { $first: "$ID_Automovil" },
            Fecha_Inicio: { $first: "$Fecha_Inicio" },
            Fecha_Fin: { $first: "$Fecha_Fin" },
            Teléfono: { $first: "$Teléfono" },
            Estado: { $first: "$Estado" },
            registro_entrega: { $addToSet: "$registro_entrega" },
            automovil: { $addToSet: "$automovil" },
            cliente: { $addToSet: "$cliente" },
            empleado: { $addToSet: "$empleado" },
          },
        },
        {
          $project: {
            ID_Cliente: 1,
            ID_Automovil: 1,
            Fecha_Inicio: 1,
            Fecha_Fin: 1,
            Teléfono: 1,
            Estado: 1,
            registro_entrega: {
              _id: 1,
              ID_Alquiler: 1,
              Fecha_Entregado: 1,
              Combustible_Entregado: 1,
              Kilometraje_Entregado: 1,
            },
            automovil: 1,
            cliente: 1,
            empleado: {
              _id: 1,
              ID_Empleado: 1,
              Nombre: 1,
              Apellido: 1,
              Telefono: 1,
              Cargo: 1,
            },
          },
        },
        {
          $sort: {
            ID_Alquiler: 1,
          },
        },
    ]).toArray();
    
    console.log(req.rateLimit);
    res.send(results).status(200)

});

//Para realizar la siguiente de alquiler
// es necesario tener en cuenta la colección de 
// registro de entrega


export default alquiler;