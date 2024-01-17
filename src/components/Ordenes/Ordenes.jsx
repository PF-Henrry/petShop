import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cardholder,
  CaretDown,
  CheckCircle,
  Storefront,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import Tippy from "@tippyjs/react";

export default function Ordenes({ id }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await fetch(`api/users/carts?id=${id}`);
        if (!res.ok) throw TypeError("Error al obtener los datos");
        const newData = await res.json();
        // console.log(newData);

        setData(newData);
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, [id]);

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

  // console.log(data);
  return (
    <section className="orden-container">
      {data?.length === 0 || data === null ? (
        <div className="orden-empty-container">
          <p className="empty-orden-text">
            No se encontraron pedidos
            <Tippy content="Haga algun pedido desde el carrito de compras.">
              <WarningCircle size={32} className="empty-orden-icon" />
            </Tippy>
          </p>
          <Link href="/shop" className="go-to-shop">
            <p>Ir a la tienda</p>
            <span>
              <ArrowRight size={32} />
              <Storefront size={32} />
            </span>
          </Link>
        </div>
      ) : (
        Array.isArray(data) &&
        data.length > 0 &&
        data.map((order, index) => (
          <div key={index} className="orden-card">
            <section className="orden-info-container">
              <span className="orden-header">
                <span className="orden-number">
                  <p className="orden-number-title">Pedido N.{index + 1}</p>
                  <p className="orden-id">#{order._id}</p>
                </span>
                <p className="orden-date">
                  Creado el {formatDate(order.fecha)}
                </p>
              </span>
              <span className="orden-pago">
                <p className="orden-pago-title">Pago:</p>
                <section>
                  {order.status === false ? (
                    <span className="orden-pago-pendiente">
                      <p>Pendiente</p>
                      <Tippy content="Todavía no se ha realizado el pago">
                        <WarningCircle size={20} className="icon-pendiente" />
                      </Tippy>
                    </span>
                  ) : (
                    <span className="orden-pago-completado">
                      <p>Completado</p>
                      <Tippy content="El pedido se ha completado">
                        <CheckCircle size={20} className="icon-completado" />
                      </Tippy>
                    </span>
                  )}
                </section>
              </span>

              <div className="orden-button-container">
                {order.status === false ? (
                  <Link href={order?.link}>
                    <p>Finalizar pedido</p>
                    <span>
                      <ArrowRight size={32} className="icon-pendiente" />
                      <Cardholder size={32} className="icon-pendiente" />
                    </span>
                  </Link>
                ) : (
                  <Tippy content="El pedido se ha completado" arrow={false}>
                    <p className="orden-completado-text">Pedido completado</p>
                  </Tippy>
                )}
              </div>
            </section>
            <span className="orden-total">
              {order.status === false ? (
                <p className="orden-total-pendiente">
                  Total a pagar:{" "}
                  {priceFormatter.format(
                    order?.items?.reduce((total, item) => {
                      const itemPrice = item.count * item.product.price;
                      return total + itemPrice;
                    }, 0)
                  )}{" "}
                  ARS
                </p>
              ) : (
                <p className="orden-total-completado">
                  Total pagado:{" "}
                  {priceFormatter.format(
                    order?.items?.reduce((total, item) => {
                      const itemPrice = item.count * item.product.price;
                      return total + itemPrice;
                    }, 0)
                  )}{" "}
                  ARS
                </p>
              )}
            </span>
            <details className="orden-details">
              <summary className="orden-summary">
                Productos:{" "}
                {order?.items
                  .map((item) => item.count)
                  .reduce((a, b) => a + b, 0)}{" "}
                <CaretDown size={15} className="summary-caret" />
              </summary>
              <div className="orden-items">
                {order?.items?.map(({ count, product }) => (
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
                      <span className="item-count"> Cantidad: {count}</span>
                    </Link>
                  </div>
                ))}
              </div>
            </details>
          </div>
        ))
      )}
    </section>
  );
}
