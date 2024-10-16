import React from "react";
import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { convertImageToBase64 } from "../utils";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

const ProductDescription = () => {
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const { product } = location.state || {};

  const navigate = useNavigate();

  // Retrieve product from state

  console.log(product);
  const [quantity, setQuantity] = useState(1);
  const [selectedQuantityPrice, setSelectedQuantityPrice] = useState(product.quantityPrices[0]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleQuantityPriceChange = (event) => {
    const selectedQP = product.quantityPrices.find(qp => qp.quantity === event.target.value);
    setSelectedQuantityPrice(selectedQP);
    setQuantity(1);
  };

  const totalPrice = (selectedQuantityPrice.price * quantity).toFixed(2);

  // Create an array of image sources from the product object
  const imageSources = [
    product.Image,
    // product.Image1,
    // product.Image2,
    // product.Image3,
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const handleImageChange = (direction) => {
  //   setCurrentImageIndex((prevIndex) => {
  //     if (direction === "prev") {
  //       return prevIndex === 0 ? imageSources.length - 1 : prevIndex - 1;
  //     } else {
  //       return prevIndex === imageSources.length - 1 ? 0 : prevIndex + 1;
  //     }
  //   });
  // };

  // const currentImage = imageSources[currentImageIndex];

  if (!product) {
    return <p>Product not found</p>; // Handle case when product is not available
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-green-500 hover:text-green-600 transition-colors duration-300 flex items-center"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Products
      </button>
      <div className="bg-white p-6 rounded-lg shadow-sm border-[0.25px] border-gray-50 flex flex-col md:flex-row">
        {/* Product Image and Gallery */}
        <div className="md:w-1/2 lg:w-1/3 mb-6 md:mb-0">
          <img
            src={convertImageToBase64(product.Image)}
            alt={product.name}
            className=" h-[20rem] md:h-[30rem] w-full object-fill rounded-lg shadow-sm mb-4"
          />
          {/* <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handleImageChange("prev")}
              className="text-green-500 hover:text-green-600 text-[12px] md:text-base transition-colors duration-300"
            >
              ⇦ PREV
            </button>
            <div className="flex space-x-2">
              {imageSources.map((img, index) => (
                <img
                  key={index}
                  src={convertImageToBase64(img)}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-10 h-10 md:w-16 md:h-16 object-cover rounded-md border-2 ${
                    index === currentImageIndex
                      ? "border-green-500"
                      : "border-gray-300 hover:border-green-500"
                  } transition-colors duration-300 cursor-pointer`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
            <button
              onClick={() => handleImageChange("next")}
              className="text-green-500 hover:text-green-600 text-[12px] md:text-base transition-colors duration-300"
            >
              NEXT ⇨
            </button>
          </div> */}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 lg:w-2/3 md:pl-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Select Quantity:</h3>
            <select
              value={selectedQuantityPrice.quantity}
              onChange={handleQuantityPriceChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {product.quantityPrices.map((qp, index) => (
                <option key={index} value={qp.quantity}>
                  {qp.quantity} - ₹{qp.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center mb-4">
            <p className="text-3xl font-bold text-green-600 mr-4">
              ₹{totalPrice}
            </p>
            <p className="text-sm text-gray-500">/{selectedQuantityPrice.quantity}</p>
            <div className="flex items-center ml-6 bg-white rounded-md shadow-md p-2">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 flex justify-center items-center text-gray-800 font-semibold py-2 px-3 hover:bg-gray-50 transition duration-300 ease-in-out"
              >
                -
              </button>
              <span className="text-xl font-bold text-gray-800 px-4">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 flex justify-center items-center text-gray-800 font-semibold py-2 px-3 hover:bg-gray-50 transition duration-300 ease-in-out"
              >
                +
              </button>
            </div>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">{product.desc}</p>

          <div className="border-t border-gray-200 py-4 mb-6">
            <p className="text-gray-600 mb-1">
              <strong>SKU</strong>: {product.product_id}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Category</strong>: {product.category}
            </p>
          </div>

          <button
            className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300 w-full md:w-auto flex items-center justify-center"
            onClick={() => {
              addToCart({
                product_id: product.product_id,
                name: product.name,
                Image: product.Image,
                quantity: quantity,
                price: selectedQuantityPrice.price,
                selectedQuantity: selectedQuantityPrice.quantity,
              });
              navigate("/cart");
            }}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
