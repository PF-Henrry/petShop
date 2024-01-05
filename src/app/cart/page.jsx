'use client'
import React, { useState, useEffect } from 'react';
import { useProductStore } from '@/hooks/usePages';
import Image from 'next/image';

const Cart = () => {
  const cartProducts = useProductStore((state) => state.cartProducts);
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
         
          <button>Finalizar Compra</button>
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
    </div>
  );
};

export default Cart;