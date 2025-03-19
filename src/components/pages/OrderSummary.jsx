import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderSummary = () => {
  const { state } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState("");
  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, name: "Home", address: "123 Main St, City, Country" },
    { id: 2, name: "Office", address: "456 Business Rd, City, Country" },
  ]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = state.cartItems || [];
  const totalPrice = cartItems.reduce((total, item) => total + (item.price || 0), 0);
  const discount = 10;
  const finalAmount = totalPrice - discount;

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please log in to place an order.");
      navigate("/pages/LoginSignupPage");
    }
  }, [currentUser, navigate]);

  const handleAddAddress = () => {
    if (newAddress.trim() === "") {
      toast.error("Address cannot be empty.");
      return;
    }
    const newAddressObj = {
      id: savedAddresses.length + 1,
      name: "Custom Address",
      address: newAddress,
    };
    setSavedAddresses([...savedAddresses, newAddressObj]);
    setSelectedAddress(newAddressObj.id);
    setNewAddress("");
    toast.success("New address added!");
  };

  const handlePlaceOrder = async () => {
    if (!currentUser || !cartItems.length || !selectedAddress || !selectedPayment) {
      toast.error("Please complete all order details.");
      return;
    }

    const orderData = {
      items: cartItems,
      totalPrice: finalAmount,
      userId: currentUser.id,
      address: savedAddresses.find((addr) => addr.id === selectedAddress)?.address,
      paymentMethod: selectedPayment,
      email: currentUser.email,
    };

    setIsLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/place-order`, orderData);
      toast.success("Order placed successfully!");
      alert("Order placed successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/send-email`, 
        {
          email: currentUser.email,
          subject: "Order Confirmation",
          message: `Your order has been placed successfully! Order details: ${JSON.stringify(orderData)}`,
        }, 
        { headers: { "Content-Type": "application/json" } } // ✅ Ensure JSON is sent
      );
      

      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/orders`, orderData);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Delivery Address</h3>
        {savedAddresses.map((address) => (
          <div
            key={address.id}
            className={`border p-4 mb-2 rounded-lg cursor-pointer transition ${
              selectedAddress === address.id ? "border-blue-500 bg-blue-50 shadow-lg" : "border-gray-200"
            }`}
            onClick={() => setSelectedAddress(address.id)}
          >
            <p className="font-semibold">{address.name}</p>
            <p className="text-gray-600">{address.address}</p>
          </div>
        ))}
        <div className="mt-4">
          <input
            type="text"
            className="border p-3 w-full rounded-lg"
            placeholder="Enter new address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleAddAddress}
          >
            Add Address
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
        <select
          className="border p-3 w-full rounded-lg"
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="UPI">UPI</option>
          <option value="Net Banking">Net Banking</option>
        </select>
      </div>

      <button
        className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
        onClick={handlePlaceOrder}
        disabled={isLoading}
      >
        {isLoading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
