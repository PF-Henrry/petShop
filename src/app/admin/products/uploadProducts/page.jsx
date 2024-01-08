'use client'
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import toastNotify from "@/libs/toast";
import LayoutAdmin from "@/components/LayoutAdmin/LayoutAdmin";

function UploadImage() {
  const { showNotify, ToastContainer } = toastNotify();

  const [url, setUrl] = useState(null);
  const [data, setData] = useState({});
  const [categorys, setCategorys] = useState([]);
  const [species, setSpecies] = useState([]);
  const router = useRouter();

  const { data: session, status } = useSession();

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

  const handleOptions = (type) => {
    const inputName = type === 'addCategory' ? 'category' : 'specie';
    const inputValue = document.querySelector(`input[name="${inputName}"]`).value.trim();

    if (inputValue !== '') {
      if (type === 'addCategory') {
        setCategorys((prevCategories) => [...prevCategories, inputValue]);
      } else {
        const ageInputs = document.querySelectorAll('input[name="age"]:checked');
        const sizeInputs = document.querySelectorAll('input[name="size"]:checked');
        const ageData = Array.from(ageInputs).map((age) => age.value);
        const sizeData = Array.from(sizeInputs).map((size) => size.value);

        setSpecies((prevSpecies) => [
          ...prevSpecies,
          { name: inputValue, size: sizeData[0], age: ageData[0] }
        ]);
      }

      document.querySelector(`input[name="${inputName}"]`).value = '';
    }
  };

  const handleDelete = (name, type) => {
    if (type === 'category') {
      setCategorys((prevCategories) => prevCategories.filter((category) => category !== name));
    } else {
      setSpecies((prevSpecies) => prevSpecies.filter((specie) => specie.name !== name));
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (status === "authenticated") {
        const dataToSend = {
          name: e.target.querySelector('input[name="name"]').value,
          price: e.target.querySelector('input[name="price"]').value,
          detail: e.target.querySelector('textarea[name="detail"]').value,
          image: url,
          brand: e.target.querySelector('input[name="brand"]').value,
          specie: [...species],
          category: categorys
        };

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
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 block w-full sm:text-sm"
                />
              </label>

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Precio
                <div className="flex">
                  <span className="p-2 border border-gray-300 rounded-l focus:outline-none focus:border-indigo-500 block w-full sm:text-sm">$</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="100"
                    className="p-2 border border-gray-300 rounded-r focus:outline-none focus:border-indigo-500 block w-full sm:text-sm"
                  />
                </div>
              </label>

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Detalles
                <textarea
                  name="detail"
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 block w-full sm:text-sm"
                />
              </label>

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Marca
                <input
                  type="text"
                  name="brand"
                  className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 block w-full sm:text-sm"
                />
              </label>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Categoría
                <input type="text" name="category" className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 block w-full sm:text-sm" />
                <div className="flex space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => handleOptions('addCategory')}
                    className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Add
                  </button>
                  {categorys.length > 0 ? (
                    <span className="text-red-500 cursor-pointer" onClick={() => handleDelete(categorys[categorys.length - 1], 'category')}>Undo</span>
                  ) : null}
                </div>
              </label>

              <label className="block text-sm font-medium text-gray-700 mt-4">
                Especie
                <input type="text" name="specie" className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 block w-full sm:text-sm" />
                <div className="flex space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => handleOptions('addSpecie')}
                    className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    Add
                  </button>
                  {species.length > 0 ? (
                    <span className="text-red-500 cursor-pointer" onClick={() => handleDelete(species[species.length - 1].name, 'specie')}>Undo</span>
                  ) : null}
                </div>
                
                
              </label>

              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
