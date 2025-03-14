import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [electronics, setElectronics] = useState([]); // Store Electronics category products
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    "Banner 1 (Sale)",
    "Banner 2 (Special Offer)",
    "Banner 3 (Limited Time Deal)",
  ]; // Placeholder text, replace with image URLs later

  useEffect(() => {
    // Fetch categories
    setCategories(["Electronics", "Clothing", "Home", "Beauty", "Books", "Sports"]);

    // Fetch products from backend
    axios.get("http://localhost:8080/products")
      .then(response => {
        const groupedProducts = response.data.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {});
        setProductsByCategory(groupedProducts);

        // Extract only Electronics category
        if (groupedProducts["Electronics"]) {
          setElectronics(groupedProducts["Electronics"].slice(0, 12));
        }
      })
      .catch(error => console.error("Failed to load products:", error));
  }, []);

  // Auto-slide effect for the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Sidebar + Carousel (Row Layout) */}
      <div className="sidebar-carousel-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Shop by Category</h2>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                <a href={`/category/${category.toLowerCase()}`}>{category}</a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="carousel-container">
          <h2>Sale</h2>
          <div className="carousel">
            <div className="carousel-item">{banners[currentSlide]}</div>
          </div>
        </div>
      </div>

      {/* Product Listings */}
      <div className="product-sections">
        {Object.keys(productsByCategory).map((category, index) => (
          <div key={index} className="category-section">
            <h2>Shop {category}</h2>
            <div className="product-grid">
              {productsByCategory[category].slice(0, 12).map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">[Image Placeholder]</div>
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">${product.price}</p>
                </div>
              ))}
            </div>
            <a href={`/category/${category.toLowerCase()}`} className="view-more">
              View More
            </a>
          </div>
        ))}
      </div>

      {/* <div className="electronics-section">
        <h2>Shop Electronics</h2>
        <div className="product-grid">
          {electronics.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">[Image Placeholder]</div>
              <p className="product-name">{product.name}</p>
              <p className="product-price">${product.price}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Home;
