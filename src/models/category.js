import { Schema,model,models } from "mongoose"; 


const categorySchemma = new Schema({
    name:{
        type: String,
        unique:[true,'Category is Already'],
        required:[true,'Category is required'],
    }
})

export default models.Category || model('Category',categorySchemma);
