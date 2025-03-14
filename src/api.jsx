import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

// Fetch all products
export const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };  

// Fetch products by ID
export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

//Handle user login 
export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };  

//Get user profile
export const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("Token stored in localStorage:", token);  // Check if the token is stored
    if (!token) {
        console.error("No token found! User might not be logged in.");
        return null;
    }

    try {
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
        throw error;
    }
};


// Add product
export const addProduct = async (productData) => {
const token = localStorage.getItem("token");
const response = await fetch("http://localhost:8080/products", {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
});

if (!response.ok) {
    throw new Error("Failed to add product");
}

return response.json();
};

// Delete porduct
export const deleteProduct = async (productId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  
    return response.json();
  };
  
  
// Fetch products by category
export const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(`${API_URL}/products/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      throw error;
    }
  };

// Function to add an item to the cart (requires token)
export const addToCart = async (token, productId, quantity) => {
  try {
    const response = await axios.post(
      `${API_URL}/cart/add`,
      { product_id: productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

// Function to view cart items (requires token)
export const viewCart = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/cart/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

// Function to remove an item from the cart 
export const removeFromCart = async (token, productId) => {
  try {
    const response = await axios.delete(`${API_URL}/cart/remove/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

// Function to checkout (requires token)
export const checkout = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/cart/checkout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};

//Register User
export const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };
  