import { useState } from 'react';

const Comp1 = () => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const products = [
    { image: '/images/juce.png', title: 'Fresh Atta', items: '6 items' },
    { image: '/images/tamatar.png', title: 'Basmati Rice', items: '4 items' },
    { image: '/images/straw.png', title: 'Fresh Oil', items: '5 items' },
  ];

  return (
    <div className="flex flex-col w-full items-center  md:flex-row justify-center p-4 md:p-12 gap-8 mt-12">
      {/* Product Cards */}
      <div className="flex flex-col sm:flex-row justify-center w-full  items-center  gap-6 flex-1">
        {products.map((product, index) => (
          <div
            key={index}
            className={`w-[219px] h-[281px] p-2 text-center border rounded-[10px] flex-1 bg-white m-[0_5px] transition-all duration-300 flex flex-col justify-center items-center ${
              hoverIndex === index
                ? 'border-green-500 shadow-[0_8px_16px_rgba(0,128,0,0.3)]'
                : 'border-[#eaeaea]'
            }`}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-[140px] h-[120px] mb-[40px] mx-auto"
            />
            <h3 className="text-base font-bold mb-[5px] whitespace-nowrap">
              {product.title}
            </h3>
            <p className="text-green-500 text-sm">{product.items}</p>
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex-1 w-full text-left sm:text-left mt-8 md:mt-0 md:ml-8 max-w-xl  md:mx-0">
      <h2 className="text-gray-600 text-center md:text-start uppercase text-sm tracking-wider mb-2">
  Fresh from our Store
</h2>
<h1 className="text-xl md:text-[40px] text-center md:text-start font-bold mb-[10px] mt-[10px]">
  <span className="font-normal">10+ </span>
  <span className="font-bold"></span>
  <span className="font-normal">, Grocery &</span> items
</h1>
<p className="text-[#666] text-base md:text-lg leading-[1.6] mt-4 text-justify md:text-start">
Welcome to Saviral Foods, your go-to destination for wholesome ingredients! We specialize in high-quality atta (whole wheat flour) sourced from freshly milled grains, ensuring you get the best nutrition and flavor for your rotis and baked goods.
</p>
      </div>
     </div>
  );
};

export default Comp1;
