import { Schema,model,models,Types } from "mongoose";


const orderPaymetSchemma = new Schema({
    userID: {
        type: Types.ObjectId,
        ref:'Users'
    },
    status:{
       type: Boolean 
    },
    sendStatus:{
        type: String
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
    link:{
        type: String
    },
    items:[{ 
      product:{
        type: Types.ObjectId,
        ref:"Products"
        },
      count:{type: Number, default:1}
    }]
});


orderPaymetSchemma.methods.changeStatus = function() {
    this.status = !this.status;
    return this.save(); // Guarda los cambios en la base de datos
  };

orderPaymetSchemma.methods.addTotalAmount = function(num){
     this.amount = num
     return this.save();
}

orderPaymetSchemma.methods.updateStatus = function(state) {
    this.sendStatus = state;
    return this.save();
}

orderPaymetSchemma.methods.renewLink = function (url){
    this.link = url;
    return this.save();
}


export default models.OrderPatmets || model('OrderPatmets',orderPaymetSchemma);

