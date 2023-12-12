import { Schema,model } from "mongoose";


const provinceSchemma = new Schema({
    name:{
        type: String,
        unique:true,
        validated:[true,'Please enter an name']
    }
})

export default model('Province',provinceSchemma);