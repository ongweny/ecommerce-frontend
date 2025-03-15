import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, addProduct, fetchProducts, deleteProduct } from "../api";
import "../App.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState("profile");
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
        if (userProfile.role === "admin") {
          setSelectedSection("viewProducts");
          loadProducts();
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();

    const storedSavedItems = JSON.parse(localStorage.getItem("savedItems")) || [];
    setSavedProducts(storedSavedItems);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const loadProducts = async () => {
    try {
      const productList = await fetchProducts();
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
    };
  
    try {
      await addProduct(newProduct);
      loadProducts();
      e.target.reset();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProduct(productId);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const removeFromSaved = (id) => {
    const updatedSaved = savedProducts.filter((item) => item.id !== id);
    setSavedProducts(updatedSaved);
    localStorage.setItem("savedItems", JSON.stringify(updatedSaved));
  };

  return (
    <div className="account-container">
      <div className="account-sidebar">
        <ul>
          <li onClick={() => setSelectedSection("profile")}>Profile</li>
          {user?.role === "admin" ? (
            <>
              <li onClick={() => setSelectedSection("addProduct")}>Add Product</li>
              <li onClick={() => setSelectedSection("viewProducts")}>View Products</li>
            </>
          ) : (
            <>
              <li onClick={() => setSelectedSection("saved")}>Saved Items</li>
              <li onClick={() => setSelectedSection("orders")}>Previous Orders</li>
              <li className="delete" onClick={() => setSelectedSection("deleteAccount")}>
                Delete Account
              </li>
            </>
          )}
          <li className="logout" onClick={handleLogout}>
            Log Out
          </li>
        </ul>
      </div>

      <div className="account-content">
        {selectedSection === "profile" && user && (
          <div>
            <h2>Profile</h2>
            <p>
              <strong> {user.first_name} {user.last_name}</strong>
            </p>
            <p>
              <strong> {user.email}</strong>
            </p>
          </div>
        )}

        {selectedSection === "saved" && (
          <div>
            <h2>Saved Items</h2>
            {savedProducts.length > 0 ? (
              <ul className="saved-items-list">
                {savedProducts.map((product) => (
                  <li key={product.id}>
                    <p>{product.name} - ${product.price}</p>
                    <button onClick={() => removeFromSaved(product.id)}>Remove</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No saved items.</p>
            )}
          </div>
        )}

        {selectedSection === "addProduct" && (
          <div>
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct}>
              <input type="text" name="name" placeholder="Product Name" required />
              <input type="number" name="price" placeholder="Price" required />
              <textarea name="description" placeholder="Description" required></textarea>
              <button type="submit">Add Product</button>
            </form>
          </div>
        )}

        {selectedSection === "viewProducts" && (
          <div>
            <h2>All Products</h2>
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => handleDeleteProduct(product.id)}>Remove Product</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
