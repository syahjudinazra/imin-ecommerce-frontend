import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Minus,
  Plus,
  MoreHorizontal,
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
} from "lucide-react";
import ReferenceProduct from "../components/ReferenceProduct";
import { apiService, getImageUrl } from "../services/api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Product state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart, notification } = useCart();

  // UI state
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("rating");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Enhanced product data transformation
  const transformProductData = (productData) => {
    if (!productData) {
      throw new Error("No product data received");
    }

    // Handle different possible response structures
    const data = productData.data || productData;

    return {
      id: data.id || data.product_id || data.pk,
      name: data.name || data.title || "Unnamed Product",
      description: data.description || "No description available",
      price: parseFloat(data.price || data.current_price || 0),
      originalPrice:
        data.original_price || data.old_price
          ? parseFloat(data.original_price || data.old_price)
          : null,
      discount: data.discount || data.discount_percentage || null,
      image: data.image || [],
      images: (() => {
        // Handle various image array formats
        if (Array.isArray(data.images) && data.images.length > 0) {
          return data.images;
        }
        if (
          Array.isArray(data.product_images) &&
          data.product_images.length > 0
        ) {
          return data.product_images;
        }
        if (data.image || data.main_image || data.thumbnail) {
          return [data.image || data.main_image || data.thumbnail];
        }
        return [];
      })(),
      category: data.category
        ? {
            id: data.category.id || data.category_id,
            name: data.category.name || data.category_name,
          }
        : data.category_id
        ? {
            id: data.category_id,
            name: "Unknown Category",
          }
        : null,
      stock: parseInt(
        data.stock || data.quantity || data.available_quantity || 0
      ),
      rating: parseFloat(data.rating || data.average_rating || 4.5),
      reviewCount: parseInt(
        data.review_count || data.reviews_count || data.total_reviews || 0
      ),
      colors:
        Array.isArray(data.colors) && data.colors.length > 0
          ? data.colors
          : [{ id: "default", bg: "bg-gray-500", name: "Default" }],
      sizes: Array.isArray(data.sizes) ? data.sizes : [],
      slug: data.slug || data.product_slug,
      brand: data.brand || data.brand_name || null,
      sku: data.sku || data.product_code || null,
      weight: data.weight || null,
      dimensions: data.dimensions || null,
      tags: Array.isArray(data.tags) ? data.tags : [],
      created_at: data.created_at || data.date_created,
      updated_at: data.updated_at || data.date_updated,
    };
  };

  // Fetch product details with enhanced error handling
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate ID exists
      if (!id) {
        throw new Error("Product ID is missing from URL parameters");
      }

      // Make API call
      const response = await apiService.getProductById(id);

      // Handle different response structures
      let productData = response;

      // Check if response has nested data
      if (response?.data) {
        productData = response.data;
      }

      // Check if it's wrapped in another layer
      if (response?.product) {
        productData = response.product;
      }

      // If response is an array, get first item
      if (Array.isArray(productData) && productData.length > 0) {
        productData = productData[0];
      }

      // Additional check: if response has success/status field, extract data
      if (response?.success && response?.data) {
        productData = response.data;
      }

      if (!productData) {
        throw new Error("Product not found or empty response");
      }

      // Validate that productData has required fields
      if (!productData.id && !productData.product_id && !productData.pk) {
        console.error("Product data missing ID field:", productData);
        throw new Error("Product data is invalid - missing ID");
      }

      const transformedProduct = transformProductData(productData);

      // Validate that we have an ID after transformation
      if (!transformedProduct.id) {
        console.error("Product ID is missing after transformation");
        throw new Error("Product ID is missing from the response");
      }

      setProduct(transformedProduct);

      // Set initial selections
      if (transformedProduct.colors?.length > 0) {
        setSelectedColor(
          transformedProduct.colors[0].id || transformedProduct.colors[0].name
        );
      }
      if (transformedProduct.sizes?.length > 0) {
        setSelectedSize(
          transformedProduct.sizes[0].id || transformedProduct.sizes[0].name
        );
      }
    } catch (err) {
      console.error("Failed to fetch product details:", err);
      console.error("Error stack:", err.stack);

      // More specific error handling
      if (err.message.includes("404") || err.message.includes("not found")) {
        setError(
          "Product not found. Please check the product ID and try again."
        );
      } else if (
        err.message.includes("network") ||
        err.message.includes("fetch")
      ) {
        setError("Network error. Please check your connection and try again.");
      } else {
        setError(err.message || "Failed to load product details");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    } else {
      setError("No product ID provided");
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {}, [id, product, loading, error]);

  // Enhanced add to cart functionality
  const handleAddToCart = async () => {
    if (!product?.id) {
      setError("Cannot add to cart: Product information is incomplete");
      return;
    }

    try {
      setAddingToCart(true);

      const cartItem = {
        product_id: product.id,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize,
      };

      // Uncomment if using API
      // await apiService.addToCart(cartItem);

      // Add to context cart
      addToCart(cartItem);
    } catch (err) {
      setError("Failed to add item to cart", err);
    } finally {
      setAddingToCart(false);
    }
  };
  // Handle wishlist toggle
  const handleWishlistToggle = async () => {
    try {
      if (apiService.toggleWishlist) {
        await apiService.toggleWishlist(product.id);
        setIsWishlisted(!isWishlisted);
      }
    } catch (err) {
      console.error("Failed to update wishlist:", err);
    }
  };

  // Enhanced reviews data (can be fetched from API)
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      if (!product?.id) return;

      try {
        setReviewsLoading(true);
        apiService.getProductReviews;
        const reviewsData = await apiService.getProductReviews(product.id);
        setReviews(reviewsData?.data || []);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [product?.id]);

  // Handle quantity change with validation
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 999)) {
      setQuantity(newQuantity);
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < fullStars
                ? "text-yellow-400 fill-yellow-400"
                : i === fullStars && hasHalfStar
                ? "text-yellow-400 fill-yellow-200"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  // Calculate discounted price
  const getDiscountedPrice = () => {
    if (!product) return 0;
    if (product.originalPrice && product.discount) {
      return (
        product.originalPrice - (product.originalPrice * product.discount) / 100
      );
    }
    return product.price;
  };

  // Calculate savings
  const getSavings = () => {
    if (!product?.originalPrice || !product?.discount) return 0;
    return (product.originalPrice * product.discount) / 100;
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Product Not Found
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </button>

        {/* Breadcrumb */}
        <nav
          className="flex items-center text-sm text-gray-500 mb-8"
          aria-label="Breadcrumb"
        >
          <span>Home</span>
          <span className="mx-2">›</span>
          <span>Shop</span>
          <span className="mx-2">›</span>
          {product.category && (
            <>
              <span>{product.category.name}</span>
              <span className="mx-2">›</span>
            </>
          )}
          <span className="font-medium text-gray-900">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="flex gap-4">
              {/* Thumbnails */}
              {product?.images?.length > 1 && (
                <div className="flex flex-col gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 bg-gray-100 border-2 rounded-lg overflow-hidden transition-all ${
                        selectedImage === index
                          ? "border-gray-800 shadow-md"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={getImageUrl(img)}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="flex-1 border-2 border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
                <img
                  src={getImageUrl(
                    (product.images && product.images[selectedImage]) ||
                      product.image
                  )}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-contain min-h-[400px] max-h-[600px]"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-full border transition-colors ${
                    isWishlisted
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "border-gray-200 text-gray-600 hover:text-red-600"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                  />
                </button>
                <button className="p-2 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Brand and Category */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              {product.brand && <span>Brand: {product.brand}</span>}
              {product.category && (
                <span>Category: {product.category.name}</span>
              )}
              {product.sku && <span>SKU: {product.sku}</span>}
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              {renderStars(product.rating)}
              <span className="ml-2 text-sm text-gray-600">
                {product.rating}/5
              </span>
              {product.reviewCount > 0 && (
                <span className="ml-1 text-sm text-gray-600">
                  ({product.reviewCount} reviews)
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                  ${getDiscountedPrice().toFixed(2)}
                </span>
                {product.originalPrice && product.discount && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 text-sm font-medium rounded-full">
                      -{product.discount}%
                    </span>
                  </>
                )}
              </div>
              {getSavings() > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  You save ${getSavings().toFixed(2)}
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-4">
              {product.stock > 0 ? (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600 text-sm font-medium">
                    In Stock ({product.stock} available)
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-red-600 text-sm font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Color:{" "}
                  <span className="font-normal text-gray-600">
                    {selectedColor}
                  </span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-10 h-10 rounded-full ${
                        color.bg
                      } border-2 transition-all ${
                        selectedColor === color.id
                          ? "border-gray-800 scale-110"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      title={color.name}
                    >
                      {selectedColor === color.id && (
                        <span className="flex items-center justify-center w-full h-full text-white text-xs">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Size:{" "}
                  <span className="font-normal text-gray-600">
                    {selectedSize}
                  </span>
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "bg-gray-900 text-white border-gray-900"
                          : "bg-white text-gray-900 border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-16 text-center border-0 focus:ring-0 py-2"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0 || addingToCart}
                className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {addingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </>
                )}
              </button>
            </div>

            {/* Product Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Tags:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed top-4 right-4 bg-green-600 text-white py-2 px-4 rounded shadow-lg z-50">
            {notification}
          </div>
        )}

        {/* Tabs */}
        <div className="mt-16 border-b border-gray-200">
          <div className="flex space-x-8 justify-center">
            {["details", "rating", "faqs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-lg font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-gray-900 text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab === "rating" ? "Reviews" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "details" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Product Details</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 mb-6">{product.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Product Information
                    </h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="font-medium">Name:</dt>
                        <dd className="text-gray-600">{product.name}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium">Price:</dt>
                        <dd className="text-gray-600">${product.price}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-medium">Stock:</dt>
                        <dd className="text-gray-600">
                          {product.stock} available
                        </dd>
                      </div>
                      {product.category && (
                        <div className="flex justify-between">
                          <dt className="font-medium">Category:</dt>
                          <dd className="text-gray-600">
                            {product.category.name}
                          </dd>
                        </div>
                      )}
                      {product.brand && (
                        <div className="flex justify-between">
                          <dt className="font-medium">Brand:</dt>
                          <dd className="text-gray-600">{product.brand}</dd>
                        </div>
                      )}
                      {product.weight && (
                        <div className="flex justify-between">
                          <dt className="font-medium">Weight:</dt>
                          <dd className="text-gray-600">{product.weight}</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  {(product.colors.length > 0 || product.sizes.length > 0) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Available Options
                      </h3>
                      <dl className="space-y-2">
                        {product.colors.length > 0 && (
                          <div>
                            <dt className="font-medium">Colors:</dt>
                            <dd className="text-gray-600">
                              {product.colors
                                .map((c) => c.name || c.id)
                                .join(", ")}
                            </dd>
                          </div>
                        )}
                        {product.sizes.length > 0 && (
                          <div>
                            <dt className="font-medium">Sizes:</dt>
                            <dd className="text-gray-600">
                              {product.sizes.join(", ")}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "rating" && (
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  Customer Reviews
                  {reviews.length > 0 && (
                    <span className="text-gray-500 text-lg font-normal ml-2">
                      ({reviews.length})
                    </span>
                  )}
                </h2>
                <button className="bg-gray-900 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors">
                  Write a Review
                </button>
              </div>

              {reviewsLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
              ) : reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          {renderStars(review.rating)}
                          <div className="mt-2 flex items-center">
                            <span className="font-medium text-gray-900">
                              {review.user_name || review.name}
                            </span>
                            {review.verified && (
                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mb-3">
                        {review.comment || review.text}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(
                          review.created_at || review.date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No reviews yet. Be the first to review this product!
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "faqs" && (
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    How do I place an order?
                  </h3>
                  <p className="text-gray-600">
                    Simply select your preferred options (color, size), choose
                    quantity, and click "Add to Cart". Then proceed to checkout
                    to complete your purchase. You can pay using various methods
                    including credit cards, PayPal, and more.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    What is the return policy?
                  </h3>
                  <p className="text-gray-600">
                    We offer a 30-day return policy for unused items in original
                    packaging. Items must be in the same condition as received.
                    Shipping costs for returns are the responsibility of the
                    customer unless the item is defective or wrong item was
                    sent.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    How long does shipping take?
                  </h3>
                  <p className="text-gray-600">
                    Standard shipping typically takes 3-7 business days within
                    the country. International shipping may take 7-14 business
                    days. Express shipping options are available at checkout for
                    faster delivery.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Is this item in stock?
                  </h3>
                  <p className="text-gray-600">
                    Current stock status is shown above in the product details.
                    We update inventory in real-time, so the displayed quantity
                    reflects current availability. If an item shows as out of
                    stock, you can sign up for restock notifications.
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Can I modify or cancel my order?
                  </h3>
                  <p className="text-gray-600">
                    You can modify or cancel your order within 1 hour of placing
                    it, provided it hasn't been processed for shipping yet.
                    Please contact our customer service team immediately if you
                    need to make changes.
                  </p>
                </div>

                <div className="pb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Do you offer size exchanges?
                  </h3>
                  <p className="text-gray-600">
                    Yes, we offer free size exchanges within 30 days of
                    purchase. The item must be unworn and in original condition.
                    Simply contact our customer service team to initiate a size
                    exchange.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <ReferenceProduct />
        </div>
      </div>
    </div>
  );
}
