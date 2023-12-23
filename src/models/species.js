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
        enum: ['adult','puppy/kitten']
    },
    size:{
        type: String,
        enum: ['small','big','medium']
    }
})

export default models.Species || model('Species',specieSchemma);