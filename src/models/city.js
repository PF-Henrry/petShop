import { Schema,model,models } from "mongoose";


const citySchemma = new Schema({
    name:{
        type: String,
        unique:true,
        validated:[true,'Please enter an name']
    }
})

export default models.City || model('City',citySchemma);