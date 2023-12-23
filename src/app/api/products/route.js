import { NextResponse } from "next/server";
import { addProduct } from "@/libs/createProductWithRelation";
import { postImage } from "@/libs/cloudinary";
import products from "@/models/products";
import { connectDB,conn } from "@/libs/mongodb";


export async function GET(request){
   try {
      if(!conn.isConnected) connectDB()
      const res = await products.find({}).populate("category",{
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

      if(!res) throw TypeError('Products not found');

      return NextResponse.json(res,{status:200});

   } catch (error) {
      return NextResponse.json(error.message,{status:400})
   }
}

export async function POST(request){
    try {
      if(!conn.isConnected) connectDB()

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
      if(!conn.isConnected) connectDB()

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
      if(!conn.isConnected) connectDB()

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