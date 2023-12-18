
import products from "@/models/products";

export async function getProductById(productId) {
  try {
    // Buscar el producto por ID
    const product = await products.findOne({ _id: productId }).populate('brand', {
      name: 1,
      _id: 0
    }).populate('category', {
      name: 1,
      _id: 0
    });

    return product;
  } catch (error) {
    throw error;
  }
}

export async function getAllProducts() {
  try {
    // Obtener todos los productos
    const allProducts = await products.find().populate('brand', {
      name: 1,
      _id: 0
    }).populate('category', {
      name: 1,
      _id: 0
    });

    return allProducts;
  } catch (error) {
    throw error;
  }
}