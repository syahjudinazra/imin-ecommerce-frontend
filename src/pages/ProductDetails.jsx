import { useState } from "react";
import { Star, Minus, Plus, MoreHorizontal } from "lucide-react";
import BannerOffering from "../components/Navbar/BannerOffering";
import ReferenceProduct from "../components/ReferenceProduct";

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("red");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [activeTab, setActiveTab] = useState("rating");
  const [quantity, setQuantity] = useState(1);

  // Product images
  const images = [
    "/src/assets/images/swift-2-details.png",
    "/src/assets/images/back-swift-2-details.png",
    "/src/assets/images/dock-swift-2-details.png",
    "/src/assets/images/open-swift-2-details.png",
  ];

  // Product colors
  const colors = [
    { id: "red", bg: "bg-red-500" },
    { id: "black", bg: "bg-gray-900" },
    { id: "white", bg: "bg-gray-300" },
  ];

  // Product sizes
  const sizes = ["4/64", "4/128", "8/128", "8/256"];

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: "Samantha D.",
      verified: true,
      rating: 5,
      date: "August 14, 2023",
      text: "I absolutely love this t-shirt! The design is so unique and the fabric is incredibly soft. It fits perfectly and I get compliments every time I wear it. Highly recommend for anyone who loves stylish and comfortable clothing!",
    },
    {
      id: 2,
      name: "Alex M.",
      verified: true,
      rating: 5,
      date: "August 15, 2023",
      text: "This t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UX/UI designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    },
    {
      id: 3,
      name: "Ethan R.",
      verified: true,
      rating: 4,
      date: "August 16, 2023",
      text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt!",
    },
    {
      id: 4,
      name: "Olivia P.",
      verified: true,
      rating: 4,
      date: "August 17, 2023",
      text: "As a UX/UI enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    },
    {
      id: 5,
      name: "Liam K.",
      verified: true,
      rating: 5,
      date: "August 18, 2023",
      text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion!",
    },
    {
      id: 6,
      name: "Ava H.",
      verified: true,
      rating: 5,
      date: "August 19, 2023",
      text: "I'm not just wearing a t-shirt, I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter!",
    },
  ];

  // Handle quantity change
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <div className="px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span>Shop</span>
          <span className="mx-2">›</span>
          <span className="font-medium">Device Name</span>
        </div>

        {/* Product Section */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Image Gallery */}
          <div className="w-full md:w-1/2">
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-24 bg-gray-100 border rounded-2xl cursor-pointer ${
                      selectedImage === index
                        ? "border-gray-500"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product thumbnail ${index + 1}`}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 border border-gray-500 rounded-4xl overflow-hidden">
                <img
                  src={images[selectedImage]}
                  alt="Product main view"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold">Swift 2</h1>

            {/* Rating */}
            <div className="flex items-center mt-2">
              {renderStars(4.5)}
              <span className="ml-2 text-sm text-gray-600">4.5/5</span>
            </div>

            {/* Price */}
            <div className="flex items-center mt-4">
              <span className="text-2xl font-bold">$260</span>
              <span className="ml-2 text-gray-500 line-through">$300</span>
              <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 text-xs font-medium rounded-full">
                -40%
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600">
              The Swift 2 is built for speed, reaching up to 80 mph with
              precision controls for racing enthusiasts.
            </p>

            {/* Color Selection */}
            <div className="mt-6">
              <h3 className="text-sm text-gray-700 mb-2">Select Colors</h3>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-8 h-8 rounded-full ${
                      color.bg
                    } flex items-center justify-center ${
                      selectedColor === color.id
                        ? "ring-2 ring-offset-2 ring-gray-800"
                        : ""
                    }`}
                  >
                    {selectedColor === color.id && (
                      <span className="text-white">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <h3 className="text-sm text-gray-700 mb-2">Choose Storage</h3>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mt-6 flex gap-4">
              <div className="flex items-center border border-gray-300 rounded-full">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 text-gray-600"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-12 text-center border-0 focus:ring-0"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 text-gray-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button className="flex-1 bg-black text-white py-2 px-4 rounded-full hover:bg-gray-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 border-b border-gray-200">
          <div className="flex space-x-8 justify-center">
            <button
              onClick={() => setActiveTab("details")}
              className={`w-lg pb-4 text-xl font-medium ${
                activeTab === "details"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab("rating")}
              className={`w-lg pb-4 text-xl font-medium ${
                activeTab === "rating"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Rating & Reviews
            </button>
            <button
              onClick={() => setActiveTab("faqs")}
              className={`w-lg pb-4 text-xl font-medium ${
                activeTab === "faqs"
                  ? "border-b-2 border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              FAQs
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "details" && (
            <div>
              <h2 className="text-lg font-medium">Product Details</h2>
              <p className="mt-4 text-gray-600">
                This premium t-shirt features a unique graphic design that
                stands out from the crowd. Made from 100% organic cotton, it's
                both eco-friendly and incredibly comfortable to wear. The
                breathable fabric ensures you stay cool even on the hottest
                days.
              </p>
              <ul className="mt-4 list-disc pl-5 text-gray-600">
                <li>100% organic cotton</li>
                <li>Machine washable</li>
                <li>Preshrunk to minimize shrinkage</li>
                <li>Reinforced stitching for durability</li>
                <li>Available in multiple colors and sizes</li>
              </ul>
            </div>
          )}

          {activeTab === "rating" && (
            <div>
              {/* Reviews Header */}
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">
                  All Reviews{" "}
                  <span className="text-gray-500 text-sm">(450)</span>
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button className="p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="relative">
                    <button className="flex items-center text-sm border rounded-full px-3 py-1">
                      <span>Latest</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                  </div>
                  <button className="bg-black text-white rounded-full px-4 py-2 text-sm">
                    Write a Review
                  </button>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        {renderStars(review.rating)}
                        <div className="mt-2 flex items-center">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                              ✓
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="text-gray-400">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="mt-2 text-gray-600 text-sm">{review.text}</p>
                    <p className="mt-3 text-xs text-gray-500">
                      Posted on {review.date}
                    </p>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-8 text-center">
                <button className="text-gray-600 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-900 hover:text-white transition-colors">
                  Load More Reviews
                </button>
              </div>
            </div>
          )}

          {activeTab === "faqs" && (
            <div>
              <h2 className="text-lg font-medium">
                Frequently Asked Questions
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-medium">What sizes are available?</h3>
                  <p className="mt-1 text-gray-600">
                    Our Swift 2 t-shirt is available in Small, Medium, Large,
                    and X-Large sizes.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">
                    How should I care for this t-shirt?
                  </h3>
                  <p className="mt-1 text-gray-600">
                    We recommend machine washing cold with like colors and
                    tumble dry low. Avoid using bleach and iron on low heat if
                    needed.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Is this t-shirt true to size?</h3>
                  <p className="mt-1 text-gray-600">
                    Yes, the Swift 2 t-shirt follows standard sizing. However,
                    if you prefer a looser fit, we recommend ordering one size
                    up.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">What is the return policy?</h3>
                  <p className="mt-1 text-gray-600">
                    We offer a 30-day return policy for unworn items in original
                    packaging. Shipping costs for returns are the responsibility
                    of the customer unless the item is defective.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ReferenceProduct />
      <BannerOffering />
    </div>
  );
}
