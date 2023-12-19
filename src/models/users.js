import { encrypt,isEqual } from "@/libs/crypt";
import { Types, Schema, model, models} from "mongoose";
import {INPUT_NAME_CHECKED, ADDRESS_CHECKED, URLIMG_CHECKED, EMAIL_CHECKED, PASSWORD_CHECKED, POSTAL_CHECKED} from '@/utils/regex';

const userSchemma = new Schema({

    name:{
        type: String,
        required:[true, 'Name is required'],
        trim: true,
        match: INPUT_NAME_CHECKED
    },
    lastname:{
        type:String,
        required:[true, 'Name is required'],
        trim: true,
        match: INPUT_NAME_CHECKED
    },
    username:{
        type: String,
        required:[true, 'Enter an username'],
        unique:true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    adress:{
        type:String,
        required:[true, 'Enter an username'],
        trim: true,
        minlength: 5,
        maxlength: 100,
        match: ADDRESS_CHECKED
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
        type: String,
        required:[true,'Image is required'],
        trim: true,
        match: URLIMG_CHECKED
    },
    email:{
        type: String,
        unique:true,
        required:[true,'Please enter an email'],
        trim: true,
        match: EMAIL_CHECKED
    },
    password:{
        type:String,
        required:[true,'Please enter a valid email'],
        match: PASSWORD_CHECKED
    },
    codeP:{
        type:Number,
        required:[true,'Please enter a valid email'],
        match: POSTAL_CHECKED
    },
    favorite:{
        type: Types.ObjectId
    }
});

userSchemma.methods.comparePassword  =  function(inputPassword){
    if(inputPassword) return  isEqual(this.password,inputPassword);
}

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



