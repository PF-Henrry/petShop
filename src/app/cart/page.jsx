"use client";
import React, { useState, useEffect } from "react";
import { useProductStore } from "@/hooks/usePages";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CartShop.css";
import {
  ArrowRight,
  Cardholder,
  ShoppingCartSimple,
  Storefront,
  Trash,
  WarningCircle,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Tippy from "@tippyjs/react";

const Cart = () => {
  const cartProducts = useProductStore((state) => state.cartProducts);
  const updateOrderState = useProductStore((state) => state.updateOrderState);
  const [total, setTotal] = useState(0);

  const calculateTotal = (cartProducts) => {
    return cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  useEffect(() => {
    setTotal(calculateTotal(cartProducts));
  }, [cartProducts]);

  const removeFromCart = (product) => {
    const updatedCart = useProductStore
      .getState()
      .cartProducts.filter((p) => p.id !== product.id);
    useProductStore.setState({ cartProducts: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (product, newQuantity) => {
    const updatedCart = useProductStore.getState().cartProducts.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: newQuantity };
      }
      return p;
    });
    useProductStore.setState({ cartProducts: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    useProductStore.setState({ cartProducts: [] });
    localStorage.removeItem("cart");
  };

  const { data: session } = useSession();

  const userID = session?.user?.id;

  const handleCheckout = async () => {
    try {
      if (!userID) {
        console.error("No se pudo obtener el userID de la sesión");
        return;
      }

      const totalAmount = calculateTotal(cartProducts);

      const products = cartProducts.map((product) => ({
        _id: product.id,
        name: product.name,
        price: product.price,
        count: product.quantity,
      }));

      const response = await fetch("/api/mercadopago/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, products, totalAmount }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la orden");
      }

      const result = await response.json();

      updateOrderState({
        orderID: result.id,
        status: "pending",
      });

      window.location.href = result.url;
      clearCart();
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocurrió un error al procesar la orden, inténtelo nuevamente"
      );
    }
  };

  const priceFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const formatedTotal = priceFormatter.format(total);

  return (
    <div className="cart-container">
      <h2 className="cart-title">
        Carrito de Compras <ShoppingCartSimple size={40} />
      </h2>
      {cartProducts.length === 0 ? (
        <div className="empty-cart">
          <p className="empty-cart-text">
            El carrito está vacío
            <Tippy content="Debe agregar productos al carrito">
              <WarningCircle size={32} />
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
        <div className="cart-items">
          {cartProducts.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              priceFormatter={priceFormatter}
            />
          ))}
          <span className="total-price">
            <p>Precio Total: {formatedTotal} ARS</p>
            <button onClick={handleCheckout} className="finish-button">
              <p>Ir a Pagar</p>
              <span>
                <ArrowRight size={32} />
                <Cardholder size={32} />
              </span>
            </button>
          </span>
        </div>
      )}
    </div>
  );
};

const CartItem = ({
  product,
  removeFromCart,
  updateQuantity,
  priceFormatter,
}) => {
  const handleRemove = () => {
    removeFromCart(product);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      updateQuantity(product, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <span className="item-info-container">
        <figure>
          <Link href={`/shop/${product.id}`}>
            <Image
              src={product.image}
              alt={product.name}
              width={150}
              height={150}
            />
          </Link>
        </figure>
        <section className="item-info">
          <p className="item-category">
            {product?.category ||
              (product?.category && product?.category[0]?.name)}
          </p>
          <Link href={`/shop/${product.id}`}>
            <p className="item-name">{product.name}</p>
          </Link>
          <p className="item-brand">
            {product?.brand || (product?.brand && product?.brand[0]?.name)}
          </p>
          <p className="item-price">
            {priceFormatter.format(product.price)} ARS
          </p>
        </section>
      </span>
      <label className="item-quantity">
        <p className="quantity-label">Cantidad:</p>
        <select value={product.quantity} onChange={handleQuantityChange}>
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleRemove} className="remove-item-button">
        <X size={30} weight="bold" className="remove-icon-x remove-icon" />
        <Trash
          size={30}
          weight="bold"
          className="remove-icon-trash remove-icon"
        />
      </button>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Cart;
