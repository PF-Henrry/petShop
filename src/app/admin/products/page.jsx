'use client'
import React, { useState, useEffect } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin/LayoutAdmin';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de productos');
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente.

  // Filtrar productos por cada palabra en el nombre
  const filteredProducts = products.filter((product) => {
    // Convertir el nombre del producto y el término de búsqueda a minúsculas para ser insensible a mayúsculas
    const productName = product.name.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    // Dividir el término de búsqueda en palabras y verificar si todas están presentes en el nombre del producto
    const searchWords = searchTermLower.split(' ');
    return searchWords.every((word) => productName.includes(word));
  });

  return (
    <LayoutAdmin>
      <div>
        {/* Contenido específico de la página de productos */}
        <h1>Lista de Productos</h1>
        
        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Lista de productos filtrados */}
        <ul>
          {filteredProducts.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </LayoutAdmin>
  );
};

export default ProductsPage;
