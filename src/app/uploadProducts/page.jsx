'use client'

import { useState } from "react"
import Image from "next/image";
import { useSession } from "next-auth/react";
import {  useRouter } from 'next/navigation';
import toastNotify from "@/libs/toast";

function UploadImage(){
    
    const {showNotify,ToastContainer} = toastNotify();

    const [url, setUrl] = useState(null);
    const [data,setData] = useState({})
    const [categorys,setCategorys] = useState([]);
    const [species,setSpecies] = useState([]);
    const router = useRouter();



    const { data: session, status } = useSession()

    
    const handleOptions = (e) => {
        const eventName = e.target.name;
        if (eventName === 'addCategory') {
            const categoryInput = document.querySelector('input[name="category"]');
            if (categoryInput) {
                const newCategory = categoryInput.value.trim();
                if (newCategory !== '') {
                    setCategorys((prevCategories) => [...prevCategories, newCategory]);
                    categoryInput.value = ''; // Limpiar el input después de agregar la categoría
                }
            }
            
        } else if (eventName === 'addSpecie') {
            const specieInput = document.querySelector('input[name="specie"]');
            const ageInput = document.querySelectorAll('input[name="age"]:checked');
            const sizeInput = document.querySelectorAll('input[name="size"]:checked');

            const ageData = Array.from(ageInput).map((age) => age.value);

            const sizeData = Array.from(sizeInput).map((size) => size.value);

            console.log(ageData);
            console.log(sizeData);

            if (specieInput) {
                const newSpecie = specieInput.value.trim();
                if (newSpecie !== '') {
                    setSpecies((prevSpecies) => [
                        ...prevSpecies, 
                        { name: newSpecie, size: sizeData[0], age: ageData[0] }
                    ]);
                    specieInput.value = ''; // Limpiar el input después de agregar la especie
                }
            }
        }
    };

    const handleDelete = (e) => {
        const deletedItemName = e.target.getAttribute('name');
    
        if (deletedItemName) {
            if (species.includes(deletedItemName)) {
                const updatedSpecies = species.filter(specie => specie !== deletedItemName);
                setSpecies(updatedSpecies);
            } else if (categorys.includes(deletedItemName)) {
                const updatedCategories = categorys.filter(category => category !== deletedItemName);
                setCategorys(updatedCategories);
            }
        }
    };

    const handleOnChange = (e) => {
        try {     
            if(e.target.files.length){
                const file = e.target.files[0];
                const reader = new FileReader();
    
                reader.onload = (event) => {
                    const imageUrl = event.target.result;
                    setUrl(imageUrl); // Almacena la URL de datos en el estado
                };
                reader.readAsDataURL(file);
            } 
        } catch (error) {
            showNotify('error','Error al cargar imagen');
            console.log(error.message);
        }
    }

    

    
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
                            specie:[...species],
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
                        if(response.ok){
                            console.log('entro aca')
                            showNotify('success','Producto subido')

                        }
                    } else {
                        router.push('/login');
                    }
            
            } catch (error) {
                showNotify('error', 'Error al subir a cloudinary');
                console.log(error.message);
            }
        };
        
    

    return(

        <section className="min-h-screen flex items-center justify-center mt-12">
                    <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">

        <form onSubmit={(e)=> handleOnSubmit(e)} className="grid grid-cols-2 gap-4 items-center">
        <input type="file" onChange={(e)=> handleOnChange(e)} />
        <div>
        {
            url && <Image src={url} alt='image_upload' width={150} height={100} />
        }
        </div>
        <h2>Detalles del producto</h2>
        <label>Nombre:
        <input type="text" name="name" placeholder="Nombre del producto"/>
        </label>
        <label>Precio:
        <div className="flex"><span>$<input type="number" name="price" placeholder="100"/></span></div>
        </label>
        <label>Detalles:
        <textarea name="detail" />
        </label>
        <label>Marca
            <input type="text" name="brand"/>
        </label>
        <label>Especie
            <input text="text" name="specie" />
            <fieldset className="flex flex-column justify-evenly">
        <legend>Age</legend>
        <label>
            <input type="checkbox" name="age" value="adult" />
              Adult
        </label>
        <label>
            <input type="checkbox" name="age" value="puppy/kitten" />
              Puppy/Kitten
        </label>
    </fieldset>
    <fieldset className="flex flex-column justify-evenly">
        <legend>Size</legend>
        <label>
            <input type="checkbox" name="size" value="small" />
              Small
        </label>
        <label>
            <input type="checkbox" name="size" value="big" />
              Big
        </label>
        <label>
            <input type="checkbox" name="size" value="medium" />
              Medium
        </label>
    </fieldset>
            <button type="button" onClick={ (e) => handleOptions(e)} name="addSpecie" >Add</button>
            {
                species.length ? species.map(specie => (
                    <div key={specie.name} className="flex justify-around">
                        {console.log(specie.name)}
                    <span>{specie.name}</span><span onClick={(e) => handleDelete(e)} name={specie.name}>X</span>
                    </div>
                    )
                ) : <span>Ninguna Especie seleccionada</span>
                }
        </label>
        <label>Category
            <input text="text" name="category" />
            <button type="button" onClick={ (e) => handleOptions(e)} name="addCategory" >Add</button>
            {
                categorys.length ? categorys.map(category => (
                    <div key={category} className="flex justify-around">
                    <span>{category}</span><span onClick= {(e) => handleDelete(e)} name={category}>X</span>
                    </div>
                    )
                ) : <span>Ninguna categoria seleccionada</span>
                }
        </label>

        <button type="submit">Subir Producto</button>
      </form>
    </div>

      <ToastContainer/>
    </section>
    )
}


export default UploadImage