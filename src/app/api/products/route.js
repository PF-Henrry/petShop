import { NextResponse } from "next/server";
import { getProductById, getAllProducts } from "@/libs/bringProductsWhitRelarion";
import { addProduct } from "@/libs/createProductWithRelation";
import { deletedProductByID } from "@/libs/deletedProductById";
import { updateProductById } from "@/libs/updateProductWhitRelation";
import products from "@/models/products";

export async function GET(request){
   try {
      const { productId } = request.query;
  
      if (productId) {
        // Obtener un producto específico por ID
        const findProduct = await getProductById(productId);
  
        if (findProduct) {
          return NextResponse.json(findProduct, { status: 200 });
        } else {
          return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
      } else {
        // Obtener todos los productos
        const allProducts = await getAllProducts();
        return NextResponse.json(allProducts, { status: 200 });
      }
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(request){
    try {
        
        const dataProduct = await request.json();
        /*
         {
            name: "Correa",
            price:"3000",
            detail:"Correa para gato extendible,etc.",
            image:"http://google.com.ar",
            make:"Pichichu",
            discount:null,
            category:"Correa"
         }
        */
    
         const newProduct = await addProduct(dataProduct)
        
         const findProduct = await products.findOne({_id:newProduct._id}).populate('brand',{
            name:1,
            _id:0
         }).populate('category',{
            name:1,
            _id:0
         })

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
      const { productId } = request.query;

      if(!productId){
         return NextResponse.json({error: 'Product ID is requiered'}, {status:400});
      }
      const deletedProduct = await deletedProductByID(productId);

      if(deletedProduct){
         return NextResponse.json({message: 'Product deleted successfully'}, {status:200})
      }else{
         return NextResponse.json({error: 'Product not found'}, {status:404})
      }
   } catch (error) {
      return NextResponse.json(error, {status:500})
   }
}

export async function PUT(request){
   try {
      const { productId } = request.query;
      const updateData = await request.json();

      if(!productId){
         return NextResponse.json({error: 'Product ID is required'}, {status:400});
      }
      const updateProduct = await updateProductById(productId, updateData);
      if(updateProduct){
         return NextResponse.json(updateProduct, {status: 200});
      }else{
         return NextResponse.json({error:'Product not found' }, {status:404});
      }
   } catch (error) {
      return NextResponse.json(error, {status:500})
   }
}