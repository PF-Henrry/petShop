import Users from "@/models/users";
import Citys from "@/models/city";
import Provinces from "@/models/provinces";
import { findOrCreateModel } from "./dbmethods";


export default async function newUser(user) {
  const { city, province } = user;
try {
  const newCity =  await findOrCreateModel(Citys,{name:city})
  const newProvince = await findOrCreateModel(Provinces,{name:province}) 
  const savedUser = await Users.create({
    ...user,
    city: newCity._id,
    province: newProvince._id,
  });

  return savedUser;
} catch (error) { 
  console.log(error)
  throw error 
}
    
}
