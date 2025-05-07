import React, { useState, useEffect } from "react";

function HeroSection() {
  // State to track if image is loaded
  const [imageLoaded, setImageLoaded] = useState(false);

  // Simulate image loading
  useEffect(() => {
    // Simulate network delay (you would remove this in production)
    const timer = setTimeout(() => {
      setImageLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 py-6 px-4 md:py-14 md:px-20 lg:px-48">
      {/* Left section with text content */}
      <div className="container mx-auto lg:w-1/2 flex flex-col justify-center pr-0 lg:pr-4 mb-8 lg:mb-0">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
          FIND THE DEVICE
          <br />
          THAT SUITS YOUR
          <br />
          NEEDS
        </h1>

        <p className="text-gray-700 mb-6 md:mb-8 max-w-lg">
          Imin is a POS hardware device provider company that has many types of
          devices according to your business needs.
        </p>

        <button className="bg-black text-white py-2 px-6 rounded-full w-40 hover:bg-gray-800 transition-colors">
          Shop Now
        </button>

        <div className="flex mt-8 md:mt-12 lg:mt-16 space-x-6 md:space-x-12 lg:space-x-24 overflow-x-auto pb-2">
          <div className="flex flex-col flex-shrink-0">
            <span className="text-xl md:text-2xl lg:text-3xl font-bold">
              200+
            </span>
            <span className="text-xs md:text-sm">International Brands</span>
          </div>

          <div className="flex flex-col flex-shrink-0">
            <span className="text-xl md:text-2xl lg:text-3xl font-bold">
              2,000+
            </span>
            <span className="text-xs md:text-sm">High-Quality Products</span>
          </div>

          <div className="flex flex-col flex-shrink-0">
            <span className="text-xl md:text-2xl lg:text-3xl font-bold">
              30,000+
            </span>
            <span className="text-xs md:text-sm">Happy Customers</span>
          </div>
        </div>
      </div>

      {/* Right section with device images - Visible on all screens but positioned differently */}
      <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
        {/* Star decorations - Hidden on mobile/tablet, visible on desktop */}
        <div className="hidden lg:block absolute top-0 right-0">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 0L25 15H40L27.5 24.5L32.5 40L20 30L7.5 40L12.5 24.5L0 15H15L20 0Z"
              fill="black"
            />
          </svg>
        </div>

        <div className="hidden lg:block absolute left-0 top-1/3">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 0L25 15H40L27.5 24.5L32.5 40L20 30L7.5 40L12.5 24.5L0 15H15L20 0Z"
              fill="black"
            />
          </svg>
        </div>

        {/* Device images container with flex-end to align at bottom */}
        <div className="flex h-full items-end w-full md:w-4/5 lg:w-full relative">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-300 animate-pulse rounded-lg"></div>
          )}

          {/* Actual image - hidden until loaded */}
          <img
            src="/src/assets/images/Crane-1-Hero.webp"
            alt="Crane-1"
            className={`w-full ${imageLoaded ? "block" : "hidden"}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
