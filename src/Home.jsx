import { useContext, useEffect, useState } from "react";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { input } = useContext(UserContext);

  const fetchData = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get( 
        `https://ecommerce-api-8ga2.onrender.com/api/product?page=${page}&limit=12`
      );

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setProducts(prev => [...prev, ...response.data]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading]);

  useEffect(() => {
    if (input.trim()) {
      const filtered = products.filter((item) =>
        item.category.toLowerCase().includes(input.toLowerCase()) ||
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [input, products]);

  const displayProducts = input.trim() ? filteredProducts : products;

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {input.trim() ? `Search results for "${input}"` : "All Products"}
          </h2>
          <p className="text-gray-600">
            {displayProducts.length} product{displayProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {displayProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 text-center max-w-md">
              {input.trim()
                ? `We couldn't find any products matching "${input}". Try different keywords.`
                : "No products available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden group">
                <Link to={`/product/${product._id}`}>
                  <div className="aspect-square p-4 bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.url}
                      alt={product.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
                      {product.name.length > 50 ? product.name.slice(0, 50) + "..." : product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600 font-medium">Price:</span>
                      <PiCurrencyDollarBold className="text-green-600 w-4 h-4" />
                      <span className="text-lg font-bold text-green-600">{product.price}</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                      {product.category}
                    </span>
                  </div>

                  {product.rating && (
                    <div className="mt-2 flex items-center space-x-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating.rate)
                                ? "fill-current"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.rating.count})</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {!hasMore && (
          <p className="text-center text-gray-500 text-sm mt-6">No more products to load.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
