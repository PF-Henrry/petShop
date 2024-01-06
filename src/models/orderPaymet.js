import { Schema,model,models,Types } from "mongoose";


const orderPaymetSchemma = new Schema({
    userID: {
        type: Types.ObjectId,
        ref:'Users'
    },
    status:{
       type: Boolean 
    },
    amount:{
        type: Number
    },
    orderID:{
        type: String,
    },
    fecha:{
        type: String
    },
    items:[{type: Types.ObjectId, ref:"Products"}]
});


orderPaymetSchemma.methods.changeStatus = function() {
    this.status = !this.status;
    return this.save(); // Guarda los cambios en la base de datos
  };

orderPaymetSchemma.methods.addTotalAmount = function(num){
     this.amount = num
     return this.save();
}

export default models.OrderPatmets || model('OrderPatmets',orderPaymetSchemma);

