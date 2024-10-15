import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import AuthContext from "./AuthContext";
import Footer from "./Footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const backend = import.meta.env.VITE_APP_BACKEND_URL;
  const location = useLocation();
  const { mainPrice, discountPercentage } = location.state || {};
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    // Get JWT token from local storage
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        // Decode the token to get the user data
        const decodedToken = jwtDecode(token);
        setUserData(decodedToken);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  const { cartItems, clearCart, getCartTotal } = useContext(CartContext);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  // Function to handle checkout submission
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Please sign in to complete your purchase.");
      navigate("/login");
      return;
    }

    // Validate shipping info
    const { name, address, city, postalCode } = shippingInfo;
    if (!name || !address || !city || !postalCode) {
      setError("Please fill out all shipping information.");
      return;
    }

    const orderDetails = {
      userId: userData.email,  // Replace with the actual user ID
      cartItems: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      shippingInfo,
      totalPrice: mainPrice,
      discount: discountPercentage,
    };

    try {
      // Make a POST request to create the order
      const response = await axios.post(`${backend}/api/v1/orders`, orderDetails);
      alert("Order placed successfully:");

      // Clear the cart and navigate to the payment confirmation page
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Failed to place the order. Please try again.");
    }
  };

  // Calculate total price after discount
  const totalPrice = getCartTotal() * (1 - (discountPercentage / 100));

  return (
    <div className="checkout w-full pt-16 bg-[#F5F5F5]">
      <div className="checkout-container w-full px-5 pt-12 mb-10">
        <h1 className="text-5xl tracking-tight font-semibold">CHECKOUT</h1>
        <div className="w-full flex flex-col md:flex-row gap-6 mt-6">
          <div className="checkout-info w-full md:w-[70%] p-5 bg-white border border-[#dadada] rounded-xl">
            <h2 className="text-2xl font-medium mb-4">SHIPPING INFORMATION</h2>
            <form onSubmit={handleCheckout}>
              <div className="flex flex-col mb-4">
                <label htmlFor="name" className="font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleChange}
                  className="p-2 border border-[#dadada] rounded-md"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="address" className="font-medium mb-1">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleChange}
                  className="p-2 border border-[#dadada] rounded-md"
                  placeholder="123 Main St"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="city" className="font-medium mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleChange}
                  className="p-2 border border-[#dadada] rounded-md"
                  placeholder="Your City"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="postalCode" className="font-medium mb-1">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleChange}
                  className="p-2 border border-[#dadada] rounded-md"
                  placeholder="123456"
                />
              </div>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-full text-[#fff] font-medium bg-[#6ca300] hover:bg-[#347746] cursor-pointer"
              >
                Confirm & Pay
              </button>
            </form>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary w-full md:w-[30%] h-auto min-h-[300px] p-5 bg-white border border-[#dadada] rounded-xl">
            <h2 className="text-xl font-medium mb-4">Order Summary</h2>
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold mt-4">
                <span>Sub Total</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span>Discount ({discountPercentage}%)</span>
                <span className="text-green-500">
                  ₹{(getCartTotal() * (discountPercentage / 100)).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span>Grand Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
