import products from "@/models/products";

export async function deletedProductByID(productId){
    try {
        const deletedProduct = await products.findOneAndDelete({_id: productId});

        return deletedProduct
    } catch (error) {
        throw error;
    }
}