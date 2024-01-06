

'use client'
import React, { useState, useEffect } from 'react';
import { useProductStore } from '@/hooks/usePages';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    const updatedCart = useProductStore.getState().cartProducts.filter((p) => p.id !== product.id);
    useProductStore.setState({ cartProducts: updatedCart });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (product, newQuantity) => {
    const updatedCart = useProductStore.getState().cartProducts.map((p) => {
      if (p.id === product.id) {
        return { ...p, quantity: newQuantity };
      }
      return p;
    });
    useProductStore.setState({ cartProducts: updatedCart });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    useProductStore.setState({ cartProducts: [] });
    localStorage.removeItem('cart');
  };

  const { data: session } = useSession(); 
 
  const userID = session?.user?.id;

  const handleCheckout = async () => {
    try {
      if (!userID) {
        console.error('No se pudo obtener el userID de la sesión');
        return;
      }
  
      const totalAmount = calculateTotal(cartProducts); 
  
      const products = cartProducts.map((product) => ({
        "_id": product.id,
        "name": product.name,
        "price": product.price,
        "count": product.quantity,
      }));
  
      const response = await fetch('/api/mercadopago/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, products, totalAmount }), 
      });
  
      if (!response.ok) {
        throw new Error('Error al crear la orden');
      }
  
      const result = await response.json();
  
      updateOrderState({
        orderID: result.id,
        status: 'pending',
      });
  
      window.location.href = result.url;
      clearCart();
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al procesar la orden, inténtelo nuevamente');
    }
  };
  
 

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cartProducts.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {cartProducts.map((product) => (
            <CartItem
              key={product.id}
              product={product}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          ))}
          <p>Total: {total} ARS</p>
         
          <button onClick={handleCheckout}>Finalizar Compra</button>
        </div>
      )}
    </div>
  );
};

const CartItem = ({ product, removeFromCart, updateQuantity }) => {
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
    <div>
      <Image src={product.image} alt={product.name} width={150} height={150} />
      <p>{product.name}</p>
      <p>{product.price} ARS</p>
      <label>
        Cantidad:
        <select value={product.quantity} onChange={handleQuantityChange}>
          {[...Array(10).keys()].map((num) => (
            <option key={num + 1} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleRemove}>❌</button>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Cart;