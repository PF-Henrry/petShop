//agregar mas informacion de la raza,
import { Schema,model,models } from "mongoose";


const breedSchemma = new Schema({
    name:{
        type: String,
        unique:true,
        validated:[true,'Please enter an name']
    }
})

export default models.Breed || model('Breed',breedSchemma);