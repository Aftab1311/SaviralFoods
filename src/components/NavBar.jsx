import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '/images/logos.png';
import AuthContext from "./AuthContext"; // Import AuthContext
import {  FaUserCircle } from "react-icons/fa";
import {jwtDecode} from "jwt-decode"; // Correct import for jwtDecode
import { MdDashboard } from "react-icons/md"; // Import dashboard icon
import { CartContext } from "./CartContext"; // Import CartContext
import { FaCartArrowDown } from "react-icons/fa";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const navRef = useRef(null);
  // const { openModal } = useModal(); // Use openModal from context
  const { isAuthenticated, logout } = useContext(AuthContext); // Access isAuthenticated and logout
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(""); // Store userEmail state
  const dropdownRef = useRef(null);
  const { clearCart } = useContext(CartContext); // Access cartItems from context

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      }
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isHomePage]);

  useEffect(() => {
    // Retrieve the token from localStorage (or any storage where it's stored)
    const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage

    // Decode the token to extract the email
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserEmail(decodedToken.email); // Store email in state
    }

    // console.log(userEmail);
  }, [isAuthenticated]); // Re-run when `isAuthenticated` changes

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav ref={navRef} className={`
      w-full max-w-full fixed top-0 left-0 z-50
      ${isHomePage ? (scrolled ? 'bg-white shadow-md' : 'bg-transparent') : 'bg-white shadow-md'}
      transition-all duration-300 ease-in-out
    `}>
      <div className="container mx-auto px-6 sm:px-8 md:px-10 py-3 md:py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-center justify-start  gap-2">
          <img src={logoImage} alt="Logo" className={`  rounded-full ${isHomePage ? (scrolled ? 'md:h-12 h-10' :'h-16 md:h-16 '): 'h-10 md:h-12 '}  `} />
          <span className={`
              font-semibold text-black mt-0 text-left tracking-tight font-montserrat 
            ${scrolled || !isHomePage ? 'text-sm md:text-lg text-black hidden md:block' : 'text-lg md:text-2xl text-white hidden md:block'}
          `}>
            Saviral Foods
          </span>
        </Link>

        

        <ul className={`
          md:flex md:items-center md:space-x-6
          ${menuOpen ? 'absolute top-full left-0 right-0 bg-white  shadow-md p-4' : 'hidden'}
          md:static md:bg-transparent md:shadow-none md:p-0
        `}>
          {['HOME', 'ABOUT', 'SHOP', 'CONTACT'].map((item) => (
            <li key={item} className="py-2 md:py-0">
              <Link
                to={item === 'HOME' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className={`
                  text-base font-medium tracking-wide
                  ${location.pathname === (item === 'HOME' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`) ? 'text-green-500' : 
                    (isHomePage && !scrolled ? 'md:text-white text-black' : 'text-black')}
                  hover:text-green-500 transition-colors duration-300
                `}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <div className='flex gap-4 items-center'>
         {/* Conditionally render Dashboard for admin */}

         <Link to="/cart" className="mq450:mx-1 mx-4">
          <FaCartArrowDown size={24} color="#6ca300" />
        </Link>

         {isAuthenticated && userEmail === "admin@gmail.com" && (
          <Link to="/admin/dashboard" className="text-[#6ca300] mx-4">
            <MdDashboard size={28} />
          </Link>
        )}

       
        {/* Conditionally render Login or Logout */}
        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="flex items-center text-white focus:outline-none mr-2"
            >
              <FaUserCircle size={30} color="#6ca300" />
            </button>

            {dropdownOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
    <a
      href="/profile-page"
      className="flex justify-center text-lg px-4 py-2 text-gray-800 hover:bg-gray-200"
    >
      View Profile
    </a>
    
    {userEmail === "admin@gmail.com" && ( // Check if user is admin
      <Link
        to="/allorders" // Adjust the path as needed
        className="flex justify-center px-4 py-2 text-lg text-gray-800 hover:bg-gray-200"
        onClick={() => handleLinkClick("All Orders")}
      >
        All Orders
      </Link>
    )}

    <Link
      to="/login"
      className="flex justify-center px-4 py-2 text-lg text-gray-800 hover:bg-gray-200 bebas"
      onClick={() => {
        clearCart();
        logout(); // Call logout function
        handleLinkClick("Logout");
         // Clear cart on logout
      }}
    >
      Logout
    </Link>
  </div>
)}

          </div>
        ) : (
          <Link
            to="/login"
            className="px-7 py-2 rounded-full bg-[#6ca300] text-lg text-white font-black shadow-md shadow-[#0000005a] bebas tracking-wider"
            onClick={() => handleLinkClick("Login")}
          >
            Login
          </Link>
        )}
        <div className="md:hidden">
          <button onClick={toggleMenu} className={`focus:outline-none ${isHomePage && !scrolled ? 'text-white' : 'text-gray-600'}`}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>
      

      </div>
    </nav>
  );
};

export default Navbar;
