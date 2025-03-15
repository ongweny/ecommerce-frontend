import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="content">
      <h1>Your Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price} | Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
