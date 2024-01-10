import { connectDB,conn } from "./libs/mongodb";
import { guardarEnJSON } from "./libs/handleJSON";

function getProducts (){
    const data = async () => {
            try {
                const datos = await fetch('http://localhost:3000/api/products');
        
                if(!datos.ok) throw TypeError('Error al obtener los productos')
                
                const dbProducts = await datos.json();

                if(dbProducts) guardarEnJSON(dbProducts,'products.json')
            } catch (error) {
                console.log(error)
            }
    }    

    data();
}


getProducts();