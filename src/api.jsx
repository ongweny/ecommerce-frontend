import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

// ✅ Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// ✅ Fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// ✅ Add product (supports image upload)
export const addProduct = async (productData) => {
  console.log("🚀 Preparing product data:", productData);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  const formData = new FormData();
  if (productData.name) formData.append("name", productData.name);
  if (productData.description) formData.append("description", productData.description);
  if (productData.price) formData.append("price", productData.price);
  if (productData.stock) formData.append("stock", productData.stock);
  if (productData.category) formData.append("category", productData.category);
  if (productData.tags) formData.append("tags", JSON.stringify(productData.tags));
  if (productData.image) formData.append("image_url", productData.image); // ✅ Ensuring correct field name

  // ✅ Debugging: Log FormData content
  console.log("📦 FormData contents:");
  for (let [key, value] of formData.entries()) {
    console.log(`📌 ${key}:`, value);
  }

  try {
    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("✅ Product added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to add product:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete product
export const deleteProduct = async (productId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  try {
    const response = await axios.delete(`${API_URL}/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete product:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    throw error;
  }
};

// ✅ Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Login user
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Get user profile
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found! User might not be logged in.");
    return null;
  }

  try {
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userData = response.data;
    return { ...userData, role: userData.is_admin ? "admin" : "user" };
  } catch (error) {
    console.error("Error fetching user profile:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Add to cart
export const addToCart = async (productId, quantity) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  try {
    const response = await axios.post(
      `${API_URL}/cart/add`,
      { product_id: productId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// ✅ View cart
export const viewCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// ✅ Remove from cart
export const removeFromCart = async (productId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  try {
    const response = await axios.delete(`${API_URL}/cart/remove/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

// ✅ Checkout
export const checkout = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized: No token found");

  try {
    const response = await axios.post(`${API_URL}/cart/checkout`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};
