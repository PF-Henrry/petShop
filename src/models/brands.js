import { Schema,model,models } from "mongoose";

const newBrand = new Schema({
    name:{
        type: String,
        unique:true,
        required:[true,'Name is required'],
    }
})


export default models.Brands || model('Brands',newBrand);
