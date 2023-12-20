import { Schema,Types,model,models } from "mongoose";

const animalSchemma = new Schema({
    name:{
        type:String,
        unique:true,
        validated:[true,'Plase enter an Name']
    },
    specie:{
        type: Types.ObjectId
    },
    breed:{
        type: Types.ObjectId
    },
    age:{
        type:Number
    },
    weight:{
        type:Number
    },
    height:{
        type:Number
    },
    image:{
        type:String
    }
})


export default models.Animal || model('Animal',animalSchemma);
