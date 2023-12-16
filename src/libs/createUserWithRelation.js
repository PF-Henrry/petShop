import Users from "@/models/users";
import Citys from "@/models/city";
import Provinces from "@/models/provinces";
import { findOrCreateModel } from "./dbmethods";
import { connectDB } from "@/libs/mongodb";


export  async function addUser(user) {
  try {
    const { city, province } = user;
    connectDB();
    
    if(!city || !province)  throw TypeError('City or Province is not defined'); 

      const newCity =  await findOrCreateModel(Citys,{name:city})
      const newProvince = await findOrCreateModel(Provinces,{name:province}) 
      const savedUser = await Users.create({
        ...user,
        city: newCity._id,
        province: newProvince._id,
      });
    
      return savedUser
    
  

} catch (error) { 
  console.log(error)
  throw error 
}
    
}
