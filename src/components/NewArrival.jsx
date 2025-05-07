import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Product Card Component
const ProductCard = ({ product, expanded, onToggleExpand }) => {
  const {
    id,
    name,
    image,
    rating,
    reviewCount,
    currentPrice,
    originalPrice,
    discount,
    description,
    features,
  } = product;

  const handleClick = () => {
    onToggleExpand(id);
  };

  return (
    <div
      className={`flex flex-col bg-gray-100 rounded-lg overflow-hidden transition-all duration-300 ${
        expanded ? "shadow-xl" : "shadow-md hover:shadow-lg"
      }`}
      onClick={handleClick}
    >
      <div
        className={`relative ${
          expanded ? "h-48" : "h-40"
        } flex items-center justify-center p-4`}
      >
        <img src={image} alt={name} className="mt-20 object-contain" />
        {discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
            -{discount}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium">{name}</h3>
        <div className="flex items-center mt-1">
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
          <span className="text-xs text-gray-500 ml-1">{reviewCount}</span>
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

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 space-y-3 animate-fadeIn">
            <p className="text-sm text-gray-700">{description}</p>

            {features && features.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-1">Features:</h4>
                <ul className="text-sm text-gray-700 pl-5 list-disc">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 flex space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex-1">
                Add to Cart
              </button>
              <button className="border border-gray-300 hover:bg-gray-100 px-3 py-2 rounded-md">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Section Component
const ProductSection = ({ title, products, loading }) => {
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
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading products...</p>
        </div>
      ) : (
        <>
          <div className="relative px-4">
            <Swiper
              modules={[Navigation, Pagination, EffectFade]}
              spaceBetween={16}
              slidesPerView={1}
              navigation
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
            <button className="bg-transparent hover:bg-gray-900 text-black hover:text-white px-16 py-2 border border-gray-500 hover:border-transparent rounded-full text-sm font-medium transition-colors">
              View All
            </button>
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
  const [loading, setLoading] = useState(false);

  // Enhanced dummy data with descriptions and features
  const dummyNewArrivals = [
    {
      id: 1,
      name: "Falcon 2",
      image: "/src/assets/images/falcon-2.png",
      rating: 4.5,
      reviewCount: "49",
      currentPrice: 120,
      originalPrice: null,
      discount: null,
      description:
        "The Falcon 2 is our latest compact drone featuring 4K video recording and a 30-minute flight time.",
      features: [
        "4K Ultra HD Camera",
        "30-minute flight time",
        "Obstacle avoidance",
        "Follow-me mode",
      ],
    },
    {
      id: 2,
      name: "Swan 1",
      image: "/src/assets/images/swan-1.png",
      rating: 3.5,
      reviewCount: "35",
      currentPrice: 240,
      originalPrice: 320,
      discount: 25,
      description:
        "The Swan 1 is our waterproof drone that can land and take off from water surfaces.",
      features: [
        "Waterproof design",
        "Floats on water",
        "1080p HD Camera",
        "25-minute flight time",
      ],
    },
    {
      id: 3,
      name: "Swift 2",
      image: "/src/assets/images/swift-2.png",
      rating: 4.5,
      reviewCount: "45",
      currentPrice: 180,
      originalPrice: null,
      discount: null,
      description:
        "The Swift 2 is built for speed, reaching up to 80 mph with precision controls for racing enthusiasts.",
      features: [
        "Top speed: 80 mph",
        "Carbon fiber frame",
        "Racing controller",
        "FPV compatibility",
      ],
    },
    {
      id: 4,
      name: "Lark 1",
      image: "/src/assets/images/lark-1.png",
      rating: 5.0,
      reviewCount: "78",
      currentPrice: 350,
      originalPrice: 400,
      discount: 12,
      description:
        "The Eagle Pro is designed for professional photographers with a stabilized gimbal and high-quality sensor.",
      features: [
        "3-axis gimbal stabilization",
        "1-inch CMOS sensor",
        "RAW photo format",
        "45-minute flight time",
      ],
    },
    {
      id: 5,
      name: "Lark 1",
      image: "/src/assets/images/lark-1.png",
      rating: 5.0,
      reviewCount: "78",
      currentPrice: 350,
      originalPrice: 400,
      discount: 12,
      description:
        "The Eagle Pro is designed for professional photographers with a stabilized gimbal and high-quality sensor.",
      features: [
        "3-axis gimbal stabilization",
        "1-inch CMOS sensor",
        "RAW photo format",
        "45-minute flight time",
      ],
    },
  ];

  // Simulating API call
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Using dummy data with a simulated delay
        setTimeout(() => {
          setNewArrivals(dummyNewArrivals);
          setLoading(false);
        }, 800); // Simulate network delay
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
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
      />

      {/* You can add more sections here, like "Best Sellers", "On Sale", etc. */}
    </div>
  );
};

export default NewArrival;
