import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line, RiSubtractFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Footer from "./Footer";
// import { useCart } from "./CartContext";
import AuthContext from "./AuthContext";
import PropTypes from "prop-types";
import { CartContext } from "./CartContext";
import { convertImageToBase64 } from "../utils";
import { useState } from "react";
import axios from "axios";

const Cart = () => {
  const backend = import.meta.env.VITE_BACKEND_URL;
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);
  // const { cartItems, clearCart } = useCart();
  // const [items, setItems] = useState(cartItems);
  const { isAuthenticated } = useContext(AuthContext); // Access isAuthenticated from context
  const navigate = useNavigate(); // Hook to programmatically navigate

  const [couponCode, setCouponCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  // const [totalPrice, setTotalPrice] = useState(0);
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.post(`${backend}/api/v1/coupons/validate`, {
        code: couponCode,
      });

      if (response.data.valid) {
        setDiscountPercentage(response.data.discountPercentage);
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid coupon code.');
      }
    } catch (error) {
      console.error('Error validating coupon:', error);
      setErrorMessage('Failed to validate coupon.');
    }
  };

  const mainPrice = getCartTotal() - ((discountPercentage / 100) * getCartTotal()).toFixed(2);

  

 

  
  const moveToWishlist = (item) => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.find((wishlistItem) => wishlistItem.id === item.id)) {
      wishlist.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  };

 

  const handleCheckoutClick = () => {
    const totalPrice = ((discountPercentage / 100) * getCartTotal()).toFixed(2);
  
    if (isAuthenticated) {
      // If user is authenticated, navigate to checkout with totalPrice
      navigate("/checkout", { state: { mainPrice ,discountPercentage} });
    } else {
      // If user is not authenticated, navigate to sign-in page
      alert("Please sign in to continue");
      navigate("/login"); // Adjust the path if needed
    }
  };
  console.log(cartItems);
  return (
    <div className="food-about w-full pt-16 bg-[#F5F5F5] bebas tracking-wider">
      <div className="food-about-top w-full px-5 pt-12">
        <h1 className="text-5xl tracking-wider">MY CART</h1>
        <div className="w-full flex items-center justify-between px-5 py-3 border border-[#dadada] rounded-xl mt-5">
          <button
            className="px-7 py-2 text-md rounded-full bg-[#dadada]"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className=" w-full flex flex-col md:flex-row md:h-[55vh] gap-4 px-5 my-6">
        <div className="food-about-btm-left w-full md:w-[75%] h-auto md:overflow-auto">

          {cartItems.length === 0 ? (
            <p className="text-center text-lg font-semibold">
              Your cart is empty
            </p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="food-about-btm-left-item w-full flex-col md:flex-row flex justify-between mb-9 py-3"
                >
                  <div className="flex gap-7 items-center">
                    <div className="w-36 h-36 rounded-xl md:overflow-hidden">
                      <img
                        src={convertImageToBase64(item.Image)}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>

                    <div className="flex flex-col  items-start">
                      <h1 className="text-lg md:text-2xl font-semibold tracking-wider">
                        {item.name}
                      </h1>
                      <div className="flex flex-col md:flex-row justify-center md:items-center gap-6 mt-3">
                        <button
                          className="flex items-center gap-1 text-sm md:text-base text-red-600"
                          onClick={() => removeFromCart(item)}
                        >
                          <RiDeleteBin6Line />
                          Remove
                        </button>
                        <Link
                          to="/wishlist"
                          className="flex items-center text-sm md:text-base gap-2"
                          onClick={() => moveToWishlist(item)}
                        >
                          <FaHeart />
                          <span className="text-[grey]">Move to wishlist</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col  items-center justify-center md:justify-start gap-10 md:gap-3 mr-5 mt-10 md:mt-0">
                    <div className="flex flex-col  items-center">
                      <h2 className="text-xl my-4">QUANTITY</h2>
                      <div className="flex items-center gap-4">
                        <button
                          className="w-6 h-6 rounded-full border border-[#dadada] flex items-center justify-center cursor-pointer"
                          onClick={() => removeFromCart(item)}
                        >
                          <RiSubtractFill />
                        </button>
                        {item.quantity} x {item.selectedQuantity}
<button
  className="w-6 h-6 rounded-full border border-[#dadada] flex items-center justify-center cursor-pointer"
  onClick={() => addToCart(item)}
>
  <IoMdAdd />
</button>
</div>
</div>
<div>
<h1 className="flex justify-center items-center gap-3">
  <span className="text-xl font-semibold">
    ₹{(item.price * item.quantity).toFixed(2)}
  </span>
</h1>
</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="food-about-btm-right flex flex-col justify-around w-full md:w-[25%] gap-8 h-full p-5 border border-[#dadada] rounded-xl">
          <h1 className="text-xl font-medium">ORDER SUMMARY</h1>
          <div>
      <form className="flex gap-3 mb-4" onSubmit={handleSubmit}>
        <input
          className="w-[80%] px-3 py-1 rounded-md"
          type="text"
          placeholder="Discount Voucher"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className="px-3 py-1 bg-[#dadada] rounded-md cursor-pointer"
          type="submit"
          value="Code"
        />
      </form>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      {discountPercentage > 0 && (
        <p className="text-green-500">You have received a discount of {discountPercentage}%!</p>
      )}
    </div>
          <div className="voucher">
            <h2 className="w-full flex items-center justify-between font-medium text-[grey]">
              <span>Sub Total</span>
              <span className="text-black">₹{getCartTotal().toFixed(2)}</span>
            </h2>
            <h2 className="w-full flex items-center justify-between font-medium text-[grey] mt-2">
              <span>Discount({discountPercentage}%)</span>
              <span className="text-green-500">
              ₹{((discountPercentage / 100) * getCartTotal()).toFixed(2)}
              </span>
              
            </h2>
           
          </div>
          <div className="w-full flex items-center justify-between">
            <h1 className="font-bold">GRAND TOTAL</h1>
            <h2 className="font-medium">
              ₹{mainPrice}
            </h2>
          </div>
          <button
            onClick={handleCheckoutClick} // Use the click handler
            className="w-full flex items-center justify-center py-3 rounded-full text-[#fff] font-medium bg-[#6ca300] hover:bg-[#347746] cursor-pointer"
          >
            Checkout Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func,
};
