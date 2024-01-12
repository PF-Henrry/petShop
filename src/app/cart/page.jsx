"use client";
import React, { useState, useEffect } from "react";
import { useProductStore } from "@/hooks/usePages";

import Image from "next/image";
import { useSession } from "next-auth/react";
import "./CartShop.css";
import {
  ArrowRight,
  Cardholder,
  CaretRight,
  Info,
  ShoppingCartSimple,
  Storefront,
  Trash,
  WarningCircle,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { useRouter } from "next/navigation";
import { Breadcrumbs, Typography } from "@mui/material";

const Cart = () => {
  const cartProducts = useProductStore((state) => state.cartProducts);
  const updateOrderState = useProductStore((state) => state.updateOrderState);
  const [total, setTotal] = useState(0);
  const [showInsufficientStockMessage, setShowInsufficientStockMessage] =
    useState(false);

  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status !== "authenticated") {
        // Si no se ha iniciado sesión, borra el ítem del localStorage
        useProductStore.setState({ cartProducts: [] });
        localStorage.removeItem("cart");
        router.push("/login");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [status, router]);

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
  const updateDeliveryMethod = (product, newDeliveryMethod) => {
    const updatedCart = useProductStore.getState().cartProducts.map((p) => {
      if (p.id === product.id) {
        return { ...p, deliveryMethod: newDeliveryMethod };
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

  const userID = session?.user?.id;

  const handleDeliveryMethodChange = (event) => {
    const newDeliveryMethod = event.target.value;
    const updatedCart = cartProducts.map((p) => ({
      ...p,
      deliveryMethod: newDeliveryMethod,
    }));
    useProductStore.setState({ cartProducts: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = async () => {
    try {
      if (!userID) {
        console.error("No se pudo obtener el userID de la sesión");
        return;
      }

      const insufficientStockProduct = cartProducts.find(
        (product) => product.quantity > product.stock
      );

      if (insufficientStockProduct) {
        setShowInsufficientStockMessage(true);
        setShowInsufficientStockMessage(
          `No hay suficiente stock para el producto: ${insufficientStockProduct.name}. Stock disponible: ${insufficientStockProduct.stock}`
        );

        return;
      }

      const totalAmount = calculateTotal(cartProducts);

      const products = cartProducts.map((product) => ({
        _id: product.id,
        name: product.name,
        price: product.price,
        count: product.quantity,
      }));

      const address =
        cartProducts.length > 0 ? cartProducts[0].deliveryMethod : {};

      const response = await fetch("/api/mercadopago/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID, products, totalAmount, address }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la orden");
      }

      const result = await response.json();

      updateOrderState({
        orderID: result.id,
        status: "pending",
      });

      clearCart();
      window.location.href = result.url;
    } catch (error) {
      console.error(error);
    }
  };

  const priceFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  const handleCloseInsufficientStockMessage = () => {
    setShowInsufficientStockMessage(false);
    setShowInsufficientStockMessage("");
  };

  const formatedTotal = priceFormatter.format(total);

  return (
    <div className="cart-container">
      {showInsufficientStockMessage && (
        <div className="insufficient-stock-message bg-red-500 text-white p-4 mb-4 rounded flex items-center">
          <p className="flex-grow">{showInsufficientStockMessage}</p>
          <button
            onClick={handleCloseInsufficientStockMessage}
            className="close-message-button"
          >
            <X size={20} color="white" />
          </button>
        </div>
      )}

      <div className="nav-breadcrumbs">
        <Breadcrumbs
          separator={<CaretRight size={15} />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="inherit" href="/">
            Inicio
          </Link>
          <Link underline="hover" color="inherit" href="/shop">
            Tienda
          </Link>
          <Typography color="text.primary">Favoritos</Typography>
        </Breadcrumbs>
      </div>
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
              updateDeliveryMethod={updateDeliveryMethod}
            />
          ))}
          <label className="item-delivery-method">
            <p className="item-delivery-method-title">Método de entrega:</p>
            <p className="item-delivery-method-text">
              Si no selecciona un método de entrega, el pedido se retirará en la
              tienda.
            </p>

            <select
              onChange={handleDeliveryMethodChange}
              value={
                cartProducts.length > 0 ? cartProducts[0].deliveryMethod : ""
              }
              className="item-delivery-method-select"
            >
              <option value="Retiro en tienda">
                Retiro en tienda (lun a sab de 9 a 21h)
              </option>
              <option value="Envío gratis">
                Envío gratis (lun a sab de 9 a 21hs)
              </option>
            </select>
            <span className="item-delivery-method-info">
              <Info size={15} />
              Para envíos fuera de CABA, seleccione retiro en tienda y{" "}
              <Link
                href="https://api.whatsapp.com/send?phone=TUNUMERO&text=Hola%2C%20quiero%20coordinar%20el%20envio%20de%20una%20compra%20fuera%20de%20CABA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex text-blue-500 hover:underline"
              >
                {" "}
                contactarse con el vendedor{" "}
              </Link>{" "}
              dentro de las 24hs.
            </span>
          </label>
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

      <label className=" item-quantity">
        <p className="quantity-label">Cantidad:</p>
        <select value={product.quantity} onChange={handleQuantityChange}>
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </label>

      <button onClick={handleRemove} className=" remove-item-button">
        <X size={30} weight="bold" className="remove-icon-x remove-icon" />
        <Trash
          size={30}
          weight="bold"
          className="remove-icon-trash remove-icon"
        />
      </button>

      {/*Div para responsive*/}
      <div className="cart-item-responsive">
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
      </div>
    </div>
  );
};

export default Cart;
