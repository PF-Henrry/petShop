"use client";
import React, { useState, useEffect } from "react";
import validationEdit from "./validationEdit";
import LayoutAdmin from "@/components/LayoutAdmin/LayoutAdmin";
import Loader from "@/components/Loader/Loader";
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
  <select onChange={(e) => onSelectCategory(e.target.value)}>
    <option value="">Selecciona una categoría</option>
    {categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ))}
  </select>
);

const SpeciesSelect = ({ species, selectedSpecies, onSelectSpecies }) => (
  <select onChange={(e) => onSelectSpecies(e.target.value)}>
    <option value="">Selecciona una especie</option>
    {species && 
      species?.map((specie) => (
        <option key={specie._id} value={specie?._id}>
          {specie?.name}
        </option>
      ))}
  </select>
);

const BrandSelect = ({ brands, selectedBrand, onSelectBrand }) => (
  <select onChange={(e) => onSelectBrand(e.target.value)}>
    <option value="">Selecciona una marca</option>
    {brands?.map((brand) => (
      <option key={brand?._id} value={brand?._id}>
        {brand?.name}
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
      setError(`No se encontraron coincidencias con ${searchTerm}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [searchTerm]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (isEditing) {
        try {
          const response = await fetch("/api/infoids");
          if (!response.ok) {
            throw new Error("Error al obtener información de filtros");
          }
          const data = await response.json();
          setCategories(data?.category);
          setSpecies(data?.specie);
          setBrands(data?.brand);
          setError(null);
        } catch (error) {
          console.error(error.message);
          setError("Error al obtener información de filtros");
        }
      }
    };

    fetchProductDetails();
  }, [isEditing]);

  const filteredProducts =  products?.filter((product) => {
    const productName = product.name.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    const searchWords = searchTermLower.split(" ");
    return searchWords.every((word) => productName.includes(word));
  });
  const activeProducts = filteredProducts.filter(
    (product) => product.active && product.stock > 0
  );

  const inactiveProducts = filteredProducts.filter(
    (product) => !product.active || product.stock <= 0
  );

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

    //VALIDACION

    setForm({ ...form, [field]: value });

    //VALIDACION
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
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      // Actualiza la lista de productos después de eliminar
      const updatedProducts = products?.filter(
        (product) => product?._id !== productId
      );
      fetchProducts();
      closeModal(); // Cierra el modal después de eliminar
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
    }
  };

  const saveChanges = async () => {
    try {
      console.log("Estoy aca");

      if (!editedProduct?.query) {
        editedProduct.query = { _id: editedProduct._id };
      }

      const response = await fetch(`/api/products`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      if (!response.ok) {
        throw new Error("Error al guardar los cambios");
      }

      // Actualiza la lista de productos después de guardar los cambios
      const updatedProducts = products.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      );
      fetchProducts();

      setIsEditing(false); // Sale del modo de edición
      closeModal();
    } catch (error) {
      console.error("Error al guardar los cambios:", error.message);
    }
  };

  //VALIDATION
  const [formError, setFormError] = useState({});

  const [form, setForm] = useState({
    price: "",
    // detail: "",
    stock: "",
  });

  const handleValidation = () => {
    const errors = validationEdit(form);

    setFormError(errors);
  };

  useEffect(() => {
    handleValidation();
  }, [form]);

  const disableButton = () => {
    let aux = true;

    if (Object.keys(formError).length === 0) {
      aux = false;
    }

    return aux;
  };

  useEffect(() => {
    // Este useEffect se ejecutará solo cuando el componente se monte
    // Reinicia el formulario estableciendo los valores iniciales
    setFormError({});
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="p-4">
        <h1 className="mb-4 text-2xl font-semibold">Lista de Productos</h1>

        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 mb-4 border border-gray-300 rounded"
        />

        {error && <div className="mb-4 text-red-500">{error}</div>}

        {!isLoading && !Array.isArray(filteredProducts) && filteredProducts?.length === 0 && !error && (
          <div className="mb-4">
            <p>No se encontraron coincidencias con {searchTerm}.</p>
          </div>
        )}

        {!isLoading && Array.isArray(filteredProducts) && filteredProducts.length > 0 && (
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h2 className="mb-2 text-lg font-semibold">Activos</h2>
              <ul className="overflow-y-scroll max-h-[65vh]">
                {Array.isArray(activeProducts) && activeProducts.map((product) => (
                  <li
                    key={product._id}
                    className="p-2 mb-2 transition-all duration-300 ease-in-out rounded cursor-pointer hover:bg-pink-100 hover:text-black"
                    onClick={() => openModal(product)}
                  >
                    <span className="hover:font-bold">{product?.name}</span>
                    <p className="text-sm">
                      Stock disponible:{" "}
                      <span
                        className={
                          product.stock > 0 ? "text-green-500" : "text-red-500"
                        }
                      >
                        {product.stock}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1/2 pl-4">
              <h2 className="mt-4 mb-2 text-lg font-semibold">No Activos</h2>
              <ul className="overflow-y-scroll max-h-[65vh]">
                {Array.isArray(inactiveProducts) && inactiveProducts.map((product) => (
                  <li
                    key={product._id}
                    className="p-2 mb-2 transition-all duration-300 ease-in-out rounded cursor-pointer hover:bg-pink-100 hover:text-black"
                    onClick={() => openModal(product)}
                  >
                    <span className="hover:font-bold">{product?.name}</span>
                    <p className="text-sm">
                      Stock disponible:{" "}
                      <span
                        className={
                          product?.stock > 0 ? "text-green-500" : "text-red-500"
                        }
                      >
                        {product?.stock}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
              <div className="flex items-center justify-between mb-4">
                <h2>{selectedProduct?.name}</h2>
                <div className="flex items-center">
                  {isEditing ? (
                    <>
                      <button
                        className="px-2 py-1 mr-2 text-white bg-green-500 rounded"
                        onClick={saveChanges}
                        disabled={disableButton()}
                      >
                        <FloppyDisk size={24} />
                      </button>
                      <button
                        className="px-2 py-1 text-white bg-gray-500 rounded"
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
                        className="px-2 py-1 ml-2 text-white bg-red-500 rounded"
                        onClick={() => deleteProduct(selectedProduct?._id)}
                      >
                        <Trash size={32} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <p>
                <span className="font-bold">Stock disponible:</span>{" "}
                {selectedProduct?.stock}
              </p>

              {isEditing ? (
                <>
                  <div className="mb-4">
                    <span className="block mb-2 font-bold">Imagen:</span>
                    {editedProduct?.image && (
                      <Image
                        src={editedProduct?.image}
                        alt={selectedProduct?.name}
                        width={300}
                        height={300}
                        className="rounded-lg"
                      />
                    )}
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e.target.files[0])}
                      className="p-2 mt-2 border rounded border-rosybrown"
                    />
                  </div>

                  <label className="block mb-2 font-bold">Precio:</label>
                  <input
                    type="number"
                    value={editedProduct?.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="p-1 mb-2 border rounded border-rosybrown"
                  />
                  {formError?.price ? (
                    <p className="text-red-500">{formError.price}</p>
                  ) : (
                    <p>
                      <br />
                    </p>
                  )}

                  <label className="block mb-2 font-bold">Detalle:</label>
                  <input
                    type="text"
                    value={editedProduct?.detail}
                    onChange={(e) =>
                      handleInputChange("detail", e.target.value)
                    }
                    className="p-1 mb-2 border rounded border-rosybrown"
                  />
                  {formError?.detail ? (
                    <p className="text-red-500">{formError.detail}</p>
                  ) : (
                    <p>
                      <br />
                    </p>
                  )}

                  <label className="block mb-2 font-bold">Categorías:</label>
                  <CategorySelect
                    categories={categories}
                    selectedCategory={
                      editedProduct
                        ? editedProduct?.category
                        : selectedProduct?.category
                    }
                    onSelectCategory={(value) =>
                      handleInputChange("category", value)
                    }
                  />

                  <label className="block mb-2 font-bold">Especies:</label>
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

                  <label className="block mb-2 font-bold">Marcas:</label>
                  <BrandSelect
                    brands={brands}
                    selectedBrand={
                      editedProduct
                        ? editedProduct.brand
                        : selectedProduct.brand
                    }
                    onSelectBrand={(value) => handleInputChange("brand", value)}
                  />
                  <label className="block mb-2 font-bold">Stock:</label>
                  <input
                    type="number"
                    value={editedProduct.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    className="p-1 mb-2 border rounded border-rosybrown"
                  />
                  {formError.stock ? (
                    <p className="text-red-500">{formError.stock}</p>
                  ) : (
                    <p>
                      <br />
                    </p>
                  )}

                  <label className="block mb-2 font-bold">Activo:</label>
                  {isEditing ? (
                    <select
                      value={editedProduct.active ? "Sí" : "No"}
                      onChange={(e) =>
                        handleInputChange("active", e.target.value === "Sí")
                      }
                      className={`border border-rosybrown rounded p-1 mb-2 ${
                        isEditing ? "bg-rosybrown-light" : ""
                      }`}
                    >
                      <option value="Sí">Sí</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    <p>{selectedProduct.active ? "Sí" : "No"}</p>
                  )}
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
                  <p>
                    <span className="font-bold">Stock:</span>{" "}
                    {selectedProduct.stock}
                  </p>
                  <p>
                    <span className="font-bold">Activo:</span>{" "}
                    {selectedProduct.active ? "Sí" : "No"}
                  </p>
                </>
              )}
            </div>
          )}
        </Modal>
      </div>
    </>
  );
};

export default ProductsPage;
