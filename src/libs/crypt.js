import { compare,hash,genSalt } from "bcrypt";


export const encrypt = async (pass) =>{
    const salt = await genSalt(12)
    const newPass = await hash(pass, salt);
    return newPass
}

export const isEqual = async (hash,pass) => await compare(pass,hash) 