import { Types, Schema, model ,models} from "mongoose";
import {PRODUCT_NAME_CHECKED, URLIMG_CHECKED} from '@/utils/regex';

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please Name is required'],
        trim: true,
        minlength: 2
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
    },
    age:{
        type: String,
        enum: ['adult','puppy/kitten']
    },
    size:{
        type: String,
        enum: ['small','big','medium']
    },
    active:{
        type: Boolean,
        default: true
    },
    stock:{
        type: Number,
        default: 10
    },
    updatedAt:{
        type: Date,
    }
})

productSchema.methods.addStock = function (num){
    this.stock = pasrseInt(this.stock + num) 
    return this.save()
}

productSchema.methods.remStock = function(num){
    this.stock = pasrseInt(this.stock - num) 
    return this.save()
}

export default models.Products || model('Products', productSchema);

