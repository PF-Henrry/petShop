import { Schema,model,models } from "mongoose";
import {GOOD_GRAMMAR_CHECKED} from '@/utils/regex';

const provinceSchemma = new Schema({
    name:{
        type: String,
        unique:true,
        required:[true,'Please enter an name'],
        trim: true,
        match: GOOD_GRAMMAR_CHECKED
    }
})
export default models.Province || model('Province',provinceSchemma);