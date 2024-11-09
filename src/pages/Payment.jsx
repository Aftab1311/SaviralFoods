import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Ensure this library is installed
import axios from "axios";

const Payment = () => {
  const { totalAmount } = useParams(); // Extract totalAmount from the URL parameters
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const backend = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Get shippingInfo from local storage
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo")) || {};
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  console.log(totalAmount, shippingInfo, cartItems);

  // Decode JWT token to get user details
  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Assuming you store the token in localStorage
    if (token) {
      const decoded = jwtDecode(token);
      setUserDetails(decoded);
    } else {
      setError("User not authenticated.");
    }
  }, []);

  // console.log(userDetails);


  const handleConfirmPayment = async () => {
    setLoading(true);
    setError(""); // Reset error state
   
    // Prepare the order details
    const orderDetails = {
      user: userDetails.email, // Assuming the user identifier is the email
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingInfo: {
        name: shippingInfo.name,
        address: shippingInfo.address,
        phone: shippingInfo.phone,
        city: shippingInfo.city,
        postalCode: shippingInfo.postalCode,
      },
      totalPrice: totalAmount, // The total amount from your payment route
      MUID: "M" + Date.now(),
      transactionId: "T" + Date.now(),
      status: '', // Set status to paid initially
    };
    // console.log(orderDetails);
  
    try {
      // Make a POST request to create the order
      const response = await axios.post(`${backend}/neworder`, orderDetails);
      if (response.data && response.data.data && response.data.data.instrumentResponse) {
        const redirectInfo = response.data.data.instrumentResponse.redirectInfo;
        
        if (redirectInfo && redirectInfo.url) {
          // Redirect the user to the payment gateway URL
          window.location.href = redirectInfo.url;
        } else {
          console.log("Redirect URL not found in the response");
          // Optionally, notify the user that payment initiation failed.
        }
      } else {
        console.log("Invalid response structure from payment gateway");
        // Optionally, notify the user of an error with payment initiation.
      }
      // console.log(response.data);
    } catch (error) {
      console.error("Payment failed:", error);
      setError("Payment failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  // Show error message if exists
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  // Show loading state while fetching user details
  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading user details...</div>
      </div>
    );
  }

  // Render user details and payment button
  return (
    <div className="payment w-full max-w-md mx-auto p-5 bg-white shadow-md rounded-lg mt-40">
      <h1 className="text-3xl font-bold mb-4">Payment Details</h1>
      <p className="font-medium mb-2">Name: <span className="text-gray-700">{userDetails.name}</span></p>
      <p className="font-medium mb-2">Email: <span className="text-gray-700">{userDetails.email}</span></p>
      <p className="font-medium mb-4">Amount to be Paid: <span className="text-green-600">₹{totalAmount}</span></p>

      {/* Display Shipping Information */}
      <h2 className="text-xl font-semibold mt-4">Shipping Information</h2>
      <p className="mb-2">Name: <span className="text-gray-700">{shippingInfo.name}</span></p>
      <p className="mb-2">Address: <span className="text-gray-700">{shippingInfo.address}</span></p>
      <p className="mb-2">Phone: <span className="text-gray-700">{shippingInfo.phone}</span></p>
      <p className="mb-2">City: <span className="text-gray-700">{shippingInfo.city}</span></p>
      <p className="mb-4">Postal Code: <span className="text-gray-700">{shippingInfo.postalCode}</span></p>

      {/* Display Cart Items */}
      <h2 className="text-xl font-semibold mt-4">Cart Items</h2>
      <ul className="mb-4">
        {cartItems.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <button 
          className={`w-full py-3 rounded-lg text-white font-semibold ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-300 ease-in-out`} 
          onClick={handleConfirmPayment}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Processing...' : 'Confirm Payment'}
        </button>
      </div>
    </div>
  );
};

export default Payment;
