import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ProductCategory from "./components/pages/ProductCategory";
import Footer from "./components/Footer";
import ShopCart from "./components/pages/ShopCart";
import CheckOut from "./components/pages/CheckOut";
import Shop from "./components/pages/Shop";
import Contact from "./components/pages/Contact";
import LoginSignupPage from "./components/pages/LoginSignupPage";
import Preloader from "./components/pages/Preloader";
import ProductListing from "./components/pages/ProductListing";
import CategoryPage from "./components/pages/Category";
import ProductDetails from "./components/pages/ProductDetalis";
import Cart from "./components/pages/Cart";
import { CartProvider } from "./components/pages/CartContext";
import OrderSummary from "./components/pages/OrderSummary";
import AdminDashboard from "./components/pages/AdminDashboard";
import { AuthProvider } from "./components/pages/AuthContext"; // Import AuthProvider
import ErrorBoundary from "./components/pages/ErrorBoundary"; // Import ErrorBoundary

function App() {
  useEffect(() => {
    console.log("Backend API URL:", import.meta.env.VITE_API_URL);
  }, []);
  library.add(fas, fab);

  const [loading, setLoading] = useState(true); // Show preloader first
  const [showLogin, setShowLogin] = useState(false); // Show login/signup after delay

  useEffect(() => {
    // Step 1: Show preloader for 2 seconds
    const preloaderTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Step 2: Show Login/Signup after 3 seconds (1 sec after website appears)
    const loginTimeout = setTimeout(() => {
      setShowLogin(true);
    }, 3000);

    // Cleanup timeouts to avoid memory leaks
    return () => {
      clearTimeout(preloaderTimeout);
      clearTimeout(loginTimeout);
    };
  }, []);

  return (
    <ErrorBoundary>
      {loading ? (
        <Preloader /> // Show preloader first
      ) : (
        <AuthProvider>
          <CartProvider>
            <Router>
              <Navbar />
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/pages/LoginSignupPage" element={<LoginSignupPage />} />
                <Route path="/pages/ProductCategory" element={<ProductCategory />} />
                <Route path="/products" element={<ProductListing />} />
                <Route path="/pages/ShopCart" element={<ShopCart />} />
                <Route path="/pages/CheckOut" element={<CheckOut />} />
                <Route path="/pages/Shop" element={<Shop />} />
                <Route path="/pages/Contact" element={<Contact />} />
                <Route path="/product/:productId" element={<ProductDetails />} />
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/pages/Cart" element={<Cart />} />
                <Route path="/pages/OrderSummary" element={<OrderSummary />} />
                <Route path="/pages/AdminDashboard" element={<AdminDashboard />} />
              </Routes>
              <Footer />
            </Router>
          </CartProvider>
        </AuthProvider>
      )}

      {/* Render LoginSignupPage conditionally */}
    
    </ErrorBoundary>
  );
}

export default App;