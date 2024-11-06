import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import { CartContext } from "./CartContext";
import { convertImageToBase64 } from "../utils";
import { Loader2 } from "lucide-react"; // Import Loader2 from lucide-react

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/products/${product.product_id}`, { state: { product } });
  };

  // Check if product.quantityPrices exists and has at least one item
  const price = product.quantityPrices && product.quantityPrices.length > 0
    ? product.quantityPrices[0].price
    : product.price; // Fallback to product.price if quantityPrices is not available

  // Calculate the "old" price (15% more than the current price)
  const oldPrice = price ? price * 1.15 : null;

  return (
    <div
      className="w-64 h-auto p-4 bg-white m-2 rounded-lg shadow-md flex flex-col justify-between cursor-pointer transition-transform duration-300 hover:scale-105"
      id="offers"
    >
      <div>
        <img
          src={convertImageToBase64(product.Image)}
          alt={product.name}
          className="w-full h-44 object-center mb-4 rounded-md"
        />
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800 mb-2 capitalize">
            {product.name}
          </div>
        </div>
      </div>
      <div>
        {price && (
          <div className="flex justify-center items-center gap-2 mb-3">
            <span className="text-lg font-bold text-green-500">
              ₹{price.toFixed(2)}
            </span>
            {oldPrice && (
              <span className="text-sm line-through text-gray-400">
                ₹{oldPrice.toFixed(2)}
              </span>
            )}
          </div>
        )}
        <button
          className="w-full bg-[#7fba00] text-white py-2 px-4 rounded-full text-sm font-semibold transition-colors duration-300 hover:bg-[#6ca300]"
          onClick={handleViewProduct}
        >
          View Product
        </button>
      </div>
    </div>
  );
};

const Comp42 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [startAnimation, setStartAnimation] = useState(false);
  const cardsRef = useRef(null);

  const backend = import.meta.env.VITE_BACKEND_URL ;
  // Replace with your actual backend URL

  useEffect(() => {
    // Fetch products from the API
    axios
      .get(`${backend}/api/v1/products`)
      .then((response) => {
        const products = response.data; // Adjust based on your actual API response format
        setProducts(products);
        setCategories([
          ...new Set(products.map((product) => product.category)),
        ]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [backend]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartAnimation(true);
        } else {
          setStartAnimation(false);
        }
      },
      { threshold: 0.5 }
    );

    if (cardsRef.current) {
      observer.observe(cardsRef.current);
    }

    return () => {
      if (cardsRef.current) observer.unobserve(cardsRef.current);
    };
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="w-12 h-12 animate-spin text-[#7fba00]" />
    </div>
  );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mt-12">
      <style>
        {`
           .scrolling-container {
            display: flex;
            flex-direction: row;
            gap: 2rem;
            padding: 1rem;;
           overflow-x: auto; 
  scrollbar-width: none; 
  -ms-overflow-style: none;
        }
          
        `}
      </style>

      {/* <h2 className="text-center text-4xl text-zinc-800 font-thin mb-10">
        Exclusive <span className="text-[#4e8734] font-bold">Sale</span>
      </h2> */}

      <div ref={cardsRef} className="overflow-hidden relative mx-auto">
        <div
          className="scrolling-container py-4 gap-0 md:gap-10"
          // style={{
          //   animation: startAnimation ? `scrolling ${products.length * 12}s linear infinite` : 'none',
          // }}
        >
          {products.map((product, index) => (
            <div key={index} className="w-[100%] md:w-auto">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comp42;
