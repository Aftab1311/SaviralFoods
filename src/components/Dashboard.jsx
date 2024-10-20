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
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateCoupon = async (e) => {
    e.preventDefault();

    const couponData = { code, discountPercentage, expiryDate };

    console.log('Creating coupon:', couponData);

    try {
      const response = await fetch("http://localhost:8000/api/v1/coupons/create-coupon", {
      // const response = await fetch(`${backend}/api/v1/coupons/create-coupon`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(couponData),
      });

      console.log('Coupon response:', response);

      const data = await response.json();
      if (response.status === 201) {
        alert('Coupon created successfully');
        // Reset the form
        setCode('');
        setDiscountPercentage('');
        setExpiryDate('');
        fetchCoupons(); // Fetch updated coupons list
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error creating coupon:', error);
    }
  };

  // Function to fetch existing coupons
  const fetchCoupons = async () => {
    try {
      const response = await fetch(`${backend}/api/v1/coupons/get-coupons`);
      const data = await response.json();
      setCoupons(data.coupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const getCouponStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return {
      status: expiry >= today ? "Active" : "Expired",
      className: expiry >= today ? "text-green-500" : "text-red-500",
    };
  };

  // Fetch coupons when component loads
  useEffect(() => {
    fetchCoupons();
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
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
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

  // Sort orders by createdAt date, most recent first
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  

  console.log(orders);
  console.log(sortedOrders);

  return (
    <div className="bg-gray-100 min-h-screen mb-0 mt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Dashboard
        </h1>

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
            <p className="text-gray-600 text-lg">
              Total Orders:{" "}
              <span className="font-bold text-green-500">{orders.length}</span>
            </p>
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
              <div
                key={item._id}
                className="bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="relative w-full pb-[100%]">
                  <img
                    src={convertImageToBase64(item.Image)}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.quantityPrices[0].quantity}: ₹
                    {item.quantityPrices[0].price}
                  </p>
                  <p className="text-sm text-gray-600">
                    Stock: {item.countInStock}
                  </p>
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
        {/* recent order hsitory code start */}

        {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-700 p-6 bg-gray-50">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
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
          </div>
        </div> */}

        {/* recent order hsitory code end */}
        
        <div className="admin-dashboard max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard - Coupon Management</h1>

      {/* Create Coupon Form */}
      <form onSubmit={handleCreateCoupon} className="mb-6 p-4 border rounded-lg shadow-sm">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Coupon Code:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Discount Percentage:</label>
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Expiry Date:</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="w-full border rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Create Coupon
        </button>
      </form>

      {/* Display Existing Coupons */}
      <h2 className="text-xl font-bold mb-4">Existing Coupons</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Code</th>
            <th className="border border-gray-300 px-4 py-2">Discount %</th>
            <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => {
            const { status, className } = getCouponStatus(coupon.expiryDate);
            return (
              <tr key={coupon._id} className="border-b hover:bg-gray-50 text-center">
                <td className="border border-gray-300 px-4 py-2">{coupon.code}</td>
                <td className="border border-gray-300 px-4 py-2">{coupon.discountPercentage}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(coupon.expiryDate).toLocaleDateString()}
                </td>
                <td className={`border border-gray-300 px-4 py-2 ${className}`}>
                  {status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
