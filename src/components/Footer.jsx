import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-100 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-10 border-t mt-4 border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-28">
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-semibold text-green-600">Saviral Foods <span className="font-normal text-gray-700"> </span></h3>
          <p className="uppercase text-xs sm:text-sm text-gray-500">Fresh STORE</p>
          <div className="w-12 h-0.5 bg-green-600"></div>
          <p className="text-sm text-gray-600">Welcome to Saviral Foods Store</p>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center"><span className="material-icons mr-2 text-green-600 text-base sm:text-lg  fa-solid fa-location-dot"></span>Shop no. B-3, Bankey Bihari Sharnam, Rajnagar Extension, Ghaziabad
            </p>
            <p className="flex items-center"><span className="material-icons mr-2 text-green-600 text-base sm:text-lg fa-solid fa-envelope"></span>saviralfoods@gmail.com</p>
            <p><span className="font-semibold fa-solid fa-phone material-icons mr-2 text-green-600 text-base sm:text-lg"></span> 9971403821, 9319545022 (Customer Care) </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-0">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Saviral Foods Information</h3>
          <div className="w-12 h-0.5 bg-green-600 mb-4"></div>
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              { name: 'Contact us', link: '/contact' },
              { name: 'Shop', link: '/shop' },
              { name: 'Products Offers', link: '/#offers' },
              { name: 'Popular Products', link: '/#popular-products' }
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <a href={item.link} className="flex items-center hover:text-green-600 transition-colors duration-200">
                  <span className="fa-solid fa-arrow-right mr-2 text-green-600 text-xs"></span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 sm:mt-0">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Saviral Foods Information</h3>
          <div className="w-12 h-0.5 bg-green-600 mb-4"></div>
          <ul className="space-y-2 text-sm text-gray-600">
            {[
              { name: 'Shipping Policy', link: '/shipping-policy' },
              // { name: 'Refund Policy', link: '/refund-policy' },
              { name: 'Cancellation and Return Policy', link: '/cancellation-policy  ' },
              { name: 'Terms & Conditions', link: '/terms' },
              { name: 'Privacy Policy', link: '/privacy-policy' }
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <a href={item.link} className="flex items-center hover:text-green-600 transition-colors duration-200">
                  <span className="fa-solid fa-arrow-right mr-2 text-green-600 text-xs"></span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        
      </div>

      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-700">
        <p className="text-center sm:text-left mb-4 sm:mb-0">©2024 Saviral Foods , made with <span className="text-red-500">❤️</span> by Campaigning Source, all right reserved</p>
      
      </div>
    </footer>
  );
};

export default Footer;
