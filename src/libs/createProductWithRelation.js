import { connectDB } from "./mongodb"
import Products from "@/models/products";
import { findOrCreateModel } from "./dbmethods";
import categoryDB from "@/models/category";
import brandsDB from "@/models/brands";

export const addProduct = async (dataProduct) => {
    try { 
        connectDB();

        const {brand,discount,category,name,price} = dataProduct;

        if(!name || !price) throw TypeError('Name and Price is required');


        let pushCategory = [];
        if(Array.isArray(category)){
            category.forEach( async (categoryName) => {
                const newCategory = await findOrCreateModel(categoryDB,{name:categoryName});

                console.log('newCategory: ',newCategory);

                await pushCategory.push(newCategory);
            })
        }
    
        let pushMake
        if(brand)  pushMake = await findOrCreateModel(brandsDB,{name:brand});
    
        console.log(pushCategory);
        console.log(pushMake)

        const newProduct = await Products.create({
                ...dataProduct,
                brand: pushMake,
                category: pushCategory
        });

        return newProduct
    } catch (error) {
        throw error
    }

}