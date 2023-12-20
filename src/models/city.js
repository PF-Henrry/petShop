import { Schema,model,models } from "mongoose";
import {GOOD_GRAMMAR_CHECKED} from '@/utils/regex';

const citySchemma = new Schema({
    name:{
        type: String,
        unique:true,
        required:[true,'Name is required'],
        trim: true,
        match: GOOD_GRAMMAR_CHECKED
    }
})

export default models.City || model('City',citySchemma);