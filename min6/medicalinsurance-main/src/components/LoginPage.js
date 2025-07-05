import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigation function
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  const API_BASE_URL = "http://localhost:8000/login";  // ✅ Use network IP

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_BASE_URL, {
        username,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (response.status === 200) {
        navigate("/input");
      }
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };
  


  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="welcome-text">Welcome back!</h2>
        <label className="input-label">Username</label>
        <input
          type="text"
          className="input-box"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Type your Username *"
        />
        <label className="input-label">Password</label>
        <input
          type="password"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password *"
        />
        <div className="login-options">
          <button 
            type="button" 
            onClick={(e) => e.preventDefault()} 
            className="forgot-password"
          >
            Forgot Password?
          </button>

        </div>
        <div className="button-container">
          <button className="login-btn" onClick={handleLogin}>Login Here</button>
          <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="login-image">
        <img src={`${process.env.PUBLIC_URL}/images/health_insurance1.png.jpg`} alt="Health Insurance Illustration" />
      </div>
    </div>
  );
};

export default LoginPage;
