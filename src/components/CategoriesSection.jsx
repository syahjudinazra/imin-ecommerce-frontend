import React, { useState } from "react";

const categories = [
  {
    title: "Kitchen",
    imageUrl: "/src/assets/images/kitchen-category.png",
    colSpan: 1,
  },
  {
    title: "Retail",
    imageUrl: "/src/assets/images/retail-category.png",
    colSpan: 2,
  },
  {
    title: "Self Service",
    imageUrl: "/src/assets/images/self-service-category.png",
    colSpan: 2,
  },
  {
    title: "Mobility",
    imageUrl: "/src/assets/images/mobility-category.png",
    colSpan: 1,
  },
];

export default function CategoriesSection() {
  const [loadedImages, setLoadedImages] = useState({});
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="container mx-auto bg-gray-100 rounded-xl p-14">
      <h2 className="text-center text-4xl font-extrabold mb-12">
        BROWSE BY CATEGORIES
      </h2>
      <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`relative h-48 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
              category.colSpan === 2 ? "md:col-span-2" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {!loadedImages[index] && (
              <div className="w-full h-full bg-gray-300 animate-pulse"></div>
            )}
            <img
              src={category.imageUrl}
              alt={category.title}
              onLoad={() => handleImageLoad(index)}
              className={`w-full h-full object-cover absolute top-0 left-0 transition-all duration-300 ${
                loadedImages[index] ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                hoveredIndex === index ? "opacity-0" : "opacity-30"
              }`}
            ></div>
            {loadedImages[index] && (
              <div
                className={`absolute top-2 left-2 font-semibold text-lg z-10 transition-all duration-300 ${
                  hoveredIndex === index
                    ? "text-white bg-black bg-opacity-50 px-2 py-1 rounded"
                    : "text-white"
                }`}
              >
                {category.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
