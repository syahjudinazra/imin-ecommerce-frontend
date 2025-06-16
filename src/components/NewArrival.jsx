import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { apiService, getImageUrl } from "../services/api";

// Product Card Component
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const {
    id,
    name,
    image,
    rating,
    reviewCount,
    currentPrice,
    originalPrice,
    discount,
  } = product;

  // Handle click to navigate to product details
  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="px-4">
      <div
        className="bg-gray-100 h-72 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
        onClick={handleProductClick}
      >
        <div className="flex flex-col rounded-lg overflow-hidden transition-all duration-300">
          <div
            className={`relative flex items-center justify-center p-4 h-full`}
          >
            <img
              src={getImageUrl(image)}
              alt={name}
              className="object-contain h-full w-full max-h-60"
              onError={(e) => {
                // Fallback image if the main image fails to load
                e.target.src = "/placeholder-image.jpg";
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3
          className="text-2xl font-medium cursor-pointer hover:text-gray-600 transition-colors"
          onClick={handleProductClick}
        >
          {name}
        </h3>
        {product.category && (
          <p className="text-sm text-gray-600 mt-1 font-medium">
            {product.category.name || product.category}
          </p>
        )}
        <div className="flex items-center mt-2">
          {/* Rating Stars */}
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="font-bold text-lg">${currentPrice}</span>
          {originalPrice && (
            <>
              <span className="text-gray-500 line-through text-sm ml-2">
                ${originalPrice}
              </span>
              {discount && (
                <span className="text-red-500 text-xs ml-2">-{discount}%</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Section Component
const ProductSection = ({ title, products, loading, error }) => {
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleToggleExpand = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);

    // Update swiper when expanding/collapsing
    if (swiperInstance) {
      setTimeout(() => {
        swiperInstance.update();
      }, 300);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-4xl font-extrabold text-center p-14">{title}</h2>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
          <p className="mt-2">Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <svg
                className="h-12 w-12 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-red-800 mb-2">
              Error Loading Products
            </h3>
            <p className="text-sm text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <svg
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              No Products Found
            </h3>
            <p className="text-sm text-gray-600">
              No new arrivals are currently available.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="relative px-4">
            <Swiper
              modules={[Pagination, EffectFade]}
              spaceBetween={16}
              slidesPerView={1}
              pagination={{ clickable: true }}
              onSwiper={setSwiperInstance}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
              }}
              className="pb-12"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <ProductCard
                    product={product}
                    expanded={expandedProductId === product.id}
                    onToggleExpand={handleToggleExpand}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="text-center mt-8">
            <a
              href="/category-list"
              className="bg-transparent hover:bg-gray-900 text-black hover:text-white px-16 py-2 border border-gray-500 hover:border-transparent rounded-full text-sm font-medium transition-colors"
            >
              View All
            </a>
          </div>
          <hr className="my-6 mt-14 border-gray-300" />
        </>
      )}
    </div>
  );
};

// Main E-commerce Component
const NewArrival = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setLoading(true);
        setError(null);

        // Call the API service
        const response = await apiService.getNewArrivals();

        console.log("API Response:", response); // Debug log to see the actual response structure

        // Handle the Laravel response structure
        let productsArray = [];

        // Based on your JSON structure, the products are in response.data
        if (response && Array.isArray(response.data)) {
          productsArray = response.data;
        } else if (Array.isArray(response)) {
          // Direct array response
          productsArray = response;
        } else if (response && Array.isArray(response.products)) {
          // Response has products property with array
          productsArray = response.products;
        } else if (response && Array.isArray(response.items)) {
          // Response has items property with array
          productsArray = response.items;
        } else if (response && Array.isArray(response.results)) {
          // Response has results property with array
          productsArray = response.results;
        } else {
          console.error("Unexpected API response structure:", response);
          throw new Error("Invalid data format received from API");
        }

        // Validate that we have an array
        if (!Array.isArray(productsArray)) {
          throw new Error("Products data is not in the expected array format");
        }

        // Transform the API data to match your component structure
        const transformedData = productsArray.map((product) => ({
          id: product.id,
          name: product.name || "Unnamed Product",
          image: product.image,
          rating: 4.5,
          reviewCount: "450",
          currentPrice: parseFloat(product.price) || 0,
          originalPrice: product.original_price
            ? parseFloat(product.original_price)
            : null,
          discount: product.discount || null,
          description: product.description || "",
          category: product.category
            ? {
                id: product.category.id,
                name: product.category.name,
              }
            : null,
          slug: product.slug,
          stock: product.stock,
          created_at: product.created_at,
          updated_at: product.updated_at,
        }));

        console.log("Transformed data:", transformedData); // Debug log
        setNewArrivals(transformedData);
      } catch (err) {
        console.error("Failed to fetch new arrivals:", err);
        setError(
          err.message || "Failed to load products. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #000;
          background: rgba(255, 255, 255, 0.8);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        .swiper-pagination-bullet-active {
          background: #000;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>

      <ProductSection
        title="NEW ARRIVALS"
        products={newArrivals}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default NewArrival;
