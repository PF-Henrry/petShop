import products from "@/models/products";

export async function updateProductById(productId, updateData){
    try {
        const updateProduct = await products.findByIdAndUpdate(
            {_id: productId},
            {$set: updateData},
            {new: true}
        );
        return updateProduct;
    } catch (error) {
        throw error;
    }
}