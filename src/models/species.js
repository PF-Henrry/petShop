//agregar mas informacion sobre la especie.

import { Schema,model } from "mongoose";


const specieSchemma = new Schema({
    name:{
        type: String,
        unique:true,
        validated:[true,'Please enter an name']
    }
})

export default model('Specie',specieSchemma);