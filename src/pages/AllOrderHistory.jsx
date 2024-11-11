import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import { jwtDecode } from "jwt-decode"; // Correct import for jwtDecode
import AddOrderModal from "../components/AddOrderModal"; // Import the modal

const AllOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [userEmail, setUserEmail] = useState("");
  const [filter, setFilter] = useState("all"); // Filter state for paid/unpaid
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 20; // Number of orders per page

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserEmail(decodedToken.email);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backend}/api/v1/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setOrders(response.data);
    } catch (err) {
      setError("Failed to load orders");
    }
  };

  const handleOrderCreated = (newOrder) => {
    setOrders([newOrder, ...orders]);
  };

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

  const sortedOrders = [...orders]
    .filter((order) => (filter === "all" ? true : order.status === filter))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Calculate the current page orders
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  return (
    <div className="w-full px-5 py-10 bg-white mt-20">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 rounded-3xl px-8 py-2 text-white 2 font-bold mb-4"
      >
        Add Order
      </button>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${filter === "all" ? "bg-green-500 rounded-3xl px-8 py-1 text-white" : "bg-gray-300 rounded-3xl px-8 py-1"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("paid")}
          className={`px-4 py-2 rounded ${filter === "paid" ? "bg-green-500 rounded-3xl px-8 py-1 text-white" : "bg-gray-300 rounded-3xl px-8 py-1"}`}
        >
          Paid
        </button>
        <button
          onClick={() => setFilter("unpaid")}
          className={`px-4 py-2 rounded ${filter === "unpaid" ? "bg-green-500 rounded-3xl px-8 py-1 text-white" : "bg-gray-300 rounded-3xl px-8 py-1"}`}
        >
          Unpaid
        </button>
      </div>

      {isAuthenticated && userEmail === "admin@gmail.com" ? (
        <>
          <AddOrderModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onOrderCreated={handleOrderCreated}
          />
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
                    Phone
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
                {currentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                      {order.MUID.slice(-5)}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                      {order.shippingInfo.name}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                      {order.shippingInfo.phone}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                      {order.shippingInfo.address +
                        ", " +
                        order.shippingInfo.city +
                        ", " +
                        order.shippingInfo.postalCode}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                      {order.items.map((item, index) => (
                        <div key={index}>
                          {item.name} (x{item.quantity}) - ₹{item.price}
                        </div>
                      ))}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                      ₹{order.amount / 100}
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
              Loading order history...
            </p>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-xl">
          You are not authorized to view this page.
        </p>
      )}
    </div>
  );
};

export default AllOrderHistory;
