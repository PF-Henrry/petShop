import { Schema,model } from "mongoose";


const citySchemma = new Schema({
    name:{
        type: String,
        unique:true,
        validated:[true,'Please enter an name']
    }
})

export default model('City',citySchemma);