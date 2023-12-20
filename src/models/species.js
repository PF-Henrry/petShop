//agregar mas informacion sobre la especie.

import { Schema,model,models } from "mongoose";


const specieSchemma = new Schema({
    name:{
        type: String,
        unique:true,
        validated:[true,'Please enter an name']
    }
})
export default models.Specie || model('Specie',specieSchemma);