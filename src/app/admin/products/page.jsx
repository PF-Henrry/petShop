// Importaciones necesarias
"use client";
import React, { useState, useEffect } from "react";
import LayoutAdmin from "@/components/LayoutAdmin/LayoutAdmin";
import Image from "next/image";
import Modal from "react-modal";
import {
  Pencil,
  XCircle,
  FloppyDisk,
  Prohibit,
  Trash,
} from "@phosphor-icons/react/dist/ssr";

const CategorySelect = ({ categories, selectedCategory, onSelectCategory }) => (
  <select
    value={selectedCategory}
    onChange={(e) => onSelectCategory(e.target.value)}
  >
    <option value="">Selecciona una categoría</option>
    {categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ))}
  </select>
);

const SpeciesSelect = ({ species, selectedSpecies, onSelectSpecies }) => (
  <select
    value={selectedSpecies}
    onChange={(e) => onSelectSpecies(e.target.value)}
  >
    <option value="">Selecciona una especie</option>
    {species && species.map((specie) => (
      <option key={specie._id} value={specie?._id}>
        {specie?.name}
      </option>
    ))}
  </select>
);

// Nuevo componente para la selección de marcas
const BrandSelect = ({ brands, selectedBrand, onSelectBrand }) => (
  <select
    value={selectedBrand}
    onChange={(e) => onSelectBrand(e.target.value)}
  >
    <option value="">Selecciona una marca</option>
    {brands.map((brand) => (
      <option key={brand._id} value={brand._id}>
        {brand.name}
      </option>
    ))}
  </select>
);

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [species, setSpecies] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Error al obtener la lista de productos");
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

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (isEditing) {
        try {
          const response = await fetch("/api/infoids"); // Ajusta la ruta según tu API
          if (!response.ok) {
            throw new Error("Error al obtener información de filtros");
          }
          const data = await response.json();
          setCategories(data.category);
          setSpecies(data.specie);
          setBrands(data.brand);
          setError(null);
        
        } catch (error) {
          console.error(error.message);
          setError("Error al obtener información de filtros");
        }
      }
    };

    fetchProductDetails();
  }, [isEditing]);

  const filteredProducts = products.filter((product) => {
    const productName = product.name.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    const searchWords = searchTermLower.split(" ");
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
      console.error("Error al cargar la imagen:", error);
    }
  };
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      // Actualiza la lista de productos después de eliminar
      const updatedProducts = products.filter(product => product._id !== productId);
      setProducts(updatedProducts);

      closeModal(); // Cierra el modal después de eliminar
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
    }
  };


  const saveChanges = async () => {
    try {
      const response = await fetch(`/api/products/${editedProduct._id}`, {
        method: 'PUT', // o 'PATCH' dependiendo de la lógica de actualización de tu API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }

      // Actualiza la lista de productos después de guardar los cambios
      const updatedProducts = products.map(product =>
        product._id === editedProduct._id ? editedProduct : product
      );
      setProducts(updatedProducts);

      setIsEditing(false); // Sale del modo de edición
    } catch (error) {
      console.error('Error al guardar los cambios:', error.message);
    }
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

        {error && <div className="mb-4 text-red-500">{error}</div>}

        {!isLoading && filteredProducts.length === 0 && !error && (
          <div className="mb-4">
            <p>No se encontraron coincidencias con "{searchTerm}".</p>
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
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              width: "500px",
              margin: "auto",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              background: isEditing
                ? "rgba(255, 182, 193, 0.8)"
                : "rgba(255, 255, 255, 0.95)",
              marginTop: "50px",
              border: "2px solid #FFB6C1",
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
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                        onClick={saveChanges}
                      >
                        <FloppyDisk size={24} />
                      </button>
                      <button
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                        onClick={() => setIsEditing(false)}
                      >
                        <Prohibit size={24} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={startEditing}>
                        <Pencil size={24} />
                      </button>
                      <button onClick={closeModal}>
                        <XCircle size={24} />
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                        onClick={() => deleteProduct(selectedProduct._id)}
                      >
                        <Trash size={32} />
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
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="border border-rosybrown rounded p-1 mb-2"
                  />

                  <label className="font-bold block mb-2">Detalle:</label>
                  <input
                    type="text"
                    value={editedProduct.detail}
                    onChange={(e) =>
                      handleInputChange("detail", e.target.value)
                    }
                    className="border border-rosybrown rounded p-1 mb-2"
                  />

                  <label className="font-bold block mb-2">Categorías:</label>
                  <CategorySelect
                    categories={categories}
                    selectedCategory={
                      editedProduct
                        ? editedProduct.category
                        : selectedProduct.category
                    }
                    onSelectCategory={(value) =>
                      handleInputChange("category", value)
                    }
                  />

                  <label className="font-bold block mb-2">Especies:</label>
                  <SpeciesSelect
                    species={species}
                    selectedSpecies={
                      editedProduct
                        ? editedProduct.species
                        : selectedProduct.species
                    }
                    onSelectSpecies={(value) =>
                      handleInputChange("species", value)
                    }
                  />

                  {/* Nuevo selector de marcas */}
                  <label className="font-bold block mb-2">Marcas:</label>
                  <BrandSelect
                    brands={brands}
                    selectedBrand={
                      editedProduct
                        ? editedProduct.brand
                        : selectedProduct.brand
                    }
                    onSelectBrand={(value) =>
                      handleInputChange("brand", value)
                    }
                  />
                </>
              ) : (
                <>
                  <p>
                    <span className="font-bold">Precio:</span>{" "}
                    {selectedProduct.price}
                  </p>
                  <p>
                    <span className="font-bold">Detalle:</span>{" "}
                    {selectedProduct.detail}
                  </p>
                  <p>
                    <span className="font-bold">Imagen:</span>{" "}
                    {selectedProduct.image && (
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        width={300}
                        height={300}
                        className="rounded-lg"
                      />
                    )}
                  </p>
                  <p>
                    <span className="font-bold">Marca:</span>{" "}
                    {selectedProduct.brand.name}
                  </p>
                  <p>
                    <span className="font-bold">Especies:</span>{" "}
                    {selectedProduct.species
                      .map((species) => species.name)
                      .join(", ")}
                  </p>
                  <p>
                    <span className="font-bold">Categorías:</span>{" "}
                    {selectedProduct.category
                      .map((category) => category.name)
                      .join(", ")}
                  </p>
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
