import { encrypt } from "@/libs/crypt";
import { Types, Schema, model, models} from "mongoose";

const userSchemma = new Schema({

    name:{
        type: String,
        required:[true, 'Name is required'],
        maxlength: [10, 'The name is too long'],
        trim: true,
    },
    lastname:{
        type:String
    },
    username:{
        type: String,
        required:[true, 'Enter an username'],
        unique:true,
    },
    adress:{
        type:String,
    },
    city:{
        type: Types.ObjectId,
        ref: "City",
    },
    province:{
        type: Types.ObjectId,
        ref: "Province"
    },
    role:{
        type: Number,
        require:true,
    },
    img:{
        type: String
    },
    email:{
        type: String,
        unique:true,
        required:[true,'Please enter an email'],
        
    },
    password:{
        type:String,
        required:[true,'Please enter a valid email']
    },
    codeP:{
        type:Number
    }
});


userSchemma.pre('save', async function (next){
    const user = this;
    if(!user.isModified('password')) return next();

    try {
        const hashedPassword = await encrypt(user.password)
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})


export default models.Users || model('Users',userSchemma) ;



