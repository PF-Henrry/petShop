// pages/shop/[id].js
"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const DetailProduct = () => {

    const params = useParams()
    const id = params.id
  //const router = useRouter();
  //const { id } = router.query;

  // Define un estado para almacenar los detalles del producto
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Función para obtener los detalles del producto desde la API
    const obtenerDetallesDelProducto =  () => {
      try {
        // Realiza la llamada a la API para obtener los detalles del producto
        fetch(`/api/products/${id}`).then(
          data => data.json()
        ).then(data => {
          setProduct({...data});
        });

        
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
      }
    };

    // Llama a la función para obtener los detalles del producto al montar el componente
    obtenerDetallesDelProducto();
  }, [id]); // Dependencia para que se vuelva a llamar si el ID cambia

  if (!product) {
    // Puedes mostrar un indicador de carga o un mensaje mientras se obtienen los detalles del producto
    return <p>Cargando...</p>;
  }

  // Renderiza los detalles del producto
  return (
    <div>
      {
        console.log('esto es product',product)
      }
      <h1>{product?.name}</h1>
      <p>Precio: ${product?.price}</p>
      <p>{product?.detail}</p>
      <img src={product?.image} alt={product.name} style={{ maxWidth: '100%' }} />
      <p>Marca: {product?.brand?.name}</p>
      <p>Especie: {product.species && product.species[0]?.name}</p>
    <p>Categoría: {product.category && product.category[0]?.name}</p>
      {/* Otros detalles del producto */}
    </div>
  );
};

export default DetailProduct;
