import { Schema,Types,model,models } from "mongoose";



const feedbacksSchema =  new Schema({
    productId:{
        type: Types.ObjectId,
        ref:'Products',
        require:true,
        unique:true
    },
    feed:[{
        userID:{
            type: Types.ObjectId,
            require:true,
            ref:'Users'
        },
        text:{
            type: String,
            require:true,
        },
        rating:{
            type: Number,
            default:1
        }
    }]
})


export default models.FeedBacks || model('FeedBacks',feedbacksSchema);