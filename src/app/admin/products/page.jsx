// Importaciones necesarias
'use client'
import React, { useState, useEffect } from 'react';
import LayoutAdmin from '@/components/LayoutAdmin/LayoutAdmin';
import Image from 'next/image';
import Modal from 'react-modal';
import { Pencil, XCircle, FloppyDisk, Prohibit } from '@phosphor-icons/react/dist/ssr';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de productos');
        }

        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error(error.message);
        setError(`No se encontraron coincidencias con "${searchTerm}"`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    const searchWords = searchTermLower.split(' ');
    return searchWords.every((word) => productName.includes(word));
  });

  const openModal = (product) => {
    setSelectedProduct(product);
    setEditedProduct(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setEditedProduct(null);
    setIsEditing(false);
    setIsModalOpen(false);
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditedProduct({ ...selectedProduct });
  };

  const handleInputChange = (field, value) => {
    setEditedProduct({ ...editedProduct, [field]: value });
  };

  const handleImageChange = (file) => {
    try {
      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          const imageUrl = event.target.result;
          setEditedProduct({ ...editedProduct, image: imageUrl });
        };

        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };

  const saveChanges = () => {
    console.log('Guardando cambios:', editedProduct);
    setIsEditing(false);
  };

  return (
    <LayoutAdmin>
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Lista de Productos</h1>

        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4"
        />

        {isLoading && (
          <div className="flex items-center mb-4">
            <p className="mr-2 font-bold">Cargando...</p>
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && !error && (
          <div className="mb-4">
            <p>`No se encontraron coincidencias con ${searchTerm}`.</p>
          </div>
        )}

        {!isLoading && filteredProducts.length > 0 && (
          <ul>
            {filteredProducts.map((product) => (
              <li
                key={product._id}
                className="cursor-pointer p-2 rounded mb-2 transition-all duration-300 ease-in-out hover:bg-pink-100 hover:text-black"
                onClick={() => openModal(product)}
              >
                <span className="hover:font-bold">{product.name}</span>
                <span className="ml-2 text-gray-500">Stock: {product.stock}</span>
                <span className={`ml-2 ${product.active ? 'text-green-500' : 'text-red-500'}`}>
                  Estado: {product.active ? 'Activo' : 'Inactivo'}
                </span>
              </li>
            ))}
          </ul>
        )}

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Editar Producto"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              width: '500px',
              margin: 'auto',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              background: isEditing ? 'rgba(255, 182, 193, 0.8)' : 'rgba(255, 255, 255, 0.95)',
              marginTop: '50px',
              border: '2px solid #FFB6C1',
            },
          }}
        >
          {selectedProduct && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2>{selectedProduct.name}</h2>
                <div className="flex items-center">
                  {isEditing ? (
                    <>
                      <button
                        className="px-2 py-1 rounded mr-2"
                        onClick={saveChanges}
                      >
                        <FloppyDisk size={24} />
                      </button>
                      <button
                        className="px-2 py-1 rounded"
                        onClick={() => setIsEditing(false)}
                      >
                        <Prohibit size={24} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={startEditing} className="text-blue-500">
                        <Pencil size={24} />
                      </button>
                      <button onClick={closeModal} className="text-red-500">
                        <XCircle size={24} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {isEditing ? (
                <>
                  <div className="mb-4">
                    <span className="font-bold block mb-2">Imagen:</span>
                    {editedProduct.image && (
                      <Image
                        src={editedProduct.image}
                        alt={selectedProduct.name}
                        width={300}
                        height={300}
                        className="rounded-lg"
                      />
                    )}
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e.target.files[0])}
                      className="border border-rosybrown p-2 rounded mt-2"
                    />
                  </div>

                  <label className="font-bold block mb-2">Precio:</label>
                  <input
                    type="text"
                    value={editedProduct.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="border border-rosybrown rounded p-1 mb-2"
                  />

                  <label className="font-bold block mb-2">Detalle:</label>
                  <input
                    type="text"
                    value={editedProduct.detail}
                    onChange={(e) => handleInputChange('detail', e.target.value)}
                    className="border border-rosybrown rounded p-1 mb-2"
                  />

                  <label className="font-bold block mb-2">Marca:</label>
                  <input
                    type="text"
                    value={editedProduct.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="border border-rosybrown rounded p-1 mb-2"
                  />

                  <label className="font-bold block mb-2">Categorías:</label>
                  {/* Renderiza un componente de selección de categorías aquí */}
                  {/* Puedes usar un componente de selección múltiple o cualquier otro método según tus necesidades */}

                  <label className="font-bold block mb-2">Especies:</label>
                  {/* Renderiza un componente de selección de especies aquí */}
                  {/* Puedes usar un componente de selección múltiple o cualquier otro método según tus necesidades */}

                  <label className="font-bold block mb-2">Stock:</label>
                  <input
                    type="number"
                    value={editedProduct.stock}
                    onChange={(e) => handleInputChange('stock', e.target.value)}
                    className="border border-rosybrown rounded p-1 mb-2"
                  />

                  <label className="font-bold block mb-2">Estado:</label>
                  <select
                    value={editedProduct.active}
                    onChange={(e) => handleInputChange('active', e.target.value === 'true')}
                    className="border border-rosybrown rounded p-1 mb-2"
                  >
                    <option value={true}>Activo</option>
                    <option value={false}>Inactivo</option>
                  </select>
                </>
              ) : (
                <>
                  <p><span className="font-bold">Precio:</span> {selectedProduct.price}</p>
                  <p><span className="font-bold">Detalle:</span> {selectedProduct.detail}</p>
                  <p><span className="font-bold">Imagen:</span> {selectedProduct.image && <Image src={selectedProduct.image} alt={selectedProduct.name} width={300} height={300} className="rounded-lg" />}</p>
                  <p><span className="font-bold">Marca:</span> {selectedProduct.brand.name}</p>
                  <p><span className="font-bold">Especies:</span> {selectedProduct.species.map(species => species.name).join(', ')}</p>
                  <p><span className="font-bold">Categorías:</span> {selectedProduct.category.map(category => category.name).join(', ')}</p>
                  <p><span className="font-bold">Stock:</span> {selectedProduct.stock}</p>
                  <p><span className="font-bold">Estado:</span> {selectedProduct.active ? 'Activo' : 'Inactivo'}</p>
                </>
              )}
            </div>
          )}
        </Modal>
      </div>
    </LayoutAdmin>
  );
};

export default ProductsPage;
