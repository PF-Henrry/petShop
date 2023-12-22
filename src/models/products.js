import { Types, Schema, model ,models} from "mongoose";
import {PRODUCT_NAME_CHECKED, URLIMG_CHECKED} from '@/utils/regex';

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please Name is required'],
        trim: true,
        minlength: 2,
        maxlength: 20,
    },
    price:{
        type: Number,
        required: [true, 'Please price is required'],
        min: 0.01
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
    },
    brand: {
        type: Types.ObjectId,
        ref:"Brands"
    },
    species:{
        type: [{type:Types.ObjectId,ref:'Species'}],
    },
    category:{
        type: [{type:Types.ObjectId,ref:'Category'}]
    }
})


export default models.Products || model('Products', productSchema);