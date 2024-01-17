'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import toastNotify from "@/libs/toast";
import LayoutAdmin from "@/components/LayoutAdmin/LayoutAdmin";
import validations from "./validations"

function UploadImage() {
  const { showNotify, ToastContainer } = toastNotify();

  const [url, setUrl] = useState(null);
  const [data, setData] = useState({});

  const router = useRouter();

  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [brandsOptions, setBrandsOptions] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    fetch('/api/infoids')
      .then((response) => response.json())
      .then((data) => {
        setCategoriesOptions(data.category);
        setSpeciesOptions(data.specie);
        setBrandsOptions(data.brand);
      })
      .catch((error) => console.error('Error fetching options:', error));
  }, []);
console.log('especies', speciesOptions )

  const handleOnChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = await getImageDataUrl(file);
        setUrl(imageUrl);
      }
    } catch (error) {
      showNotify('error', 'Error al cargar imagen');
      console.error(error.message);
    }
  };

  const getImageDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };



  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (status === "authenticated") {
        const dataToSend = {
          name: form.name,
          price: form.price,
          detail: form.detail,
          image: url,
          brand: form.brand,
          species: [form.specie],  
          category: [form.category]
        };
  console.log('data to send', dataToSend)
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        }).then((res) => res.json());
  
        console.log(response);
  
        if (response.ok) {
          showNotify('success', 'Producto subido');
        }
      } else {
        router.push('/login');
      }
    } catch (error) {
      showNotify('error', 'Error al subir a cloudinary');
      console.error(error.message);
    }
  };
  

    const [formError, setFormError] = useState({});

    const [form, setForm] = useState({
      name: "",
      price: "",
      detail: "",
      brand: "",
    },
    )
  
    const handleValidation = () => {
      const errors = validations(form)
  
      setFormError(errors)
    }
  
    const handleFormData = (event) => {
      const { name, value } = event.target;
    
      // Validación específica para el campo 'price'
      let newValue = value;
    
      if (name === "price") {
        // AsegURA de que el valor sea un número
        const numericValue = parseFloat(value);
    
        // Si el valor es menor que 0, establecerlo en 0
        newValue = isNaN(numericValue) ? 0 : Math.max(0, numericValue);
      }
    
      setForm({ ...form, [name]: newValue });
    };
  
    const disableButton = () => {
      let aux = true;
  
      if (Object.keys(formError).length === 0) {
        aux = false;
      }
  
      return aux;
    };
  
  
    useEffect(() => {
      handleValidation();
      console.log("ejecutando use effect")
    }, [form]);
  
   

  return (
    <LayoutAdmin>
      <section className="min-h-screen flex items-center justify-center mt-12">
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">

          <form onSubmit={(e) => handleOnSubmit(e)} className="grid grid-cols-2 gap-4 items-center">
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Imagen:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => handleOnChange(e)}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 block w-full sm:text-sm"
              />
              {url && <Image src={url} alt='image_upload' width={150} height={100} />}
            </div>
            <label className="block text-sm font-medium text-gray-700 mt-4">
                Nombre del Producto
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleFormData}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 block w-full sm:text-sm"
                />

               {formError.name ? 
               (<p className="text-red-500">{formError.name}</p>) : 
               (
               <p>
               <br />
               </p>
               )}
              </label>

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Precio
                <div className="flex">
                  <span className="p-2 border border-gray-300 rounded-l focus:outline-none focus:border-indigo-500 block w-full sm:text-sm">$</span>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleFormData}
                    placeholder="100"
                    className="p-2 border border-gray-300 rounded-r focus:outline-none focus:border-indigo-500 block w-full sm:text-sm"
                  />
                

                </div>
                {formError.price ? 
                (<p className="text-red-500">{formError.price}</p>) : 
                (
                <p>
                <br />
                </p>
                )}
              </label>

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Detalles
                <textarea
                  name="detail"
                  value={form.detail}
                  onChange={handleFormData}
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 block w-full sm:text-sm"
                />

               {formError.detail ? 
               (<p className="text-red-500">{formError.detail}</p>) : 
               (
               <p>
               <br />
               </p>
               )}
              </label>

              <label className="block text-sm font-medium text-gray-700 mt-4">
              Marca
              <select
                name="brand"
                value={form.brand}
                onChange={handleFormData}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 block w-full sm:text-sm"
              >
                <option value="">Seleccionar Marca</option>
                {brandsOptions.map((brand) => (
                  <option key={brand._id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </label>

               {/* {formError.brand ? 
               (<p className="text-red-500">{formError.brand}</p>) : 
               (
               <p>
               <br />
               </p>
               )} */}
             
            <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Categoría
              <select
                name="category"
                value={form.category}
                onChange={handleFormData}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 block w-full sm:text-sm"
              >
                <option value="">Seleccionar Categoría</option>
                {categoriesOptions?.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-gray-700 mt-4">
              Especie
              <select
                name="specie"
                value={form.specie}
                onChange={handleFormData}
                className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 block w-full sm:text-sm"
              >
                <option value="">Seleccionar Especie</option>
                {speciesOptions?.map((specie) => (
                  <option key={specie._id} value={specie.name}>
                    {specie.name}
                  </option>
                ))}
              </select>
            </label>

            
              <button
             type="submit"
             disabled={disableButton()}
             className={`inline-flex justify-center py-2 px-4 border shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
             disableButton() ? 'text-gray-500 bg-gray-300 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700'
             }`}
             >
             Subir Producto
          </button>
            </div>
          </form>
        </div>

        <ToastContainer />
      </section>
    </LayoutAdmin>
  );
}

export default UploadImage;
