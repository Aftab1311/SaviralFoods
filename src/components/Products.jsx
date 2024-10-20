import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "./Card";


export const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backend}/api/v1/products`, {
          params: { limit: 8 },
        });
        const fetchedProducts = response.data.products;

        // Normalize categories by trimming spaces and converting to lowercase
        const normalizedCategories = fetchedProducts.map((product) =>
          product.category.trim().toLowerCase()
        );

        // Remove duplicates using a Set
        setCategories(["all", ...new Set(normalizedCategories)]);
        setProducts(fetchedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [backend]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Memoize the filtered and shuffled products
  const displayProducts = useMemo(() => {
    return shuffleArray([...products]);
  }, [products]);

  const filteredProducts =
    activeCategory === "all"
      ? displayProducts
      : products.filter((product) => product.category === activeCategory);

  const handleCategoryClick = (category) => {
    setActiveCategory((prev) => (prev === category ? "all" : category));
  };
  console.log("categories", categories);

  if (loading) {
    return (
      <div className="my-20 w-full flex justify-center text-center text-2xl font-bold">
        <div className="preloader">
          <svg
            className="cart"
            role="img"
            aria-label="Shopping cart line animation"
            viewBox="0 0 128 128"
            width="128px"
            height="128px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="8"
            >
              <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                <circle cx="43" cy="111" r="13" />
                <circle cx="102" cy="111" r="13" />
              </g>
              <g className="cart__lines" stroke="currentColor">
                <polyline
                  className="cart__top"
                  points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                  stroke-dasharray="338 338"
                  stroke-dashoffset="-338"
                />
                <g className="cart__wheel1" transform="rotate(-90,43,111)">
                  <circle
                    className="cart__wheel-stroke"
                    cx="43"
                    cy="111"
                    r="13"
                    stroke-dasharray="81.68 81.68"
                    stroke-dashoffset="81.68"
                  />
                </g>
                <g className="cart__wheel2" transform="rotate(90,102,111)">
                  <circle
                    className="cart__wheel-stroke"
                    cx="102"
                    cy="111"
                    r="13"
                    stroke-dasharray="81.68 81.68"
                    stroke-dashoffset="81.68"
                  />
                </g>
              </g>
            </g>
          </svg>
          <div className="preloader__text">
            <p className="preloader__msg">Bringing you the goods…</p>
            <p className="preloader__msg preloader__msg--last">
              This is taking long. Something’s wrong.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white py-6">
      <div className="container mx-auto px-4">
        {/* Small and Medium devices layout */}
        <div className="md:hidden text-center mb-10">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/images/products-head-fruit.png"
              alt="Fruits"
              className="w-auto h-16 object-cover rounded-lg mb-4"
            />
            <img
              src="/images/product-organic.png"
              alt="Fresh"
              className="w-auto h-20 object-cover rounded-lg mb-6"
            />

            <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
              <button
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap
                  bg-white text-gray-600 border border-gray-300 hover:border-[#7fba00] hover:text-[#7fba00]"
                onClick={() => setActiveCategory("all")}
              >
                all
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-[#7fba00] text-white shadow-lg"
                      : "bg-white text-gray-600 border border-gray-300 hover:border-[#7fba00] hover:text-[#7fba00]"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Large devices layout */}
        <div className="hidden md:block text-center mb-20">
          <div className="flex justify-center items-end">
            <div className="flex space-x-4">
              {categories.slice(0, 2).map((category) => (
                <button
                  key={category}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap -mt-4 ${
                    activeCategory === category
                      ? "bg-[#7fba00] text-white shadow-lg"
                      : "bg-white text-gray-600 border border-gray-300 hover:border-[#7fba00] hover:text-[#7fba00]"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex flex-col items-center mx-16 -mb-6">
              <img
                src="/images/Navs.png"
                alt="Fruits"
                className="w-auto h-24 object-cover rounded-lg -mt-4"
              />
            </div>
            <div className=" flex gap-4 items-center">
              <div className="flex space-x-4">
              {categories.slice(2).map((category) => (
                <button
                  key={category}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap -mt-4 ${
                    activeCategory === category
                      ? "bg-[#7fba00] text-white shadow-lg"
                      : "bg-white text-gray-600 border-2 border-gray-300 hover:border-[#7fba00] hover:text-[#7fba00]"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
              </div>
              <Link to={'/shop'}>
             <div className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap -mt-4  bg-white text-gray-600 border-2 border-gray-300 hover:border-[#7fba00] hover:text-[#7fba00]">
              + See more
             </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-full grid grid-cols-2 md:grid-cols-4 md:gap-4 md:px-10">
            {filteredProducts.map((product) => (
              <div key={product.product_id} className="w-full p-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center mt-8">
          <Link
            to="/shop"
            className="px-6 py-2 text-base md:text-lg font-medium text-black border-2 border-green-500 rounded-full hover:bg-green-500 hover:text-white transition"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};
