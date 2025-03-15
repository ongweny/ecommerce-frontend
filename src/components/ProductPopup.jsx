import React from "react";
import "../App.css"

const ProductPopup = ({ product, onClose }) => {
  if (!product) return null;

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  // Function to handle saving item
  const handleSaveItem = () => {
    let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
    if (!savedItems.some((item) => item.id === product.id)) {
      savedItems.push(product);
      localStorage.setItem("savedItems", JSON.stringify(savedItems));
      alert("Product saved!");
    } else {
      alert("Item is already saved.");
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={(e) => e.stopPropagation()}>
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>{product.description}</p>
        <div className="popup-buttons">
          <button onClick={handleAddToCart}>Add to Cart</button>
          <button onClick={handleSaveItem}>Save Item</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
