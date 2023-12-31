import { Schema,model,models } from "mongoose";
import {GOOD_GRAMMAR_CHECKED} from '@/utils/regex';

const specieSchemma = new Schema({
    name:{
        type: String,
        required:[true,'Please enter an name'],
        trim: true,
        minlength: 2,
        maxlength: 50,
    }
})

export default models.Species || model('Species',specieSchemma);