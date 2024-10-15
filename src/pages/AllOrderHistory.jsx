import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode

const AllOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const { isAuthenticated } = useContext(AuthContext);
  const backend = "http://localhost:8000";
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

  return (
    <div className="w-full px-5 py-10 bg-white mt-20">
      {isAuthenticated && userEmail === "admin@gmail.com" ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center">Order History</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {orders.length > 0 ? (
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Order ID</th>
                  <th className="border px-4 py-2">User</th>
                  <th className="border px-4 py-2">Items</th>
                  <th className="border px-4 py-2">Total Price</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-100 text-center">
                    <td className="border px-4 py-2">{order._id}</td>
                    <td className="border px-4 py-2">{order.user}</td>
                    <td className="border px-4 py-2">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.name} (x{item.quantity}) - ₹{item.price}
                        </div>
                      ))}
                    </td>
                    <td className="border px-4 py-2">₹{order.totalPrice}</td>
                    <td className="border px-4 py-2">{order.status}</td>
                    <td className="border px-4 py-2">
                      {new Date(order.createdAt).toLocaleString()}
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
