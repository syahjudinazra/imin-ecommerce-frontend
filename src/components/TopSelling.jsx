import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Product Card Component
const ProductCard = ({ product }) => {
  const {
    name,
    image,
    rating,
    reviewCount,
    currentPrice,
    originalPrice,
    discount,
  } = product;

  return (
    <div className="px-4">
      <div className="bg-gray-100 h-72 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
        <div className="flex flex-col rounded-lg overflow-hidden transition-all duration-300">
          <div className={`relative flex items-center justify-center p-4`}>
            <img src={image} alt={name} className="object-contain" />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-medium">{name}</h3>
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
      <h2 className="text-4xl font-extrabold text-center p-14">{title}</h2>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2">Loading products...</p>
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
const TopSelling = () => {
  const [topSellings, setTopSellings] = useState([]);
  const [loading, setLoading] = useState(false);

  // Enhanced dummy data with descriptions and features
  const dummyTopSellings = [
    {
      id: 1,
      name: "Falcon 1",
      image: "/src/assets/images/falcon-1.png",
      rating: 4.5,
      reviewCount: "49",
      currentPrice: 120,
      originalPrice: null,
      discount: null,
      description:
        "The Falcon 1 is our latest compact drone featuring 4K video recording and a 30-minute flight time.",
      features: [
        "4K Ultra HD Camera",
        "30-minute flight time",
        "Obstacle avoidance",
        "Follow-me mode",
      ],
    },
    {
      id: 2,
      name: "D4-503",
      image: "/src/assets/images/d-503.png",
      rating: 3.5,
      reviewCount: "35",
      currentPrice: 240,
      originalPrice: 320,
      discount: 25,
      description:
        "The D4-503 is our waterproof drone that can land and take off from water surfaces.",
      features: [
        "Waterproof design",
        "Floats on water",
        "1080p HD Camera",
        "25-minute flight time",
      ],
    },
    {
      id: 3,
      name: "Crane 1",
      image: "/src/assets/images/crane-1.png",
      rating: 4.5,
      reviewCount: "45",
      currentPrice: 180,
      originalPrice: null,
      discount: null,
      description:
        "The Crane 1 is built for speed, reaching up to 80 mph with precision controls for racing enthusiasts.",
      features: [
        "Top speed: 80 mph",
        "Carbon fiber frame",
        "Racing controller",
        "FPV compatibility",
      ],
    },
    {
      id: 4,
      name: "D1",
      image: "/src/assets/images/d1.png",
      rating: 4.5,
      reviewCount: "45",
      currentPrice: 130,
      originalPrice: 160,
      discount: 20,
      description:
        "The Lark 1 is perfect for beginners with easy controls and a durable frame that can withstand crashes.",
      features: [
        "Crash-resistant frame",
        "One-button takeoff & landing",
        "Headless mode",
        "15-minute flight time",
      ],
    },
    {
      id: 5,
      name: "Falcon 1",
      image: "/src/assets/images/falcon-1.png",
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
          setTopSellings(dummyTopSellings);
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
        title="TOP SELLING"
        products={topSellings}
        loading={loading}
      />
    </div>
  );
};

export default TopSelling;
