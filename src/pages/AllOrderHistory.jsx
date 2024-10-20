import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode

const AllOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [userEmail, setUserEmail] = useState(""); // Store userEmail state

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage

    // Decode the token to extract the email
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserEmail(decodedToken.email); // Store email in state
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backend}/api/v1/orders`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        // Set all the orders without filtering by user email
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      }
    };

   
  

    // Fetch orders only if the user is authenticated
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="w-full px-5 py-10 bg-white mt-20">
      {isAuthenticated && userEmail === "admin@gmail.com" ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">Order History</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {orders.length > 0 ? (
            <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                    {order._id}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                    {order.shippingInfo.name}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                    {order.shippingInfo.address +
                      ", " +
                      order.shippingInfo.city +
                      ", " + order.shippingInfo.postalCode}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                  {order.items.map((item, index) => (
                      <div key={index}>
                        {item.name} (x{item.quantity}) - ₹{item.price}
                      </div>
                    ))}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                    ₹{order.totalPrice}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          ) : (
            <p className="w-full flex justify-center text-2xl font-bold my-10 text-[#592d1e]">
              No orders found for this user.
            </p>
          )}
        </>
      ) : (
        <p className="text-center text-xl">You are not authorized to view this page.</p>
      )}
    </div>
  );
};

export default AllOrderHistory;
