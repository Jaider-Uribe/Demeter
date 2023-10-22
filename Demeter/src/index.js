import app from './app.js';
import { sequelize } from './db/database.js';
import './models/suppliescategory.model.js'
import './models/supplies.model.js';
import './models/productcategory.model.js';

async function main(){
    try{
        await sequelize.sync({force : false});
        console.log("conectado con exito");
        app.listen(4000)
        console.log('server on port', 4000)
    }catch(error){
        console.error("fallo al conectarse con la base de datos:", error);
    } 
}

main();