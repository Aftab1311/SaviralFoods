import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Add axios import
import ProductCard from '../components/Card';
import { useNavigate } from 'react-router-dom';

const Shop = () => {
  const [price, setPrice] = useState(1000);
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Initialize filteredProducts state
  const [categories, setCategories] = useState(['All']); // Initialize categories state
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle error state

  const backend = "http://localhost:8000"; // Replace with your actual backend URL

  useEffect(() => {
    // Fetch products from the API
    axios
      .get(`${backend}/api/v1/products`)
      .then((response) => {
        const fetchedProducts = response.data; // Adjust based on your actual API response format
        setProducts(fetchedProducts);
        setCategories(['All', ...new Set(fetchedProducts.map((product) => product.category))]); // Set categories
        setFilteredProducts(fetchedProducts); // Set initial filtered products
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [backend]);

  const navigate = useNavigate();

  useEffect(() => {
    let result = products;

    // Filter by category
    if (category !== 'All') {
      result = result.filter(product => product.category === category);
    }

    // Filter by price range
    result = result.filter(product => product.price <= price);

    // Sort by price (high to low, low to high)
    if (priceFilter === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    } else if (priceFilter === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by selected option
    switch (sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
      default:
        // Assuming we don't have a popularity metric, we'll leave it as is
        break;
    }

    setFilteredProducts(result);
  }, [category, price, sortBy, priceFilter, searchTerm, products]);

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };

  if (loading) {
    return <div className="mt-20 w-full flex justify-center text-center text-2xl font-bold">Creating Happiness...</div>; // Display loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className="font-sans bg-white mt-16">
      <section className="relative overflow-hidden bg-[#f0f4ed] py-10 px-4 md:py-16 md:px-10 mt-16 ">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl text-gray-800 mb-2">
            Shop <span className="font-bold text-black">The Saviral Foods</span>  
          </h1>
          <div className="text-sm text-gray-600 max-sm:mt-7">
            <span>HOME / SHOP</span>
          </div>
        </div>
        <div className="absolute -top-3 right-0 w-1/2 h-full bg-no-repeat bg-contain bg-right-top hidden md:block" style={{backgroundImage: 'url("/images/badam.png")'}}></div>
      </section>

      <img src="/images/wave.png" alt="Decorative wave" className="w-full mt-[-90px] relative z-10" />

      <div className="text-center p-4 md:p-8 font-sans">
        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center max-w-6xl mx-auto mt-8 gap-4 max-sm:mt-20">
          <div className="w-full flex flex-col md:flex-row md:w-[35%] items-center md:items-start gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">CATEGORIES</span>
            <select 
              className="p-2 rounded-full border border-gray-300 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">SORT BY</span>
            <select 
              className="p-2 rounded-full border border-gray-300 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Popular item</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
          </div>
          
          <div className="w-full md:w-[20%]">
          <img
            src="/images/logo-2.png"
            alt="Organic Fresh Food"
            className="rounded-full p-2 w-32 h-32 mx-auto mt-0"
          />
          </div>

          {/* <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">PRICE</span>
            <select 
              className="p-2 rounded-full border border-gray-300 text-sm"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="highToLow">High to Low</option>
              <option value="lowToHigh">Low to High</option>
            </select>
          </div> */}

          {/* <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-500">Price Range</label>
            <input
              type="range"
              min="10"
              max="1000"
              value={price}
              onChange={handlePriceChange}
              className="w-24 md:w-32"
            />
            <span className="text-sm">₹{price}</span>
          </div> */}

          <div className="w-[90%] md:w-[35%] relative mt-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 pl-8 pr-4 w-full rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 p-4 md:p-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
