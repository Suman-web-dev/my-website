import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from './CartContext'; // Import the useCart hook
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { dispatch } = useCart(); // Use the useCart hook to get dispatch

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://e-comm-website-7380.onrender.com/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details. Please try again later.");
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  useEffect(() => {
    if (product) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/products/related?category=${product.category}`)
        .then((response) => {
          setRelatedProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching related products:", error);
          setRelatedProducts([]);
        });
    }
  }, [product]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          ...product,
          selectedColor,
          selectedSize,
          quantity: 1,
        },
      });
      toast.success("Item added to cart!"); // Show success message
      navigate('/pages/Cart'); // Redirect to the cart page after adding to cart
    }
  };

  const handleBuyNow = () => {
    if (product) {
      navigate('/pages/OrderSummary'); // Redirect to the checkout page after buying now
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>

      {loading && <p className="text-gray-600">Loading product details...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && product && (
        <div className="max-w-6xl mx-auto">
          <div className="text-sm text-gray-600 mb-4">
            <Link to="/">Home</Link> &gt; <Link to="/clothing">Clothing</Link> &gt;{" "}
            <Link to="/mens-clothing">Men's Clothing</Link> &gt;{" "}
            <Link to="/t-shirts">T-Shirts</Link> &gt; {product.name}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-gray-600">{product.category}</p>

              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">★★★★☆</span>
                <span className="text-gray-600">428 ratings and 11 reviews</span>
                <span className="text-green-600 font-semibold">Assured</span>
              </div>

              <div className="space-y-2">
                <p className="text-2xl font-bold">${product.price}</p>
                <p className="text-gray-600 line-through">$999</p>
                <p className="text-green-600">70% off</p>
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Color: {selectedColor}</p>
                <div className="flex space-x-2">
                  {["Navy", "White", "Black"].map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color ? "border-2 border-blue-500" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    ></button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Size: {selectedSize}</p>
                <div className="flex space-x-2">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`px-4 py-2 border ${
                        selectedSize === size ? "border-2 border-blue-500" : "border-gray-300"
                      } rounded-lg`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <a href="#" className="text-blue-500 text-sm">
                  Size Chart
                </a>
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Available Offers</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card T&C</li>
                  <li>Special PriceGet extra 10% off (price inclusive of cashback/coupon)T&C</li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">You might be interested in</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Wrist Watches", discount: "Min. 90% Off", image: "https://via.placeholder.com/150" },
                { name: "Kids' T-shirts", discount: "Min. 50% Off", image: "https://via.placeholder.com/150" },
                { name: "Men's Sports Shoes", discount: "Min. 70% Off", image: "https://via.placeholder.com/150" },
              ].map((item, index) => (
                <div key={index} className="border p-4 rounded-lg shadow-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-green-600">{item.discount}</p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 w-full hover:bg-blue-600">
                    Shop Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((product) => (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <div className="border p-4 rounded-lg shadow-md">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover mb-4"
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600">{product.category}</p>
                    <p className="text-gray-800 font-bold">${product.price}</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 w-full hover:bg-blue-600">
                      View Details
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;