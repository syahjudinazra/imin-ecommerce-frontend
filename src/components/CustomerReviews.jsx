import { useState, useEffect } from "react";
import { Star, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { apiService } from "../services/api";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use your API service to fetch reviews
        const reviewsData = await apiService.getReviews({
          limit: 10,
          verified: true,
          rating: 4, // minimum rating
          sort: "-createdAt", // sort by newest first
        });

        // Transform the data to match your component structure
        // Adjust field mappings based on your actual API response structure
        const transformedReviews = reviewsData.map((review) => ({
          id: review.id || review._id,
          name:
            review.customerName ||
            review.customer?.name ||
            review.user?.name ||
            review.name ||
            "Anonymous",
          rating: review.rating || 5,
          verified: review.verified || review.isVerified || false,
          text:
            review.comment ||
            review.review ||
            review.text ||
            review.description,
          date: review.createdAt || review.date || review.created_at,
          productId: review.productId || review.product_id,
          productName: review.productName || review.product?.name,
        }));

        setReviews(transformedReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err.message || "Failed to load reviews");

        // Optional: Set fallback/mock data if API fails (remove in production)
        setReviews([
          {
            id: 1,
            name: "Sarah M.",
            rating: 5,
            verified: true,
            text: "\"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.\"",
          },
          {
            id: 2,
            name: "Alex K.",
            rating: 5,
            verified: true,
            text: '"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."',
          },
          {
            id: 3,
            name: "James L.",
            rating: 5,
            verified: true,
            text: "\"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.\"",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Function to refresh reviews
  const refreshReviews = async () => {
    try {
      setError(null);
      const reviewsData = await apiService.getReviews({
        limit: 10,
        verified: true,
        rating: 4,
        sort: "-createdAt",
      });

      const transformedReviews = reviewsData.map((review) => ({
        id: review.id || review._id,
        name:
          review.customerName ||
          review.customer?.name ||
          review.user?.name ||
          review.name ||
          "Anonymous",
        rating: review.rating || 5,
        verified: review.verified || review.isVerified || false,
        text:
          review.comment || review.review || review.text || review.description,
        date: review.createdAt || review.date || review.created_at,
        productId: review.productId || review.product_id,
        productName: review.productName || review.product?.name,
      }));

      setReviews(transformedReviews);
    } catch (err) {
      setError(err.message || "Failed to refresh reviews");
    }
  };

  const renderRatingStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={20}
          className={
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
          }
        />
      ));
  };

  const SkeletonLoader = () => (
    <div className="bg-white p-6 rounded-lg h-64 animate-pulse">
      <div className="flex mb-2">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 bg-gray-200 rounded-full mr-1"
            ></div>
          ))}
      </div>
      <div className="h-5 bg-gray-200 rounded w-24 mb-4"></div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  const ErrorMessage = () => (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-red-600 mb-2">
        <svg
          className="w-8 h-8 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-red-800 mb-1">
        Unable to load reviews
      </h3>
      <p className="text-red-600 mb-3">{error}</p>
      <button
        onClick={refreshReviews}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  // Slider implementation
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow =
    window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
  const maxSlide = Math.max(0, reviews.length - slidesToShow);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // Auto-play functionality (optional)
  useEffect(() => {
    if (reviews.length > slidesToShow) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => {
          const next = prev + 1;
          return next > maxSlide ? 0 : next;
        });
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [reviews.length, slidesToShow, maxSlide]);

  return (
    <div className="container mx-auto py-18">
      <div className="mx-auto">
        <div className="flex justify-between items-center my-12">
          <h2 className="text-4xl font-extrabold tracking-tight">
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex space-x-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0 || loading}
              className="focus:outline-none hover:bg-gray-900 hover:text-white rounded-full p-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Previous review"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide >= maxSlide || loading}
              className="focus:outline-none hover:bg-gray-900 hover:text-white rounded-full p-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Next review"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
          </div>
        ) : error && reviews.length === 0 ? (
          <ErrorMessage />
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No reviews available at the moment.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${
                  currentSlide * (100 / slidesToShow)
                }%)`,
                width: `${(reviews.length / slidesToShow) * 100}%`,
              }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / reviews.length}%` }}
                >
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full hover:shadow-md transition-shadow">
                    <div className="flex mb-4">
                      {renderRatingStars(review.rating)}
                    </div>
                    <div className="flex items-center mb-3">
                      <h3 className="font-medium text-lg">{review.name}</h3>
                      {review.verified && (
                        <div
                          className="ml-2 text-green-500"
                          title="Verified Purchase"
                        >
                          <CheckCircle size={16} className="fill-green-500" />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm mb-2">
                      {review.text}
                    </p>
                    {review.productName && (
                      <p className="text-xs text-gray-400 mt-2">
                        Product: {review.productName}
                      </p>
                    )}
                    {review.date && (
                      <p className="text-xs text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array(Math.ceil(reviews.length / slidesToShow))
                .fill(0)
                .map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentSlide === index ? "bg-gray-800" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
