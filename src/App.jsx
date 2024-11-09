import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import AboutPage from "/src/pages/AboutUs";
import ProductsShowcase from "./components/ProductsShowcase";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import { AuthProvider } from "./components/AuthContext";
import { ProfilePage } from "./components/ProfilePage";
import ProductDescription from "./components/ProductDescription";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AllOrderHistory from "./pages/AllOrderHistory";
import "./App.css";
import ForgotPassword from "./components/ForgotPassword";
// import ResetPassword from "./components/ResetPassword";
import ShippingPolicy from "./pages/Shipping";
import RefundPolicy from "./pages/Refund";
import CancellationReturnRefundPolicy from "./pages/Cancellation";
import TermsConditions from "./pages/Terms";
import PrivacyPolicy from "./pages/Privacy";
import Payment from "./pages/Payment";
import PaymentStatusPage from "./pages/Status";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/shop" element={<Shop />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<ProductsShowcase />} />
            <Route path="/products/:id" element={<ProductDescription />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/allorders" element={<AllOrderHistory/>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* <Route path="/reset-password" element={<ResetPassword />} /> */}


            <Route path="/login" element={<Login />} />
            <Route path="/signup-page" element={<Signup />} />
            <Route path="/profile-page" element={<ProfilePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/cancellation-policy" element={<CancellationReturnRefundPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/payment/:totalAmount" element={<Payment />} />
            <Route path="/status/:transactionId" element={<PaymentStatusPage />} />

          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
