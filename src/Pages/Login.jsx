import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.access_token);
      navigate("/account");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="content">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      </form>
   
    </div>
  );
};

export default Login;
