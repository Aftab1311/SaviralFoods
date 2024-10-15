import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiStickyNoteAddFill } from "react-icons/ri";

import { convertImageToBase64 } from "../utils";

import ProductForm from "./ProductForm";

const Dashboard = () => {

  const backend =  import.meta.env.VITE_APP_BACKEND_URL ;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formDataValues, setFormDataValues] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [coupons, setCoupons] = useState([]);
  // const [Image1, setImage1] = useState(null);
  // const [Image2, setImage2] = useState(null);
  // const [Image3, setImage3] = useState(null);
  const [orders, setOrders] = useState([]);

  const [isGridVisible, setGridVisible] = useState(false);

  // Toggle grid visibility
  const toggleGridVisibility = () => {
    setGridVisible(!isGridVisible);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Fetch products from the API
    axios
      .get(`${backend}/api/v1/products`)
      .then((response) => {
        setProducts(response.data); // Adjust based on your actual API response format
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const openPopup = (product) => {
    setCurrentProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentProduct(null);
  };

  const deleteProduct = async (product) => {
    try {
      // Ensure to include the authentication token if required
      const response = await axios.delete(
        `${backend}/api/v1/products/${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Use localStorage or other method to get the token
          },
        }
      );

      // console.log(response.data);

      // Update the products state by filtering out the deleted product
      setProducts(products.filter((item) => item._id !== product._id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
      // Optionally display an error message to the user
    }
  };

  const handleImageChange = (e) => {
    if (e.target.name === "Image") {
      setMainImage(e.target.files[0]);
    }
    // if (e.target.name === "Image1") {
    //   setImage1(e.target.files[0]);
    // }
    // if (e.target.name === "Image2") {
    //   setImage2(e.target.files[0]);
    // }
    // if (e.target.name === "Image3") {
    //   setImage3(e.target.files[0]);
    // }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormDataValues({ ...formDataValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", formDataValues.name);
    formData.append("product_id", formDataValues.product_id);
    formData.append("desc", formDataValues.desc);
    formData.append("price", formDataValues.price);
    formData.append("category", formDataValues.category);
    formData.append("quantity", formDataValues.quantity);
    formData.append("countInStock", formDataValues.countInStock);
    if (mainImage) formData.append("Image", mainImage);
    // if (Image1) formData.append("Image1", Image1);
    // if (Image2) formData.append("Image2", Image2);
    // if (Image3) formData.append("Image3", Image3);

    try {
      // Make a POST request to create the product
      const response = await axios.post(
        `${backend}/api/v1/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status !== 201) {
        console.error("Failed to create product:", response.data);
        alert("Failed to create product");
        // Optionally display an error message to the user
      } else {
        console.log("Product created successfully:", response.data);

        // Update the products state with the new product
        setProducts([...products, response.data]);
        alert("Product created successfully");
        closeModal();
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert(error?.response?.data?.message ?? "Failed to create product");
      // Optionally display an error message to the user
    }
  };
  const handleCreateCoupon = async (e) => {
    e.preventDefault();

    const couponData = { code, discountPercentage, expiryDate };

    console.log('Creating coupon:', couponData);

    try {
      const response = await fetch("http://localhost:8000/api/v1/coupons/create-coupon", {
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

 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
      <div>
        {/* Icon to open the modal */}
        <div className="h-[150px] flex justify-center items-center mt-40">
          <div
            className="border-2 border-gray-400 cursor-pointer p-8 rounded-3xl"
            onClick={openModal}
          >
            <RiStickyNoteAddFill size={150} />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="w-full flex justify-center">
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={closeModal}
              />
              <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-h-[90vh] w-[70%] overflow-y-auto">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={closeModal}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <form
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="flex flex-col space-y-4"
                >
                  {/* Product Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name:
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Product ID */}
                  <div>
                    <label
                      htmlFor="product_id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product ID:
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="product_id"
                      name="product_id"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="desc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description:
                    </label>
                    <textarea
                      id="desc"
                      name="desc"
                      required
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>

                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price:
                    </label>
                    <input
                      onChange={handleChange}
                      type="number"
                      id="price"
                      name="price"
                      step="0.01"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category:
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="category"
                      name="category"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity:
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="quantity"
                      name="quantity"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Count in Stock */}
                  <div>
                    <label
                      htmlFor="countInStock"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Count In Stock:
                    </label>
                    <input
                      onChange={handleChange}
                      type="number"
                      id="countInStock"
                      name="countInStock"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Main Image */}
                  <div>
                    <label
                      htmlFor="Image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Main Image:
                    </label>
                    <input
                      type="file"
                      id="Image"
                      name="Image"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                  {/* Additional Images */}
                  {/* <div>
                    <label
                      htmlFor="Image1"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Image 1:
                    </label>
                    <input
                      type="file"
                      id="Image1"
                      name="Image1"
                      accept="image1/*"
                      onChange={handleImageChange}
                      required
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Image2"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Image 2:
                    </label>
                    <input
                      type="file"
                      id="Image2"
                      name="Image2"
                      accept="image2/*"
                      onChange={handleImageChange}
                      required
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Image3"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Image 3:
                    </label>
                    <input
                      type="file"
                      id="Image3"
                      name="Image3"
                      accept="image3/*"
                      onChange={handleImageChange}
                      required
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div> */}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-20 w-full flex flex-col justify-center  items-center">
      <button
        onClick={toggleGridVisibility}
        className="w-[40%] md:w-[20%] flex justify-center mb-4 py-2 bg-[#6ca300] text-white rounded-md hover:bg-[#347746]"
      >
        {isGridVisible ? 'Hide Products' : 'Manage Products'}
      </button>
       
       <div className="w-full px-6 md:py-0 md:px-20">
      {isGridVisible && (
      <div className="w-full  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-6 lg:gap-8  mt-20">
        {products.length > 0 ? (
          products.map((item) => {
            return (
              <div
                key={item._id}
                className="card border rounded-lg overflow-hidden shadow-lg flex flex-col col-span-1"
              >
                <div className="relative w-full pb-[55%]">
                  {/* Display main image */}
                  <img
                    src={convertImageToBase64(item.Image)} // Base64 image
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-sm md:text-base font-bold h-[60px] md:h-[40px]">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <div className="flex flex-col">
                    {/* <Link
                    to="/shop/product/addtocart"
                    className="inline-block"
                  >
                    <button className="my-4 py-2 px-4 mr-4 bg-[#592D1E] text-white rounded-md hover:bg-gray-800 text-sm sm:text-base">
                      Add to Cart
                    </button>
                  </Link> */}
                    <button
                      onClick={() => openPopup(item)}
                      className="w-full mt-4 rounded-md text-sm sm:text-base bg-blue-500 text-white font-bold  py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(item)}
                      className="w-full mt-2 rounded-md text-sm sm:text-base bg-red-500 text-white font-bold py-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-6 text-2xl text-center font-bold my-10 text-[#592d1e]">You have not added any products yet.</p>
        )}
      </div>
       )}
       </div>
    </div>

      {isPopupOpen && currentProduct && (
        <ProductForm
          product={currentProduct}
          closePopup={closePopup}
          refreshProducts={() => {
            axios
              .get(`${backend}/api/v1/products`)
              .then((response) => setProducts(response.data));
          }}
        />
        
      )}
    </div>
    <div>
   
    </div>
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
  );
};

export default Dashboard;
