import { useEffect, useState } from "react"
import { LoaderButton } from "../LoaderButton/LoaderButton";
import styles from "./buttton.module.css"


export const MercadoPagoButton = ({product})=> {

    const [url,setUrl] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const generateLink = async () => {
            setLoading(true);
            try {
                const preference = await fetch('api/buying',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product)
                })
            } catch (error) {
                console.log(error.message);
            }
        }

        generateLink();
    },[product]);

    return (
        <div>
          {loading ? (
            <button className={styles.button} disabled>
              <LoaderButton />
            </button>
          ) : (
            <a className={styles.button} href={url}>
              Comprar ahora
            </a>
          )}
        </div>
      );
    


}