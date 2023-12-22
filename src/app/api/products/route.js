import { NextResponse } from "next/server";
import { addProduct } from "@/libs/createProductWithRelation";
import { postImage } from "@/libs/cloudinary";
import products from "@/models/products";
import mongoose from "mongoose";

export async function GET(request){
   try {
      const data = await request.json();
      console.log('esta es la data',data)
      const {query} = data;
      console.log('esta es la query',query);
      const SearchCriteria = {}
      // for(prop of query){
      //    if(prop?._id){
      //       query[prop]._id = mongoose.Types.ObjectId(query[prop]._id);
      //    }
      // }
      if(!query) throw TypeError('Query is undefined');
      console.log('llego antes del find')
      const res = await products.find({...query});
      console.log('este es el find',res)
      if(!res) throw TypeError('Product not found');
      return NextResponse.json(res,{...query});
   } catch (error) {
      return NextResponse.json(error.message,{status:400})
   }
}

export async function POST(request){
    try { 
        const dataProduct = await request.json();
        const newProduct = await addProduct(dataProduct)
        const findProduct = await products.findOne({_id:newProduct._id})
         .populate("category",{
            _id:0,
            name:1
        })
        .populate("species",{
            _id:0,
            name:1,
            age:1,
            size:1,
        })
        .populate("brand",{
            _id:0,
            name:1
        });

        //guardado de la imagen en cloudinary.
        if(dataProduct.image) {
           const newImg = await postImage(dataProduct.image,findProduct._id);
           if(newImg?.url)
           findProduct.image= newImg.url
         findProduct.save()
        }
         if(findProduct) return NextResponse.json(findProduct,{
            status:200
         })
    } catch (error) {
        return NextResponse.json(error,{
            status:400
        })
    }
}
export async function DELETE(request){
   try {
      const dataProduct = await request.json();
      const {query} = dataProduct;


      if(!query) throw TypeError('Query is undefined');

      const res = await  products.findOneAndDelete({...query});

      return NextResponse.json(res,{status:200});
      
   } catch (error) {
      return NextResponse.json(error.message,{status:404});
   } 
}

export async function PUT(request){
   try {
      const dataProduct = await request.json();
      const {query} = dataProduct
      
      if(!query) throw TypeError('Error query args');

      
      const findUpdate = await products.findOneAndUpdate({...query},dataProduct);

      if(!findUpdate) throw TypeError('Product not found');

      const findProduct =  await products.findOne({_id:findUpdate._id})
      .populate("category",{
         _id:0,
         name:1
     })
     .populate("species",{
         _id:0,
         name:1,
         age:1,
         size:1,
     })
     .populate("brand",{
         _id:0,
         name:1
     });
      return NextResponse.json({state:true,
      productUpdate:findProduct
      },{status:200});
   } catch (error) {
      return NextResponse.json(error.message,{
         status:404
      });
   }
}