import { Schema,Types,model,models } from "mongoose";
import { GOOD_GRAMMAR_CHECKED, URLIMG_CHECKED} from '@/utils/regex';

const animalSchemma = new Schema({
    name:{
        type:String,
        unique:true,
        required:[true,'Name is required'],
        trim: true,
        minlength: 3,
        maxlength: 30,
        match: GOOD_GRAMMAR_CHECKED
    },
    specie:{
        type: Types.ObjectId
    },
    breed:{
        type: Types.ObjectId
    },
    age:{
        type:Number,
        required:[true,'Age is required'],
        min: 0,
        max: 15
    },
    weight:{
        type:Number,
        required:[true,'Weight is required'],
        min: 1,
        max: 100,
    },
    height:{
        type:Number,
        required:[true,'Height is required'],
        min: 10,
        max: 115,
    },
    image:{
        type:String,
        required:[true,'Image is required'],
        trim: true,
        match: URLIMG_CHECKED
    }
})


export default models.Animal || model('Animal',animalSchemma);
