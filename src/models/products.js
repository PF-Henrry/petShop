import { Types, Schema, model ,models} from "mongoose";

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
    brand: {
        type: Types.ObjectId,
        ref:"Brands"
    },
    discount:{
        type: Types.ObjectId,
    },
    category:{
        type: [{type: Types.ObjectId, ref:'Category'}]
    }
})

export default models.Products || model('Products', productSchema);