import { Schema,model,models } from "mongoose";
import { GOOD_GRAMMAR_CHECKED } from '@/utils/regex';


const breedSchemma = new Schema({
    name:{
        type: String,
        unique:true,
        required:[true,'Name is required'],
        match: GOOD_GRAMMAR_CHECKED
    }
})

export default models.Breed || model('Breed',breedSchemma);