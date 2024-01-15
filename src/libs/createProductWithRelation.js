import { connectDB,conn } from "./mongodb"
import Products from "@/models/products";
import { findOrCreateModel } from "./dbmethods";
import categoryDB from "@/models/category";
import brandsDB from "@/models/brands";
import speciesDB from "@/models/species";

export const addProduct = async (dataProduct) => {

    try { 
        if(!conn.isConnected) connectDB();

        const {brand,category,name,price,species} = dataProduct;
        console.log('este es el valor de species',species);
        if(!name || !price) throw TypeError('Name and Price is required');


        let pushCategory = [];
        if(!Array.isArray(category)) throw TypeError('Error format Category');

        for (const categoryName of category) {
                const newCategory = await findOrCreateModel(categoryDB,{name:categoryName});
               pushCategory.push(newCategory._id);
        }
    
            let pushSpecies = [];
            if(!Array.isArray(species)) throw TypeError('Error format Specie');
            for (const specieObject of species) {            
                const findOrCreateSpecie = await findOrCreateModel(speciesDB,{name:specieObject});
                pushSpecies.push(findOrCreateSpecie);
            }
        
        let pushMake
        if(!brand) pushMake= 'Unknown'
        else pushMake = brand
        pushMake = await findOrCreateModel(brandsDB,{name:pushMake});
    

     


            const newProduct = await Products.create({
                ...dataProduct,
                 brand: pushMake._id,
                 category: pushCategory,
                 species: pushSpecies,
                 active: true,
         })
        

        return newProduct

    } catch (error) {
        throw error
    }

}