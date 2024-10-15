import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './Card';


export const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backend =  import.meta.env.VITE_APP_BACKEND_URL ;

  useEffect(() => {
    // Fetch products from the API
    axios
      .get(`${backend}/api/v1/products`)
      .then((response) => {
        const fetchedProducts = response.data; // Adjust based on your actual API response format
        setProducts(fetchedProducts);
        setCategories([...new Set(fetchedProducts.map((product) => product.category))]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
    const shuffledProducts = shuffleArray([...products]);
    const productsByCategory = categories.reduce((acc, category) => {
      acc[category] = shuffledProducts.filter(p => p.category === category).slice(0, 3);
      return acc;
    }, {});

    return shuffledProducts.filter(product => 
      Object.values(productsByCategory).some(categoryProducts => 
        categoryProducts.includes(product)
      )
    );
  }, [products, categories]);

  const filteredProducts = activeCategory === 'all' 
    ? displayProducts 
    : products.filter(product => product.category === activeCategory);

  const handleCategoryClick = (category) => {
    setActiveCategory(prev => prev === category ? 'all' : category);
  };

  if (loading) {
    return <div className="my-20 w-full flex justify-center text-center text-2xl font-bold">Creating Happiness...</div>; // Display loading message
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
            <img src="/images/products-head-fruit.png" alt="Fruits" className="w-auto h-16 object-cover rounded-lg mb-4" />
            <img src="/images/product-organic.png" alt="Fresh" className="w-auto h-20 object-cover rounded-lg mb-6" />
            
            <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
              <button
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap
                  bg-white text-gray-600 border border-gray-300 hover:border-[#7fba00] hover:text-[#7fba00]"
                onClick={() => setActiveCategory('all')}
              >
                all
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category 
                      ? 'bg-[#7fba00] text-white shadow-lg' 
                      : 'bg-white text-gray-600 border border-gray-300 hover:border-[#7fba00] hover:text-[#7fba00]'
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
                      ? 'bg-[#7fba00] text-white shadow-lg' 
                      : 'bg-white text-gray-600 border border-gray-300 hover:border-[#7fba00] hover:text-[#7fba00]'
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex flex-col items-center mx-16 -mb-6">
              <img src="/images/Navs.png" alt="Fruits" className="w-auto h-24 object-cover rounded-lg -mt-4" />
            </div>
            <div className="flex space-x-4">
              {categories.slice(2).map((category) => (
                <button
                  key={category}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap -mt-4 ${
                    activeCategory === category 
                      ? 'bg-[#7fba00] text-white shadow-lg' 
                      : 'bg-white text-gray-600 border-2 border-gray-300 hover:border-[#7fba00] hover:text-[#7fba00]'
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 md:gap-10 md:px-10">
            {filteredProducts.map((product) => (
              <div key={product.product_id} className="w-full p-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className='w-full flex justify-center items-center mt-8'>
          <Link to="/shop" className="px-6 py-2 text-base md:text-lg font-medium text-black border-2 border-green-500 rounded-full hover:bg-green-500 hover:text-white transition">
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};
