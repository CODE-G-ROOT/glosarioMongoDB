// import { MongoClient } from 'mongodb'
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env);

// const run = async (db, query, options, conexión) => {
//     //? db =>  Base de datos
//     //? query =>  Consulta(tiene que ser un objeto) : {ID_Automovil : 1}
//     //? options =>  Otros parámetros(también como objeto)
//     //? conexion => URL de conexión

//     const client = new MongoClient(conexión);

//     try {
//         const database = client.db();

//         const alquiler = database.collection(db);
//         // const query = { ID_Automovil : 1};  
//         if (!options) {
//             const find = await alquiler.findOne(query);
//         }
//         if (options) {
//             const find = await alquiler.findOne(query, options);
//         }
//         console.log(alquiler);
//     } catch (error) {
//         console.error(error);
//     } finally {
//         await client.close();
//     }
// }

// export default run;