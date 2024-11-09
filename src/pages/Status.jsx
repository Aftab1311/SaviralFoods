import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PaymentStatusPage = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const backend = import.meta.env.VITE_BACKEND_URL;

  // Helper function to get the query parameter (id in this case)
  const { transactionId } = useParams(); // Extract the id from the query params
  console.log(transactionId);

  const fetchPaymentStatus = async () => {
    try {
      if (transactionId) {
        // Fetch the payment status from the backend
        const transactionresponse = await axios.get(`${backend}/status`, {
          params: { id: transactionId },
        });
        const data2 = transactionresponse.data;
        setPaymentStatus(data2);
        if (data2.success) {
          localStorage.removeItem("cartItems");
        }
        // Fetch the order details using the transaction ID
        const response = await axios.get(
          `${backend}/neworder/${transactionId}`
        );
        const data = response.data;
        setOrderDetails(data);

        setTimeout(() => new Promise((resolve) => resolve()), 2000);
      }
    } catch (error) {
      console.error("Error fetching payment status:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentStatus();
  }, []);

  const handleClick = () => {
    localStorage.removeItem("cartItems");
    window.location.href = "/";
  };

  return loading ? (
    <div className="mt-40 flex justify-center items-center">
      Loading payment and order details...
    </div>
  ) : (
    <div className="container mx-auto p-4 mt-40">
      {paymentStatus?.success ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
          <h2 className="text-xl font-bold">Payment Successful!</h2>
          <p>Transaction ID: {transactionId} </p>
          <p>Amount Paid: {paymentStatus.amount / 100}</p>
          <p>Thank you for your purchase!</p>

          {/* Display order details */}
          {orderDetails && (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Order Details:</h3>
              <p>
                <strong>User ID:</strong> {orderDetails.user}
              </p>
              <p>
                <strong>Items:</strong>
              </p>
              <ul>
                {orderDetails.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <p>
                <strong>Shipping Info:</strong>{" "}
                <span>{orderDetails.shippingInfo.address}</span><span className="mx-2">{orderDetails.shippingInfo.city}</span><span>{orderDetails.shippingInfo.postalCode}</span>
              </p>
              <p>
                <strong>Total Amount:</strong> {orderDetails.amount / 100}
              </p>
            </div>
          )}
          
          <button className="w-[180px] rounded-3xl py-2 text-white bg-green-500 flex justify-center items-center my-4" onClick={handleClick}>
            Go to HomePage
          </button>
       
        </div>
      ) : (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <h2 className="text-xl font-bold">Payment Failed</h2>
          <p>Transaction ID: {transactionId}</p>
          <p>Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default PaymentStatusPage;
