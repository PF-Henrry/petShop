import { Schema,model,Types,models } from "mongoose";


const favoriteSchemma = new Schema({
     userID:{
        type: Types.ObjectId,
        ref:'Users',
        required:[true,'UserID is required']
     },
     products:{
        type: [{type:Types.ObjectId,ref:"Products"}]
     },
     active:{
      type: Boolean,
      default: true
     },
      updatedAt:{
      type: Date,
     }
})



export default models.Favorite || model('Favorite',favoriteSchemma);