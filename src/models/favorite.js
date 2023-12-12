import { Schema,model,Types } from "mongoose";


const favoriteSchemma = new Schema({
     userID:{
        type: Types.ObjectId,
        required:[true,'UserID is required']
     },
     products:{
        type: Types.Array
     }
})


export default model('Favorite',favoriteSchemma);