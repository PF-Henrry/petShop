import { Types, Schema, model, models} from "mongoose";

const userSchemma = new Schema({

    name:{
        type: String,
        required:[true, 'Name is required'],
        maxlength: [10, 'The name is too long'],
        trim: true,
    },
    username:{
        type: String,
        required:[true, 'Enter an username'],
        unique:[true,'Username is Already']
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



