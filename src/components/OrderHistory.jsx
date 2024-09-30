import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"; // To decode the JWT token

const OrdersHistory = () => {

    const backend = import.meta.env.VITE_BACKEND_URL;
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Retrieve the token from localStorage (or any storage where it's stored)
        const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
        let userEmail = '';

        // Decode the token to extract the email
        if (token) {
            const decodedToken = jwtDecode(token);
            userEmail = decodedToken.email; // Extracting email from the decoded token
        }

        // console.log(userEmail);

        // Fetch orders when the component loads
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${backend}/api/v1/orders`);
                // Filter orders for the logged-in user based on the email extracted from the JWT token
                const userOrders = response.data.filter(order => order.user === userEmail);
                setOrders(userOrders); // Save only the filtered orders
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to load orders');
            }
        };

        fetchOrders();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="w-full px-5 py-10 bg-white">
            <h1 className="text-3xl font-bold mb-6 flex justify-center">Order History</h1>
            {orders.length > 0 ? (
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Order ID</th>
                            {/* <th className="border px-4 py-2">User</th> */}
                            <th className="border px-4 py-2">Items</th>
                            <th className="border px-4 py-2">Total Price</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-100 text-center">
                                <td className="border px-4 py-2">{order._id}</td>
                                {/* <td className="border px-4 py-2">{order.user}</td> */}
                                <td className="border px-4 py-2">
                                    {order.items.map((item, index) => (
                                        <div key={index}>
                                            {item.name} (x{item.quantity}) - ₹{item.price}
                                        </div>
                                    ))}
                                </td>
                                <td className="border px-4 py-2">₹{order.totalPrice}</td>
                                <td className="border px-4 py-2">{order.status}</td>
                                <td className="border px-4 py-2">
                                    {new Date(order.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found for this user.</p>
            )}
        </div>
    );
};

export default OrdersHistory;
