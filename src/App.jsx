import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import ClientSection from "./components/Layouts/ClientSection";
import MenuSection from "./components/Navbar/MenuSection";
import NewArrival from "./components/NewArrival";
import TopSelling from "./components/TopSelling";
import CategoriesSection from "./components/CategoriesSection";
import CustomerReviews from "./components/CustomerReviews";
import BannerOffering from "./components/Navbar/BannerOffering";
import Footer from "./components/Layouts/FooterSection";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/CategoryPage";
import WhatsappFloating from "./components/Buttons/WhatsappFloating";
import CartPage from "./pages/CartPage";

// Homepage component to contain all the sections of the home page
const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      {/* Client Section */}
      <ClientSection />
      {/* New Arrival Section */}
      <NewArrival />
      {/* Top Selling Section */}
      <TopSelling />
      {/* Browse Categories */}
      <CategoriesSection />
      {/* Customer Reviews */}
      <CustomerReviews />
    </>
  );
};

function App() {
  return (
    <Router>
      {/* Navbar appears on all pages */}
      <MenuSection />

      <Routes>
        {/* Home route */}
        <Route path="/" element={<HomePage />} />

        {/* Product details route  */}
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Category Route */}
        <Route path="/category-list" element={<CategoryPage />} />

        {/* Cart Route} */}
        <Route path="/cart" element={<CartPage />} />

        {/* Other routes */}
        <Route
          path="/on-sale"
          element={
            <div className="container mx-auto py-20 px-4">
              <h1 className="text-3xl font-bold mb-8">On Sale Products</h1>
            </div>
          }
        />
        <Route
          path="/new-arrivals"
          element={
            <div className="container mx-auto py-20 px-4">
              <h1 className="text-3xl font-bold mb-8">New Arrivals</h1>
            </div>
          }
        />
        <Route
          path="/brands"
          element={
            <div className="container mx-auto py-20 px-4">
              <h1 className="text-3xl font-bold mb-8">Our Brands</h1>
            </div>
          }
        />
        <Route
          path="/cart"
          element={
            <div className="container mx-auto py-20 px-4">
              <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            </div>
          }
        />
        <Route
          path="/account"
          element={
            <div className="container mx-auto py-20 px-4">
              <h1 className="text-3xl font-bold mb-8">My Account</h1>
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <div className="container mx-auto py-20 px-4">
              <h1 className="text-3xl font-bold mb-8">Search Results</h1>
            </div>
          }
        />
      </Routes>
      {/* WhatsApp Floating Button */}
      <WhatsappFloating />

      {/* Banner appears on all pages */}
      <BannerOffering />
      {/* Footer appears on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
