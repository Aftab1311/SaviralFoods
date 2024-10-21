import { useNavigate } from "react-router-dom";
import { convertImageToBase64 } from "../utils";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${product.product_id}`, { state: { product } });
  };

  const handleCheckProduct = (e) => {
    e.stopPropagation();
    navigate(`/products/${product.product_id}`, { state: { product } });
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl border border-slate-200 hover:border-slate-300 cursor-pointer"
      onClick={handleViewDetails}
    >
      <div className="relative overflow-hidden group">
        <img
          src={convertImageToBase64(product.Image)}
          alt={product.name}
          className="w-full h-[150px] md:h-[180px] mb-2 object-center transition duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-zinc-900 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-100 ease-in-out">
          <button
            className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-full hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            View Details
          </button>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-sm md:text-md font-semibold mb-2 text-center ">
            {product.name}
          </h3>
          <div className="flex justify-center items-center space-x-2 mb-3">
            <p className="text-[#7fba00] font-bold text-[12px] md:text-base">
              ₹{product.quantityPrices[0].price.toFixed(2)} /{" "}
              {product.quantityPrices[0].quantity}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            className="bg-[#7fba00] text-white md:font-semibold md:py-2 md:px-4 rounded-full hover:bg-[#6ca300] transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleCheckProduct}
          >
            Check Product
          </button>
          <button
            className="hidden border-2 border-[#7fba00] text-[#7fba00] md:font-semibold md:py-2 md:px-4 rounded-full hover:bg-[#7fba00] hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
