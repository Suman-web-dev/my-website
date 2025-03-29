import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Import Link
import axios from "axios";

const ProductListing = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category"); // Get the selected category or sub-category

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Fetch products based on the selected category
  useEffect(() => {
    console.log("Fetching all products...");
    
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((response) => {
        console.log("✅ All Products Fetched:", response.data);
      })
      .catch((error) => {
        console.error("❌ Error fetching all products:", error);
      });
  
    if (selectedCategory) {
      console.log(`🔍 Fetching products for category: ${selectedCategory}`);
  
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_URL}/products?category=${selectedCategory}`)
        .then((response) => {
          console.log(`✅ Products for category: ${selectedCategory}`, response.data);
          setProducts(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error("❌ Error fetching products:", error);
          setError("Failed to fetch products. Please try again later.");
          setProducts([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("⚠️ No category selected. Clearing products...");
      setProducts([]);
      setLoading(false);
    }
  }, [selectedCategory]);
  
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product Listing</h2>

      {/* Display loading state */}
      {loading && <p className="text-gray-600">Loading products...</p>}

      {/* Display error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Product Grid */}
      {!loading && !error && (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <Link
                  to={`/product/${product._id}`} // Navigate to the product details page
                  key={product._id || product.name}
                  className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-70 mb-4"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.category}</p>
                  <p className="text-gray-800 font-bold">${product.price}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No products found for "{selectedCategory}".</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListing;