import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Star, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

export default function CustomerReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchReviews = () => {
      setTimeout(() => {
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
          {
            id: 4,
            name: "Emily R.",
            rating: 5,
            verified: true,
            text: '"The subscription service has transformed my wardrobe. Fresh, stylish clothes delivered right to my door each month - what more could I ask for?"',
          },
          {
            id: 5,
            name: "Michael T.",
            rating: 5,
            verified: true,
            text: '"As a fashion enthusiast, I can confidently say that Shop.co offers some of the most exquisite designs I\'ve ever experienced. Their attention to detail is unmatched."',
          },
        ]);
        setLoading(false);
      }, 1000); // 1 second loading simulation
    };

    fetchReviews();
  }, []);

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

  return (
    <div className="container mx-auto py-12">
      <div className=" mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex space-x-4">
            <button
              className="custom-prev-button focus:outline-none hover:bg-gray-900 hover:text-white rounded-full p-1"
              aria-label="Previous review"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              className="custom-next-button focus:outline-none hover:bg-gray-900 hover:text-white rounded-full p-1"
              aria-label="Next review"
            >
              <ArrowRight size={24} className="" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <SkeletonLoader key={index} />
              ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3.5 },
            }}
            navigation={{
              prevEl: ".custom-prev-button",
              nextEl: ".custom-next-button",
            }}
            className="reviews-swiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-full">
                  <div className="flex mb-4">
                    {renderRatingStars(review.rating)}
                  </div>
                  <div className="flex items-center mb-3">
                    <h3 className="font-medium text-lg">{review.name}</h3>
                    {review.verified && (
                      <div className="ml-2 text-green-500">
                        <CheckCircle size={16} className="fill-green-500" />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {review.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
