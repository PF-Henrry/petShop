'use client'
import React, { useState } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin/LayoutAdmin';

const ProductForm = () => {
  const [product, setProduct] = useState({
    // Define el estado del formulario
    name: '',
    description: '',
    price: 0,
    detail: '',
    image: '',
    brand: {
      name: '',
    },
    species: [
      {
        name: '',
      },
    ],
    category: [
      {
        name: '',
      },
    ],
    active: true,
    stock: 0,
  });

  const [error, setError] = useState(null);

  const handleOptions = (eventName) => {
    // Modifica el estado según el evento sin prompts
    if (eventName === 'addCategory') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        category: [...prevProduct.category, { name: 'use client' }],
      }));
    } else if (eventName === 'removeCategory') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        category: prevProduct.category.slice(0, -1),
      }));
    } else if (eventName === 'addSpecie') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        species: [...prevProduct.species, { name: 'use client' }],
      }));
    } else if (eventName === 'removeSpecie') {
      setProduct((prevProduct) => ({
        ...prevProduct,
        species: prevProduct.species.slice(0, -1),
      }));
    }
  };

  const handleChange = (e) => {
    // Maneja los cambios en los campos del formulario
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleOnChange = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) {
        throw new Error('Por favor, selecciona un archivo de imagen.');
      }

      // Puedes realizar operaciones adicionales aquí, como validar el tipo de archivo, tamaño, etc.

      // Lee el archivo de imagen
      const imageUrl = URL.createObjectURL(file);

      // Muestra la URL de la imagen en la consola (puedes adaptar esto según la estructura de tu interfaz)
      console.log('URL de la imagen:', imageUrl);

      // Reinicia el estado de error si la operación fue exitosa
      setError(null);

      // Actualiza el estado de la imagen
      setProduct((prevProduct) => ({ ...prevProduct, image: imageUrl }));

      // Aquí puedes realizar más operaciones con la URL de la imagen si es necesario

    } catch (error) {
      // Muestra una notificación de error si hay algún problema al cargar la imagen
      console.error('Error al cargar la imagen:', error.message);

      // Actualiza el estado de error para mostrar el mensaje en la interfaz
      setError('Hubo un problema al cargar la imagen. Por favor, intenta nuevamente.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Envía los datos del nuevo producto al backend
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Error al agregar el producto');
      }

      // Notificación de éxito mediante una alerta
      alert('Producto agregado exitosamente');

      // Limpia el formulario después de enviar los datos
      setProduct({
        name: '',
        price: 0,
        detail: '',
        image: '',
        brand: {
          name: '',
        },
        species: [
          {
            name: '',
          },
        ],
        category: [
          {
            name: '',
          },
        ],
        active: true,
        stock: 0,
      });
    } catch (error) {
      console.error('Error:', error);
      setError('Hubo un problema al agregar el producto. Por favor, intenta nuevamente.');
    }
  };

  return (
    <LayoutAdmin>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del producto:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Descripción del producto:</label>
          <textarea name="description" value={product.description} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Imagen:</label>
          <input type="file" name="image" onChange={handleOnChange} />
          {product.image && <img src={product.image} alt="Imagen seleccionada" style={{ maxWidth: '100%', marginTop: '10px' }} />}
        </div>
        <div className="form-group">
          <label>Marca:</label>
          <input type="text" name="brand" value={product.brand.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Especie:</label>
          <input type="text" name="species" value={product.species[0].name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Categoría:</label>
          <input type="text" name="category" value={product.category[0].name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Activo:</label>
          <input type="checkbox" name="active" checked={product.active} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Stock:</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} />
        </div>
        <div className="button-group">
          <button type="button" name="addCategory" onClick={() => handleOptions('addCategory')}>
            Agregar Categoría
          </button>
          <button type="button" name="removeCategory" onClick={() => handleOptions('removeCategory')}>
            Eliminar Categoría
          </button>
          <button type="button" name="addSpecie" onClick={() => handleOptions('addSpecie')}>
            Agregar Especie
          </button>
          <button type="button" name="removeSpecie" onClick={() => handleOptions('removeSpecie')}>
            Eliminar Especie
          </button>
        </div>

        {/* Muestra el mensaje de error en la interfaz si hay un error */}
        {error && <div className="error-message">{error}</div>}

        <button type="submit">Agregar Producto</button>
      </form>
    </LayoutAdmin>
  );
};

export default ProductForm;
