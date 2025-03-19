import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Refresh every 5 sec
  
    return () => clearInterval(interval);
  }, []);
  

  if (!orders.length) {
    return <div className="text-center text-red-500">No orders found.</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Total Price</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="border">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{order.userId}</td>
              <td className="p-2 border">
                {order.items?.map((item) => (
                  <div key={item._id || item.name}>{item.name}</div>
                ))}
              </td>
              <td className="p-2 border">${order.totalPrice}</td>
              <td className="p-2 border">{order.address}</td>
              <td className="p-2 border">{order.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
