import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import InputForm from "./components/InputForm";
import Register from "./components/Register"; // Import Register component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} /> {/* Register Page */}
        <Route path="/input" element={<InputForm />} />
      </Routes>
    </Router>
  );
}

export default App;
