import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from './components/pages/CartContext.jsx'; // Make sure to import CartProvider
import { AuthProvider } from "./components/pages/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </AuthProvider>
  </StrictMode>
);