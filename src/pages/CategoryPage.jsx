import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  Star,
  Filter,
  SortDesc,
  X,
} from "lucide-react";

export default function CategoryPage() {
  const [priceRange, setPriceRange] = useState([50, 220]);
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    colors: true,
    storage: true,
    retail: false,
    mobile: false,
    selfService: false,
    kitchen: false,
    weight: false,
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");

  const toggleFilter = (filter) => {
    setExpandedFilters({
      ...expandedFilters,
      [filter]: !expandedFilters[filter],
    });
  };

  // Product colors
  const colors = [
    { id: "red", bg: "bg-red-500" },
    { id: "black", bg: "bg-gray-900" },
    { id: "white", bg: "bg-gray-300" },
  ];

  const products = [
    {
      id: 1,
      name: "Crane I Retail",
      image: "/src/assets/images/crane-1.png",
      rating: 4.5,
      reviews: 450,
      price: 145,
      originalPrice: null,
      discount: null,
    },
    {
      id: 2,
      name: "M2-203",
      image: "/src/assets/images/M2-203.png",
      rating: 4.5,
      reviews: 450,
      price: 180,
      originalPrice: null,
      discount: null,
    },
    {
      id: 3,
      name: "D4-505",
      image: "/src/assets/images/d-503.png",
      rating: 4.9,
      reviews: 520,
      price: 120,
      originalPrice: 160,
      discount: 25,
    },
    {
      id: 4,
      name: "D4-503",
      image: "/src/assets/images/d-503.png",
      rating: 4.9,
      reviews: 520,
      price: 240,
      originalPrice: 260,
      discount: 8,
    },
    {
      id: 5,
      name: "Falcon 2 With Payment Case",
      image: "/src/assets/images/falcon-2.png",
      rating: 4.8,
      reviews: 540,
      price: 180,
      originalPrice: null,
      discount: null,
    },
    {
      id: 6,
      name: "Falcon 2 Printer Dock",
      image: "/src/assets/images/swan-1.png",
      rating: 4.9,
      reviews: 450,
      price: 130,
      originalPrice: 160,
      discount: 20,
    },
    {
      id: 7,
      name: "Lark 1 With Charging Dock",
      image: "/src/assets/images/lark-1.png",
      rating: 4.7,
      reviews: 320,
      price: 212,
      originalPrice: 232,
      discount: 9,
    },
    {
      id: 8,
      name: "S1 Kiosk",
      image: "/src/assets/images/d1.png",
      rating: 4.8,
      reviews: 450,
      price: 145,
      originalPrice: null,
      discount: null,
    },
    {
      id: 9,
      name: "Swift 1 Pro",
      image: "/src/assets/images/swift-2-details.png",
      rating: 4.6,
      reviews: 320,
      price: 80,
      originalPrice: null,
      discount: null,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <a href="#" className="hover:text-gray-700">
          Home
        </a>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-900">All Devices</span>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>

      {/* Mobile Filter Toggle Button */}
      <div className="flex justify-between items-center mb-4 lg:hidden">
        <div>
          <p className="text-sm text-gray-500">Showing 1-10 of 100 Products</p>
        </div>
        <button
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-md"
          onClick={() => setMobileFilterOpen(true)}
        >
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      <div className="flex flex-wrap mb-20">
        {/* Desktop Sidebar Filters - Hidden on mobile */}
        <div className="hidden lg:block lg:w-1/5 pr-4">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Filters</h3>
              <button className="text-gray-500">
                <Filter size={18} />
              </button>
            </div>

            {/* Filter Categories */}
            <div className="space-y-4">
              {/* Retail */}
              <div className="border-b pb-2">
                <button
                  className="flex justify-between items-center w-full text-left py-2"
                  onClick={() => toggleFilter("retail")}
                >
                  <span className="font-medium">Retail</span>
                  <ChevronRight size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Mobile */}
              <div className="border-b pb-2">
                <button
                  className="flex justify-between items-center w-full text-left py-2"
                  onClick={() => toggleFilter("mobile")}
                >
                  <span className="font-medium">Mobile</span>
                  <ChevronRight size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Self Service */}
              <div className="border-b pb-2">
                <button
                  className="flex justify-between items-center w-full text-left py-2"
                  onClick={() => toggleFilter("selfService")}
                >
                  <span className="font-medium">Self Service</span>
                  <ChevronRight size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Kitchen */}
              <div className="border-b pb-2">
                <button
                  className="flex justify-between items-center w-full text-left py-2"
                  onClick={() => toggleFilter("kitchen")}
                >
                  <span className="font-medium">Kitchen</span>
                  <ChevronRight size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Weight */}
              <div className="border-b pb-2">
                <button
                  className="flex justify-between items-center w-full text-left py-2"
                  onClick={() => toggleFilter("weight")}
                >
                  <span className="font-medium">Weight</span>
                  <ChevronRight size={18} className="text-gray-500" />
                </button>
              </div>

              {/* Price */}
              <div className="border-b pb-4">
                <button
                  className="flex justify-between items-center w-full text-left py-2"
                  onClick={() => toggleFilter("price")}
                >
                  <span className="font-medium">Price</span>
                  {expandedFilters.price ? (
                    <ChevronUp size={18} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-500" />
                  )}
                </button>

                {expandedFilters.price && (
                  <div className="mt-2 px-1">
                    <div className="relative pt-6 pb-1">
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="w-full flex justify-between mt-2 text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Colors */}
              <div className="border-b pb-4">
                <button
                  className="flex justify-between items-center w-full text-left py-2"
                  onClick={() => toggleFilter("colors")}
                >
                  <span className="font-medium">Colors</span>
                  {expandedFilters.colors ? (
                    <ChevronUp size={18} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-500" />
                  )}
                </button>

                {expandedFilters.colors && (
                  <div className="mt-2 flex gap-2">
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
                )}
              </div>

              {/* Storage */}
              <div className="border-b pb-4">
                <button
                  className="flex justify-between items-center w-full text-left py-2"
                  onClick={() => toggleFilter("storage")}
                >
                  <span className="font-medium">Storage</span>
                  {expandedFilters.storage ? (
                    <ChevronUp size={18} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-500" />
                  )}
                </button>

                {expandedFilters.storage && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                      16GB
                    </button>
                    <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                      64GB
                    </button>
                    <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                      128GB
                    </button>
                    <button className="py-1 px-2 text-xs border border-gray-200 rounded-full bg-black text-white text-center">
                      512GB
                    </button>
                    <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                      1TB
                    </button>
                    <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                      2TB
                    </button>
                    <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                      4TB
                    </button>
                    <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                      8TB
                    </button>
                    <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                      512GB
                    </button>
                  </div>
                )}
              </div>

              {/* Apply Filter Button */}
              <div className="mt-6">
                <button className="w-full py-3 bg-black text-white font-medium rounded">
                  Apply Filter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-4/5 mt-6 lg:mt-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">All Devices</h1>
            <div className="flex items-center text-sm">
              <span className="text-gray-500 mr-4">
                Showing 1-9 of 100 Products
              </span>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">Sort by:</span>
                <div className="relative">
                  <select className="appearance-none bg-transparent pr-8 pl-2 py-1 border-b border-gray-300 focus:outline-none">
                    <option>Most Popular</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="p-4">
                <div className="relative bg-gray-100 h-48 md:h-72 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 mb-4 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain h-40 md:h-full"
                  />
                </div>
                <h3 className="font-medium mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={
                          i < Math.floor(product.rating)
                            ? "currentColor"
                            : "none"
                        }
                        className={
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {product.reviews}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-lg">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-400 line-through ml-2">
                        ${product.originalPrice}
                      </span>
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                        {product.discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Filter Bottom Sheet */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 bg-white/10 backdrop-blur-sm z-50 flex items-end lg:hidden">
              <div className="bg-white rounded-t-xl w-full max-h-[80vh] overflow-y-auto animate-slide-up">
                <div className="bg-white border-b pb-2 p-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">Filters</h3>
                  <button
                    className="p-1 rounded-full hover:bg-gray-100"
                    onClick={() => setMobileFilterOpen(false)}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-4">
                  <div className="space-y-4">
                    {/* Retail */}
                    <div className="mb-2">
                      <button
                        className="flex justify-between items-center w-full text-left py-2"
                        onClick={() => toggleFilter("retail")}
                      >
                        <span className="font-medium">Retail</span>
                        <ChevronRight size={18} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Mobile */}
                    <div className="mb-2">
                      <button
                        className="flex justify-between items-center w-full text-left py-2"
                        onClick={() => toggleFilter("mobile")}
                      >
                        <span className="font-medium">Mobile</span>
                        <ChevronRight size={18} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Self Service */}
                    <div className="mb-2">
                      <button
                        className="flex justify-between items-center w-full text-left py-2"
                        onClick={() => toggleFilter("selfService")}
                      >
                        <span className="font-medium">Self Service</span>
                        <ChevronRight size={18} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Kitchen */}
                    <div className="mb-2">
                      <button
                        className="flex justify-between items-center w-full text-left py-2"
                        onClick={() => toggleFilter("kitchen")}
                      >
                        <span className="font-medium">Kitchen</span>
                        <ChevronRight size={18} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Weight */}
                    <div className="mb-2">
                      <button
                        className="flex justify-between items-center w-full text-left py-2"
                        onClick={() => toggleFilter("weight")}
                      >
                        <span className="font-medium">Weight</span>
                        <ChevronRight size={18} className="text-gray-500" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="border-b pb-4">
                      <button
                        className="flex justify-between items-center w-full text-left py-2"
                        onClick={() => toggleFilter("price")}
                      >
                        <span className="font-medium">Price</span>
                        {expandedFilters.price ? (
                          <ChevronUp size={18} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={18} className="text-gray-500" />
                        )}
                      </button>

                      {expandedFilters.price && (
                        <div className="mt-2 px-1">
                          <div className="relative pt-6 pb-1">
                            <input
                              type="range"
                              min="0"
                              max="300"
                              value={priceRange[1]}
                              onChange={(e) =>
                                setPriceRange([
                                  priceRange[0],
                                  parseInt(e.target.value),
                                ])
                              }
                              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="w-full flex justify-between mt-2 text-sm">
                              <span>${priceRange[0]}</span>
                              <span>${priceRange[1]}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Colors */}
                    <div className="border-b pb-4">
                      <button
                        className="flex justify-between items-center w-full text-left py-2"
                        onClick={() => toggleFilter("colors")}
                      >
                        <span className="font-medium">Colors</span>
                        {expandedFilters.colors ? (
                          <ChevronUp size={18} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={18} className="text-gray-500" />
                        )}
                      </button>

                      {expandedFilters.colors && (
                        <div className="mt-2 flex gap-2">
                          <button className="w-8 h-8 rounded-full bg-black ring-2 ring-offset-2 ring-black"></button>
                          <button className="w-8 h-8 rounded-full bg-white border border-gray-300"></button>
                        </div>
                      )}
                    </div>

                    {/* Storage */}
                    <div className="border-b pb-4">
                      <button
                        className="flex justify-between items-center w-full text-left py-2"
                        onClick={() => toggleFilter("storage")}
                      >
                        <span className="font-medium">Storage</span>
                        {expandedFilters.storage ? (
                          <ChevronUp size={18} className="text-gray-500" />
                        ) : (
                          <ChevronDown size={18} className="text-gray-500" />
                        )}
                      </button>

                      {expandedFilters.storage && (
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                            16GB
                          </button>
                          <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                            64GB
                          </button>
                          <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                            128GB
                          </button>
                          <button className="py-1 px-2 text-xs border border-gray-200 rounded-full bg-black text-white text-center">
                            512GB
                          </button>
                          <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                            1TB
                          </button>
                          <button className="py-1 px-2 text-xs border border-gray-200 rounded-full text-center">
                            2TB
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Apply Filter Button */}
                    <div className="py-4 bottom-0 mt-4">
                      <button
                        className="w-full py-3 bg-black text-white font-medium rounded"
                        onClick={() => setMobileFilterOpen(false)}
                      >
                        Apply Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}

          <div className="flex justify-center items-center space-x-4 mt-8">
            <button className="flex items-center text-gray-600 px-4 py-2 rounded hover:bg-gray-100">
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </button>
            <div className="flex items-center space-x-1">
              <button className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white rounded-full">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full">
                3
              </button>
              <span className="px-2">...</span>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full">
                8
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full">
                9
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full">
                10
              </button>
            </div>
            <button className="flex items-center text-gray-600 px-4 py-2 rounded hover:bg-gray-100">
              Next
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
