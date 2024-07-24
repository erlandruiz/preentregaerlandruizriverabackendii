import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL =  'mongodb://127.0.0.1:27017/coder69900';


console.log(`Este es de MONGO_url en conecction:${MONGO_URL}`);


export const  initMongoDB = async()=>{

    try {
       
        await mongoose.connect(MONGO_URL);
        console.log('Conectado a MongoDB Atlas');
    } catch (err) {
        console.error('Error al conectar a MongoDB Atlas:', err);
    }
}