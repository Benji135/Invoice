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
import Invoice from "./Pages/Invoice";
import InvoiceForm from "./Pages/InvoiceForm";
import InvoiceHistory from "./Pages/InvoiceHistory";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar.jsx";

// Wrapper to conditionally show Navbar
const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {!hideNavbar && <Navbar />}
      <main className="flex-1 bg-gray-100 min-h-screen p-6">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LoginForm />} />

          {/* Protected Routes */}
          <Route
            path="/signup"
            element={
              <ProtectedRoute>
                <SignupForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice-form"
            element={
              <ProtectedRoute>
                <InvoiceForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <InventoryManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-reg"
            element={
              <ProtectedRoute>
                <CustomerReg />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customer-profile"
            element={
              <ProtectedRoute>
                <CustomerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoice-history"
            element={
              <ProtectedRoute>
                <InvoiceHistory />
              </ProtectedRoute>
            }
          />
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