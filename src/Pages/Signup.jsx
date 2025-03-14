import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // Assuming you have a register function

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password, first_name: firstName, last_name: lastName, phone_number: phoneNumber });
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="content">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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
        <button type="submit">Sign Up</button>
        <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
      </form>
     
    </div>
  );
};

export default Signup;
