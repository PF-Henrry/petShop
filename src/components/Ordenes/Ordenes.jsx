import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CaretDown,
  ShoppingBagOpen,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";

export default function Ordenes({ id }) {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch(`api/users/carts?id=${id}`);
        if (!res.ok) throw TypeError("Error al obtener los datos");
        const newData = await res.json();
        console.log(newData);

        setData(newData);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, [id]);

  const handleOnClick = (link) => {
    router.push(link);
  };

  const priceFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("es-AR", options);
  };

  console.log(data);
  return (
    <section className="orden-container">
      { data && data.map((order, index) => (
        <div key={index} className="orden-card">
          <section className="orden-info-container">
            <span className="orden-header">
              <p className="orden-number">Pedido {index + 1}</p>
              <p className="orden-date">Creado: {formatDate(order.fecha)} </p>
            </span>
            <span className="orden-pago">
              <p className="orden-pago-title">Pago:</p>
              <section>
                {order.status === false ? (
                  <span className="orden-pago-pendiente">
                    <p>Pendiente</p>
                    <WarningCircle size={20} />
                  </span>
                ) : (
                  <span className="orden-pago-completado">
                    <p>Completado</p>
                  </span>
                )}
              </section>
            </span>

            <div className="orden-button-container">
              {order.status === false && (
                <Link href={order?.link || '/'}>
                  <p>Ver pedido</p>
                  <span>
                    <ArrowRight size={32} />
                    <ShoppingBagOpen size={32} />
                  </span>
                </Link>
              )}
            </div>
          </section>

          <details className="orden-details">
            <summary className="orden-summary">
              Productos <CaretDown size={15} className="summary-caret" />
            </summary>
            <div className="orden-items">
              {order?.items?.map((product) => (
                <div key={product._id} className="card-order-item">
                  <Link href={`/shop/${product._id}`}>
                    <figure>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                      />
                    </figure>

                    <h5 className="item-name">{product.name}</h5>
                    <h5 className="item-price">
                      {priceFormatter.format(product.price)} ARS
                    </h5>
                  </Link>
                </div>
              ))}
            </div>
          </details>
        </div>
      ))}
    </section>
  );
}
