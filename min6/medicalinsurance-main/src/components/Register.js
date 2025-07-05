import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8000/register", {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });

      setSuccessMessage("Registration successful!");
      setErrorMessage("");

      // Redirect to login after 1.5 seconds
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register Here</h2>
        
        <label className="input-label">Username</label>
        <input
          type="text"
          className="input-box"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
          required
        />

        <label className="input-label">Email</label>
        <input
          type="email"
          className="input-box"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />

        <label className="input-label">Password</label>
        <input
          type="password"
          className="input-box"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />

        <label className="input-label">Confirm Password</label>
        <input
          type="password"
          className="input-box"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />

        <div className="button-container">
          <button type="submit" className="register-btn">Register</button>
          <button type="button" className="login-btn" onClick={() => navigate("/")}>
            Login
          </button>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};
export default Register;
