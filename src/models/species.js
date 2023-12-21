import { Schema,model,models } from "mongoose";
import {GOOD_GRAMMAR_CHECKED} from '@/utils/regex';

const specieSchemma = new Schema({
    name:{
        type: String,
        unique:true,
        required:[true,'Please enter an name'],
        trim: true,
        minlength: 2,
        maxlength: 50,
        match: GOOD_GRAMMAR_CHECKED
    },
    age:{
        type: String,
    },
    size:{
        type: String,
    }
})

export default models.Specie || model('Specie',specieSchemma);