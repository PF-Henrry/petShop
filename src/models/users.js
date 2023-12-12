import { Types, Schema, model, models} from "mongoose";

const userSchemma = new Schema({

    name:{
        type: String,
        required:[true, 'Name is required'],
        trim: true,
    },
    lastname:{
        type:String
    },
    adress:{
        type:String,
    },
    city:{
        type: Types.ObjectId,
        ref: "City",
    },
    role:{
        type: Number,
        require:true,
    },
    img:{
        type: String
    },
    email:{
        type:String,
        unique:true,
        required:[true,'Please enter an email'],
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,'Please enter a valid email']
    },
    codeP:{
        type:Number
    }
});



export default models.Users || model('Users',userSchemma) ;


