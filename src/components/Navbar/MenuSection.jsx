import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../Layouts/Logo";
import { MegaMenu } from "primereact/megamenu";

function MenuSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);

  // Check for mobile viewport on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navHeight = navRef.current.offsetHeight;
        const scrollPosition = window.scrollY;

        // Make sticky after scrolling past the navbar height
        setIsSticky(scrollPosition > navHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Convert menu items to use Link components for routing
  const createProductLink = (productId, label) => {
    return {
      template: (item) => (
        <Link
          to={`/product/${productId}`}
          className="block py-2 font-normal hover:underline transition-all duration-200"
        >
          {item.label}
        </Link>
      ),
      label: label,
      className: "py-2 font-normal",
    };
  };

  const items = [
    {
      label: "Shop",
      className: "p-2 font-medium",
      items: [
        [
          {
            label: "Desktop",
            className: "font-normal p-3 mb-2 active:underline focus:underline",
            items: [
              createProductLink("d1-series", "D1 Series"),
              createProductLink("d2-series", "D2 Series"),
              createProductLink("d3-series", "D3 Series"),
              createProductLink("d4-series", "D4 Series"),
              createProductLink("swan-series", "Swan Series"),
              createProductLink("falcon-series", "Falcon Series"),
            ],
          },
        ],
        [
          {
            label: "Mobile",
            className: "font-normal p-3 mb-2 active:underline focus:underline",
            items: [
              createProductLink("m2-series", "M2 Series"),
              createProductLink("swift-1", "Swift 1"),
              createProductLink("m2-max", "M2 Max"),
              createProductLink("m2-pro", "M2 Pro"),
            ],
          },
        ],
        [
          {
            label: "Self Service",
            className: "font-normal p-3 mb-2 active:underline focus:underline",
            items: [
              createProductLink("crane-series", "Crane Series"),
              createProductLink("s1", "S1"),
            ],
          },
        ],
        [
          {
            label: "Kitchen",
            className: "font-normal p-3 mb-2 active:underline focus:underline",
            items: [
              createProductLink("k1", "K1"),
              createProductLink("k2", "K2"),
            ],
          },
        ],
        [
          {
            label: "Weight",
            className: "font-normal p-3 mb-2 active:underline focus:underline",
            items: [createProductLink("d1w-series", "D1W Series")],
          },
        ],
      ],
    },
    {
      label: "On Sale",
      className: "p-3 mx-2 font-medium active:underline focus:underline",
      template: (item) => (
        <Link
          to="/on-sale"
          className="block p-3 mx-2 font-medium hover:underline"
        >
          {item.label}
        </Link>
      ),
    },
    {
      label: "New Arrivals",
      className: "p-3 mx-2 font-medium active:underline focus:underline",
      template: (item) => (
        <Link
          to="/new-arrivals"
          className="block p-3 mx-2 font-medium hover:underline"
        >
          {item.label}
        </Link>
      ),
    },
    {
      label: "Brands",
      className: "p-3 mx-2 font-medium active:underline focus:underline",
      template: (item) => (
        <Link
          to="/brands"
          className="block p-3 mx-2 font-medium hover:underline"
        >
          {item.label}
        </Link>
      ),
    },
  ];

  const IminLogo = () => (
    <Link to="/">
      <Logo />
    </Link>
  );

  // CSS classes for sticky behavior
  const stickyClasses = isSticky
    ? "fixed top-0 left-0 right-0 shadow-md z-50 transition-all duration-300 bg-white"
    : "";

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Placeholder div to prevent content jump when navbar becomes fixed */}
      {isSticky && (
        <div style={{ height: navRef.current?.offsetHeight || "0px" }} />
      )}

      <div ref={navRef} className={`w-full ${stickyClasses}`}>
        {isMobile ? (
          // Mobile Layout - similar to the image shared
          <nav className="flex items-center justify-between px-4 py-3">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* IMIN Logo (mobile view) */}
            <IminLogo />

            {/* Right Icons Group */}
            <div className="flex items-center space-x-3">
              {/* Search Icon */}
              <button
                className="p-1"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Shopping Cart Icon */}
              <Link to="/cart" className="p-1" aria-label="Cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>

              {/* User Icon */}
              <Link to="/account" className="p-1" aria-label="Account">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Dropdown (shown when mobileMenuOpen is true) */}
            {mobileMenuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 py-4 px-6">
                <ul className="space-y-4">
                  <li className="py-2">
                    <details className="group">
                      <summary className="flex items-center justify-between font-medium cursor-pointer">
                        Shop
                        <span className="transition group-open:rotate-180">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </span>
                      </summary>
                      <ul className="pl-4 mt-2 space-y-2">
                        <li>
                          <Link
                            to="/product/d1-series"
                            className="block py-1 hover:text-blue-600"
                          >
                            D1 Series
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/product/d2-series"
                            className="block py-1 hover:text-blue-600"
                          >
                            D2 Series
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/product/m2-series"
                            className="block py-1 hover:text-blue-600"
                          >
                            M2 Series
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/product/crane-series"
                            className="block py-1 hover:text-blue-600"
                          >
                            Crane Series
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/product/k1"
                            className="block py-1 hover:text-blue-600"
                          >
                            K1
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li className="font-medium py-2">
                    <Link to="/on-sale" className="block hover:text-blue-600">
                      On Sale
                    </Link>
                  </li>
                  <li className="font-medium py-2">
                    <Link
                      to="/new-arrivals"
                      className="block hover:text-blue-600"
                    >
                      New Arrivals
                    </Link>
                  </li>
                  <li className="font-medium py-2">
                    <Link to="/brands" className="block hover:text-blue-600">
                      Brands
                    </Link>
                  </li>
                </ul>

                <div className="mt-6 py-2">
                  <form onSubmit={handleSearchSubmit}>
                    <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                      <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full px-4 py-2 bg-transparent outline-none text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="px-4 py-2"
                        aria-label="Search"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </nav>
        ) : (
          // Desktop Layout
          <nav className="container mx-auto flex items-center justify-between py-4 bg-white">
            {/* Logo */}
            <IminLogo />

            {/* Navigation Links */}
            <style>{`
              .p-megamenu-col-12 {
                background-color: #fff;
              }
              .p-menuitem-text:hover {
                border-bottom: 1px solid black;
                padding-bottom: 2px;
              }
              .p-megamenu-panel {
                width: max-content;
              }
              .p-megamenu-grid {
                margin-top: 1rem;
                width: 30%;
              }
            `}</style>
            <div>
              <MegaMenu
                model={items}
                orientation="horizontal"
                breakpoint="960px"
                className="border-none"
              />
            </div>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 max-w-md mx-6"
            >
              <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="bg-transparent border-none outline-none w-full text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="ml-2 text-gray-500 hover:text-gray-700"
                  aria-label="Search"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/cart"
                className="p-2 hover:text-blue-600 transition-colors"
                aria-label="Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
              <Link
                to="/account"
                className="p-2 hover:text-blue-600 transition-colors"
                aria-label="Account"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}

export default MenuSection;
