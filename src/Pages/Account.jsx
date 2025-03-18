import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, addProduct, fetchProducts, deleteProduct } from "../api";
import "../App.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState("profile");
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 Added search term
  const navigate = useNavigate();
  const [image, setImage] = useState(null); // ✅ Store uploaded image
  const [preview, setPreview] = useState(null); // ✅ Image preview
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Ensure category is stored


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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // ✅ Show preview
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);  // Ensure these fields exist
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image); // imageFile should be the File object from input
    
    console.log("📦 FormData contents:", Object.fromEntries(formData.entries())); // Debugging
  
    try {
      await addProduct(formData);
      alert("Product added successfully!");
  
      // Reset form fields
      setName("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("❌ Error adding product:", error);
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

  // 🔍 Filter products by search term (name or category)
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <input 
                  type="text" 
                  placeholder="Product Name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <input 
                  type="number" 
                  placeholder="Price" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                <input 
                  type="text" 
                  placeholder="Category" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />

                <textarea 
                  placeholder="Description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>


              <label className="image-upload">
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <span>Drag and Drop or Click to Upload</span>
              </label>
              {preview && <img src={preview} alt="Preview" className="image-preview" />}

              <button type="submit">Add Product</button>
            </form>
          </div>
        )}

        {selectedSection === "viewProducts" && (
          <div>
            <h2>All Products</h2>
            {/* 🔍 Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* 📌 Display Products in Grid Layout */}
            <div className="product-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className="product-item">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Category: {product.category}</p>
                    <p>Price: ${product.price}</p>
                    <button onClick={() => handleDeleteProduct(product.id)}>Remove Product</button>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
