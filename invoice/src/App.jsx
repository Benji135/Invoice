// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import LoginForm from "./Pages/Login";
import SignupForm from "./Pages/Signup";
import InventoryManagement from "./Pages/InventoryManagement";
import CustomerReg from "./Pages/CustomerReg";
import CustomerProfile from "./Pages/CustomerProfile";
import Profile from "./Pages/Profile";
import InvoiceForm from "./Pages/InvoiceForm";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar.jsx";

// Wrapper to conditionally show Navbar
const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/signup"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {!hideNavbar && <Navbar />}
      <main className="flex-1 bg-gray-100 min-h-screen p-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* Protected Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/invoice" element={<InvoiceForm />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/customer-reg" element={<CustomerReg />} />
          <Route path="/customer-profile" element={<CustomerProfile />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
