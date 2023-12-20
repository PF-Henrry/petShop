import { Schema,model,models } from "mongoose";


const provinceSchemma = new Schema({
    name:{
        type: String,
        unique:true,
        validated:[true,'Please enter an name']
    }
})
export default models.Province || model('Province',provinceSchemma);