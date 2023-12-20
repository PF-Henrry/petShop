import { Types, Schema, model ,models} from "mongoose";
import {PRODUCT_NAME_CHECKED, URLIMG_CHECKED} from '@/utils/regex';

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please Name is required'],
        trim: true,
        minlength: 2,
        maxlength: 20,
        match: PRODUCT_NAME_CHECKED
    },
    price:{
        type: Number,
        required: [true, 'Please price is required'],
        min: 0.01,
        max: 1000000
    },
    detail:{
        type: String,
        required: [true, 'Please detail is required'],
        trim: true,
        minlength: 10,
        maxlength: 450
    },
    image:{
        type:String,
        trim: true,
        match: URLIMG_CHECKED
    },
    brand: {
        type: Types.ObjectId,
        ref:"Brands"
    },
    discount:{
        type: Types.ObjectId,
    },
    category:{
        type: Types.ObjectId, 
        ref:"Category"
    }
})

export default models.Products || model('Products', productSchema);