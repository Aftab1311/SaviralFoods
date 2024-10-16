import { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, Loader2, Package, ShoppingCart } from "lucide-react";
import { convertImageToBase64 } from "../utils";
import ProductForm from "./ProductForm";

const Dashboard = () => {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isGridVisible, setGridVisible] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backend}/api/v1/products`);
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${backend}/api/v1/orders`);
      setOrders(response.data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const toggleGridVisibility = () => {
    if (!isGridVisible && products.length === 0) {
      fetchProducts();
    }
    setGridVisible(!isGridVisible);
  };

  const openPopup = (product = null) => {
    setCurrentProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentProduct(null);
  };

  const deleteProduct = async (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${backend}/api/v1/products/${product._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Sort orders by createdAt date, most recent first
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="bg-gray-100 min-h-screen mb-0">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-700 flex items-center">
                <Package className="mr-2 text-blue-500" /> Products
              </h2>
              <button
                onClick={() => openPopup()}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center transition duration-300 shadow-md hover:shadow-lg"
              >
                <PlusCircle className="mr-2" /> Add Product
              </button>
            </div>
            
            <button
              onClick={toggleGridVisibility}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition duration-300 shadow-md hover:shadow-lg"
            >
              {isGridVisible ? "Hide Products" : "Show Products"}
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center">
              <ShoppingCart className="mr-2 text-green-500" /> Recent Orders
            </h2>
            <p className="text-gray-600 text-lg">Total Orders: <span className="font-bold text-green-500">{orders.length}</span></p>
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-500" size={48} />
          </div>
        )}

        {isGridVisible && !loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {products.map((item) => (
              <div key={item._id} className="bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                <div className="relative w-full pb-[100%]">
                  <img
                    src={convertImageToBase64(item.Image)}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.quantityPrices[0].quantity}: ₹{item.quantityPrices[0].price}
                  </p>
                  <p className="text-sm text-gray-600">Stock: {item.countInStock}</p>
                  <div className="flex justify-between mt-4 gap-2">
                    <button
                      onClick={() => openPopup(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg w-full transition duration-300 shadow-md hover:shadow-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(item)}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg w-full transition duration-300 shadow-md hover:shadow-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-700 p-6 bg-gray-50">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">{order._id}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">{order.user}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">₹{order.totalPrice}</td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-sm text-center">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <ProductForm
          product={currentProduct}
          closePopup={closePopup}
          refreshProducts={fetchProducts}
        />
      )}
    </div>
  );
};

export default Dashboard;
