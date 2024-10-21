import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';

import { CartProvider } from "./components/CartContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <GoogleOAuthProvider clientId="475066283426-su0qlbab5kfueg0bng5d32io6ca3ulln.apps.googleusercontent.com">
    <CartProvider>
      <App />
    </CartProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
