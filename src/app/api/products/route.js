import { NextResponse } from "next/server";
import { addProduct } from "@/libs/createProductWithRelation";
import { postImage } from "@/libs/cloudinary";
import products from "@/models/products";
import { connectDB,conn } from "@/libs/mongodb";
import { iniciarIntervalo } from "@/app/api/softDelete/softDeleteProducts"

export async function GET(request){
   try {
      if(!conn.isConnected) connectDB()
      const res = await products.find({}).populate("category",{
         _id:1,
         name:1
     })
     .populate("species",{
         _id:1,
         name:1,
     })
     .populate("brand",{
         _id:1,
         name:1
     });

      if(res.length === 0) throw TypeError('Products not found');

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
            _id:1,
            name:1
        })
        .populate("species",{
            _id:1,
            name:1,
        })
        .populate("brand",{
            _id:1,
            name:1
        });
        console.log('dataproduct', dataProduct);
        //guardado de la imagen en cloudinary.
        if(dataProduct.image) {
           const newImg = await postImage(dataProduct.image,findProduct._id);
           if(newImg?.url)
           findProduct.image= newImg.url
         findProduct.save()
        }
         if(findProduct) return NextResponse.json({...findProduct,ok:true},{
            status:200
         })
    } catch (error) {
      console.log('error',error.message)
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

      console.log(query)


      if(!query) throw TypeError('Query is undefined');


      await products.findOneAndUpdate(
         { ...query },
         {
             $set: {
             active: false,
             updatedAt: new Date()
         }
     },
         {new: true}
       );
 
       const datosInactivos = await products.find({ active: false })
 
       if(datosInactivos.length === 1){
         iniciarIntervalo();
       }

      return NextResponse.json({mensaje: "Producto eliminado"},{status:200});
      
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

      const findUpdate = await products.findOneAndUpdate({...query},{...dataProduct});

      if(!findUpdate) throw TypeError('Product not found');

      const findProduct =  await products.findOne({_id:findUpdate._id})
      .populate("category",{
         _id:1,
         name:1
     })
     .populate("species",{
         _id:1,
         name:1,
         age:1,
         size:1,
     })
     .populate("brand",{
         _id:1,
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