import { Router, json } from "express";
import { confiGET } from "../middleware/limit.js";
import db from "../connection/mongo.js";
import { ObjectId } from "mongodb";

const alquiler = Router();
// const tamaño = express.json({ limit: '100KB' })

//? CHECK
alquiler.get("/alquiler/all", confiGET(), async (req, res) => {
    let collection = await db.collection("alquiler");
    let results = await collection.find({})
    .limit(50)
    .toArray();
    
    console.log(req.rateLimit);
    res.send(results).status(200)
});

//? CHECK
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
alquiler.get("/alquiler/automoviles", confiGET(), async(req,res)=>{
    let collection = await db.collection('alquiler');
    let results = await collection.aggregate([
        {
          $lookup: {
            from: "sucursal_automovil",
            localField: "ID_Automovil",
            foreignField: "ID_Automovil",
            as: "sucursal_automovil"
          }
        },
        {
          $unwind: "$sucursal_automovil",
        },
        {
          $lookup: {
            from: "reserva",
            localField: "ID_Automovil",
            foreignField: "ID_Automovil",
            as: "reserva"
          }
        },
        {
          $unwind: "$reserva",
        },
        {
          $lookup: {
            from: "alquiler",
            localField: "ID_Automovil",
            foreignField: "ID_Automovil",
            as: "alquiler"
          }
        },
        {
          $unwind: "$alquiler",
        },
        {
          $match: {
            "alquiler.Estado": "Disponible"
          }
        },
        {
          $group: {
            _id: "$ID_Automovil",
            Marca: { $first: "$Nombre" },
            Modelo: { $first: "$Modelo" },
            Año: { $first: "$Año" },
            Tipo: { $first: "$Tipo" },
            Capacidad: { $first: "$Capacidad" },
            Precio_Diario: { $first: "$Precio_Diario" },
            sucursal_automovil: { $addToSet: "$sucursal_automovil" },
            reserva: { $addToSet: "$reserva" },
            alquiler: { $addToSet: "$alquiler" },
          }
        },
        {
          $project: {
            // ID_Cliente: "$ID_Cliente",
            // Marca: "$_id",
            Modelo: 1,
            Año: 1,
            Tipo: 1,
            Capacidad: 1,
            Precio_Diario: 1,
            sucursal_automovil: {
              ID_Sucursal: 1,
              Cantidad_Disponible: 1,
            },
            reserva: {
              ID_Reserva: 1,
              ID_Cliente: 1,
              Fecha_Reserva: {
                $dateToString: {
                  date: { $arrayElemAt: 
                    ["$reserva.Fecha_Fin", 0] 
                  },
                  format: "%Y-%m-%dT%H:%M:%SZ"
                }
              },
              Fecha_Inicio: {
                $dateToString : { //convertidor de fecha a string
                  date: { // date es un string
                    $arrayElemAt : [
                      "$reserva.Fecha_Inicio", //acceso
                      0 //posición a tomar
                    ]
                  },
                  format : "%Y-%m-%dT%H:%M:%SZ" //formato a tomar para el nuevo string del campo "date"
                }
              },
              Fecha_Fin: {
                $dateToString : {
                  date : {
                    $arrayElemAt : [
                      "$reserva.Fecha_Inicio",
                      0
                    ]
                  },
                  format : "%Y-%m-%dT%H:%M:%SZ"
                }
              },
              Estado: 1,
            },
            alquiler: {
              ID_Alquiler : 1,
              ID_Cliente : 1,
              Fecha_Inicio : {
                $dateToString: {
                  date: { 
                    $arrayElemAt: ["$alquiler.Fecha_Inicio", 0] 
                  },
                  format: "%Y-%m-%dT%H:%M:%SZ"
                }
              },
              Fecha_Fin : {
                $dateToString: {
                  date: { 
                    $arrayElemAt: ["$alquiler.Fecha_Fin", 0] 
                  },
                  format: "%Y-%m-%dT%H:%M:%SZ"
                }
              },
              Estado : 1,
            }
          },
        },
        {
          $sort: { _id: 1 }
        }
    ]).toArray();
    res.send(results).status(200);
})


export default alquiler;