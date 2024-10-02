import { useState, useEffect } from "react";
import axios from "axios";

const ProductForm = ({ product, closePopup, refreshProducts }) => {

  const backend = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    name: product ? product.name : "",
    product_id: product ? product.product_id : "",
    desc: product ? product.desc : "",
    price: product ? product.price : 0,
    category: product ? product.category : "",
    quantity: product ? product.quantity : "",
    countInStock: product ? product.countInStock : 0,
  });

  const [mainImage, setMainImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        product_id: product.product_id,
        desc: product.desc,
        price: product.price,
        category: product.category,
        quantity: product.quantity,
        countInStock: product.countInStock,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "Image") {
      setMainImage(files[0]);
    } else if (name === "Image1") {
      setImage1(files[0]);
    } else if (name === "Image2") {
      setImage2(files[0]);
    } else if (name === "Image3") {
      setImage3(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("product_id", formData.product_id);
    data.append("desc", formData.desc);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("quantity", formData.quantity);
    data.append("countInStock", formData.countInStock);
    if (mainImage) data.append("Image", mainImage);
    if (image1) data.append("Image1", image1);
    if (image2) data.append("Image2", image2);
    if (image3) data.append("Image3", image3);

    try {
      const res = await axios.put(
        `${backend}/api/v1/products`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 201) {
        alert("Product updated successfully!");
        refreshProducts();
      }
      closePopup();
    } catch (error) {
      console.error("Error saving product:", error);
      setError(error?.response?.data?.message ?? "Failed to save product");
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto max-h-[800px] flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[70%]">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Edit Product" : "Create Product"}
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-[380px] ">
          {/* Editable fields */}
          <label className="block mb-4">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
              required
            />
          </label>
          <label className="block mb-4">
            Product ID:
            <input
              type="text"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
              required
              disabled={!!product}
            />
          </label>
          <label className="block mb-4">
            Main Image:
            <input
              type="file"
              name="Image"
              onChange={handleFileChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="block mb-4">
            Image 1:
            <input
              type="file"
              name="Image1"
              onChange={handleFileChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="block mb-4">
            Image 2:
            <input
              type="file"
              name="Image2"
              onChange={handleFileChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="block mb-4">
            Image 3:
            <input
              type="file"
              name="Image3"
              onChange={handleFileChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="block mb-4">
            Description:
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
              required
            />
          </label>
          <label className="block mb-4">
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
              required
            />
          </label>
          <label className="block mb-4">
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
              required
            />
          </label>
          <label className="block mb-4">
            Quantity:
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
            />
          </label>
          <label className="block mb-4">
            Count in Stock:
            <input
              type="number"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleChange}
              className="block w-full mt-1 border border-gray-300 p-2 rounded"
              required
            />
          </label>

          {/* Action buttons */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
          >
            {product ? "Save Changes" : "Create Product"}
          </button>
          <button
            type="button"
            onClick={closePopup}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
