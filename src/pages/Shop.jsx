import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import ProductCard from '../components/Card';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Shop = () => {
  const [price, setPrice] = useState(1000);
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [priceFilter, setPriceFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const backend = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const loadingRef = useRef(false);
  const lastLoadedPageRef = useRef(0);

  const fetchProducts = useCallback(async (pageToFetch) => {
    if (!hasMore || loadingRef.current || pageToFetch <= lastLoadedPageRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const response = await axios.get(`${backend}/api/v1/products`, {
        params: { page: pageToFetch, limit: 9 }
      });
      const newProducts = response.data.products;
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
      setHasMore(response.data.hasMore);
      setPage(pageToFetch + 1);
      lastLoadedPageRef.current = pageToFetch;
  
      // Update categories each time new products are fetched
      setCategories((prevCategories) => {
        const newCategories = [...new Set(newProducts.map(product => product.category))];
        return [...new Set([...prevCategories, ...newCategories])]; // Merge with existing categories
      });
  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [backend, hasMore]);
  

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1200;

      if (scrolledToBottom && !loadingRef.current && hasMore) {
        fetchProducts(page);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchProducts, page, hasMore]);

  useEffect(() => {
    if (!Array.isArray(products) || products.length === 0) return;
  
    let result = [...products];
  
    if (category !== 'All') {
      result = result.filter(product => product.category === category);
    }
  
    result = result.filter(product => {
      const productPrice = product.quantityPrices[0]?.price || 0;
      return productPrice <= price;
    });
  
    if (priceFilter === 'highToLow') {
      result.sort((a, b) => (b.quantityPrices[0]?.price || 0) - (a.quantityPrices[0]?.price || 0));
    } else if (priceFilter === 'lowToHigh') {
      result.sort((a, b) => (a.quantityPrices[0]?.price || 0) - (b.quantityPrices[0]?.price || 0));
    }
  
    if (searchTerm) {
      result = result.filter(product =>
        (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
         product.desc?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  
    switch (sortBy) {
      case 'priceAsc':
        result.sort((a, b) => (a.quantityPrices[0]?.price || 0) - (b.quantityPrices[0]?.price || 0));
        break;
      case 'priceDesc':
        result.sort((a, b) => (b.quantityPrices[0]?.price || 0) - (a.quantityPrices[0]?.price || 0));
        break;
      case 'popular':
      default:
        break;
    }
  
    setFilteredProducts(result);
  }, [category, price, sortBy, priceFilter, searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  console.log("categories", categories);
  console.log("products", products);

  if (loading && products.length === 0) {
    return <div className="mt-20 w-full flex justify-center text-center text-2xl font-bold">Creating Happiness...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="font-sans bg-white mt-16">
      <section className="relative overflow-hidden bg-[#f0f4ed] py-10 px-4 md:py-16 md:px-10 mt-16 ">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl text-gray-800 mb-2">
            Shop <span className="font-bold text-black">Saviral Foods</span>  
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
              alt=" Fresh Food"
              className="rounded-full p-2 w-32 h-32 mx-auto mt-0"
            />
          </div>

          <div className="w-[90%] md:w-[35%] relative mt-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 pl-10 pr-4 w-full rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 p-4 md:p-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No products found</div>
        )}
      </div>
      {loading && products.length > 0 && (
        <div className="flex justify-center items-center py-4">
          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
        </div>
      )}
    </div>
  );
};

export default Shop;
