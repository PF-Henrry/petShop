import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";



function MyActivity({id}){
const [data,setData] = useState(null);
const router = useRouter();

useEffect(()=>{
    const getOrders = async () => {
        try {
            const res =  await fetch(`api/users/carts?id=${id}`);
             if(!res.ok) throw TypeError('Error al obtener los datos');
             const newData = await res.json();
             console.log(newData);


            setData(newData);

        } catch (error) {
            
            console.log(error)

        }


    }

    getOrders();
},
[id]);

const handleOnClick = (link) => {
    router.push(link);
}
return (
<section className="flex gap-4">
    {
        data && data.map((order) => (
            <div key={order._id} onClick={()=> handleOnClick(order.link)}>
                    <h3>ID del carrito: {order._id} </h3>
                    <h3>Status: {order.status} </h3>
                    <h3>Productos</h3>
                    {
                        order.items.map((product)=>(
                            <>
                            <h5>{product.name}</h5>
                            <h5>{product.price}</h5>
                            </>
                        ))
                    }
            </div>
        ))
    }
</section>
)

}



export default MyActivity