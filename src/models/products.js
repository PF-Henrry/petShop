import { Types, Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please Name is required']
    },
    price:{
        type: Number,
        required: [true, 'Please price is required']
    },
    detail:{
        type: String,
    },
    image:{
        type:String,
    },
    make: {
        type: Types.ObjectId,
    },
    discount:{
        type: Types.ObjectId,
    },
    category:{
        type: Types.Array
    }
})


export default model('Products', productSchema);