import {connect,connection} from "mongoose";
//conection db

export const conn = {
    isConnected:false
}
const {DB_URI} = process.env 
export async function connectDB(){
    if(conn.isConnected) return;
        const db = await connect(DB_URI);
        conn.isConnected = db.connections[0].readyState;
   
    connection.on('connected',()=>{
        console.log('Mongoose is connected');
    });
 
    connection.on('error',(err)=>{
        console.log('Mongoose conection error', err);
    });
    
}