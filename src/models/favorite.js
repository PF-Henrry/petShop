import { Schema,model,Types,models } from "mongoose";


const favoriteSchemma = new Schema({
     userID:{
        type: Types.ObjectId,
        required:[true,'UserID is required']
     },
     products:{
        type: Types.ObjectId
     }
})



export default models.Favorite || model('Favorite',favoriteSchemma);