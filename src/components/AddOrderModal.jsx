import React, { useState, useEffect } from "react";
import axios from "axios";

const AddOrderModal = ({ isOpen, onClose, onOrderCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    items: [{ productId: '', quantity: 1, price: 0 }],
    totalPrice: 0
  });

  const [products, setProducts] = useState([]);
  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backend}/api/v1/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (isOpen) {
      fetchProducts();
    }
  }, [isOpen, backend]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const items = [...formData.items];
    const updatedItem = items[index];
    
    if (e.target.name === "productId") {
      const selectedProduct = products.find(p => p._id === e.target.value);
      if (selectedProduct) {
        updatedItem.name = selectedProduct.name;
        updatedItem.price = selectedProduct.quantityPrices[0].price;
      } else {
        updatedItem.name = '';
        updatedItem.price = 0;
      }
    }
    
    updatedItem[e.target.name] = e.target.value;
    setFormData({ ...formData, items });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { productId: '', quantity: 1, price: 0 }] });
  };

  const deleteItem = (index) => {
    const updatedItems = formData.items.filter((item, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validatedItems = formData.items.map(item => ({
      ...item,
      name: item.name || 'Unknown Product',
    }));
  
    try {
      const response = await axios.post(`${backend}/neworder`, {
        userId: "someUserId", 
        cartItems: validatedItems,
        shippingInfo: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
        },
        totalPrice: validatedItems.reduce((total, item) => total + item.quantity * item.price, 0),
      });

      onOrderCreated(response.data);
      alert("Order created successfully");
      onClose();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 mt-20">
      <div className="bg-white p-8 rounded-lg w-[1000px] shadow-lg space-y-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Order</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-10">
            <div className="w-1/2">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Customer Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-10">
            <div className="w-1/2">
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <input
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h3 className="text-xl font-semibold">Items</h3>
          {formData.items.map((item, index) => (
            <div key={index} className="space-y-4">
              <div className="flex gap-4 items-center">
                <select
                  name="productId"
                  value={item.productId}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-2/5 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product._id} value={product._id}>{product.name}</option>
                  ))}
                </select>
                <input
                  name="quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  placeholder="Quantity"
                  className="w-1/5 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="price"
                  type="number"
                  value={item.price}
                  readOnly
                  placeholder="Price"
                  className="w-1/5 p-3 border border-gray-300 rounded-md bg-gray-100"
                />
                <button
                  type="button"
                  onClick={() => deleteItem(index)}
                  className="bg-red-500 w-1/5 p-3 rounded-lg flex justify-center items-center text-white font-bold hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Item
          </button>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
            >
              Create Order
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrderModal;
