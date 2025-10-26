import React, { useState, useMemo } from "react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// Import all page components
import ProductListPage from "./components/ProductListPage";
import ProductDetailPage from "./components/ProductDetailPage";
import BasketPage from "./components/BasketPage";
import CheckoutPage from "./components/CheckoutPage";
import PaymentPage from "./components/PaymentPage";
import ConfirmationPage from "./components/ConfirmationPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import PlaceholderPage from "./components/PlaceholderPage";
import AddToCartOverlay from "./components/AddToCartOverlay";
import Menu from "./components/Menu";
import BrandVideoOverlay from "./components/BrandVideoOverlay";
import PWAInstallPrompt from "./components/PWAInstallPrompt";

// Enhanced product data with descriptions and locations
const PRODUCTS = [
  {
    id: 1,
    name: "Classic Navy Scrub Set",
    price: "$49.99",
    priceValue: 49.99,
    farm: "Comfort Care Collection",
    category: "scrubs" as const,
    status: "sale" as const,
    images: [
      "https://images.unsplash.com/photo-1557777586-f6682739fcf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaWxsdXN0cmF0aW9uJTIwc2tldGNofGVufDF8fHx8MTc2MTQxMDM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Professional navy blue scrub set with moisture-wicking fabric. Features multiple pockets for convenience and a modern athletic fit.",
    location: "Premium Collection",
    dietary: ["XS", "S", "M", "L", "XL"],
    availableSizes: {
      "XS": 5,
      "S": 12,
      "M": 15,
      "L": 8,
      "XL": 3,
    },
  },
  {
    id: 2,
    name: "Royal Blue V-Neck Scrub Top",
    price: "$32.99",
    priceValue: 32.99,
    farm: "Essential Series",
    category: "scrubs" as const,
    status: "premium" as const,
    images: [
      "https://images.unsplash.com/photo-1580981433573-c5804ced20ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGxpbmUlMjBkcmF3aW5nfGVufDF8fHx8MTc2MTQ1Mzk2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Lightweight and breathable royal blue scrub top. Classic v-neck design with three spacious pockets and reinforced stitching.",
    location: "Essential Series",
    dietary: ["XS", "S", "M", "L", "XL", "XXL"],
    availableSizes: {
      "XS": 7,
      "S": 10,
      "M": 18,
      "L": 14,
      "XL": 9,
      "XXL": 4,
    },
  },
  {
    id: 3,
    name: "Emerald Green Scrub Set",
    price: "$54.99",
    priceValue: 54.99,
    farm: "Premium Pro Line",
    category: "scrubs" as const,
    status: "premium" as const,
    images: [
      "https://images.unsplash.com/photo-1584448033590-3e5e5124f87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJtZW50JTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2MTQ1Mzk2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Vibrant emerald green scrub set with anti-microbial fabric technology. Four-way stretch material for maximum comfort during long shifts.",
    location: "Premium Pro Line",
    dietary: ["S", "M", "L", "XL"],
    availableSizes: {
      "S": 6,
      "M": 11,
      "L": 9,
      "XL": 5,
    },
  },
  {
    id: 4,
    name: "Purple Passion Scrub Top",
    price: "$36.99",
    priceValue: 36.99,
    farm: "Signature Collection",
    category: "scrubs" as const,
    status: "soldout" as const,
    images: [
      "https://images.unsplash.com/photo-1586447795212-b8ea5253ac2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwZHJhd2luZyUyMG1pbmltYWx8ZW58MXx8fHwxNzYxNDUzOTY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Beautiful purple scrub top with contemporary styling. Wrinkle-resistant fabric with fade protection for lasting color.",
    location: "Signature Collection",
    dietary: ["XS", "S", "M", "L", "XL"],
    availableSizes: {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
    },
  },
  {
    id: 5,
    name: "Burgundy Jogger Scrub Pants",
    price: "$38.99",
    priceValue: 38.99,
    farm: "Active Wear Series",
    category: "scrubs" as const,
    status: "sale" as const,
    images: [
      "https://images.unsplash.com/photo-1712685884939-c0969ab2e758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmlmb3JtJTIwc2tldGNoJTIwYXJ0fGVufDF8fHx8MTc2MTQ1Mzk2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Modern jogger-style scrub pants in burgundy. Features elastic waistband with drawstring and tapered leg design for a flattering fit.",
    location: "Active Wear Series",
    dietary: ["XS", "S", "M", "L", "XL", "XXL"],
    availableSizes: {
      "XS": 4,
      "S": 8,
      "M": 12,
      "L": 10,
      "XL": 6,
      "XXL": 2,
    },
  },
  {
    id: 6,
    name: "White Classic Scrub Set",
    price: "$44.99",
    priceValue: 44.99,
    farm: "Clinical Essentials",
    category: "scrubs" as const,
    status: "premium" as const,
    images: [
      "https://images.unsplash.com/photo-1753162658542-dd053c2b5196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBhcmVsJTIwc2tldGNoJTIwZGVzaWdufGVufDF8fHx8MTc2MTQ1Mzk2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Crisp white scrub set perfect for clinical settings. Stain-resistant fabric with professional tailoring and comfortable fit.",
    location: "Clinical Essentials",
    dietary: ["S", "M", "L", "XL"],
    availableSizes: {
      "S": 7,
      "M": 13,
      "L": 11,
      "XL": 6,
    },
  },
  {
    id: 7,
    name: "Teal Antimicrobial Scrub Top",
    price: "$42.99",
    priceValue: 42.99,
    farm: "Health Guard Series",
    category: "scrubs" as const,
    status: "soldout" as const,
    images: [
      "https://images.unsplash.com/photo-1731267776886-90f90af75eb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMHNrZXRjaCUyMG1pbmltYWx8ZW58MXx8fHwxNzYxNDUzOTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Teal scrub top with built-in antimicrobial protection. Breathable mesh panels and ergonomic design for all-day comfort.",
    location: "Health Guard Series",
    dietary: ["XS", "S", "M", "L", "XL"],
    availableSizes: {
      "XS": 0,
      "S": 0,
      "M": 0,
      "L": 0,
      "XL": 0,
    },
  },
  {
    id: 8,
    name: "Black Stretch Scrub Pants",
    price: "$35.99",
    priceValue: 35.99,
    farm: "Flex-Fit Collection",
    category: "scrubs" as const,
    status: "sale" as const,
    images: [
      "https://images.unsplash.com/photo-1712685884939-c0969ab2e758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2NydWJzJTIwc2tldGNoJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2MTQ1Mzk1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Versatile black scrub pants with premium stretch fabric. Multiple cargo pockets and adjustable waist for ultimate functionality.",
    location: "Flex-Fit Collection",
    dietary: ["S", "M", "L", "XL", "XXL"],
    availableSizes: {
      "S": 5,
      "M": 14,
      "L": 16,
      "XL": 8,
      "XXL": 3,
    },
  },
  {
    id: 9,
    name: "Charcoal Gray Scrub Set",
    price: "$52.99",
    priceValue: 52.99,
    farm: "Urban Professional",
    category: "scrubs" as const,
    status: "premium" as const,
    images: [
      "https://images.unsplash.com/photo-1584448033590-3e5e5124f87a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGRlc2lnbiUyMHNrZXRjaHxlbnwxfHx8fDE3NjE0NTM5Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Modern charcoal gray scrub set with contemporary design. Premium moisture-wicking performance fabric with odor control technology.",
    location: "Urban Professional",
    dietary: ["XS", "S", "M", "L", "XL"],
    availableSizes: {
      "XS": 3,
      "S": 9,
      "M": 12,
      "L": 7,
      "XL": 4,
    },
  },
  {
    id: 10,
    name: "Classic White Lab Coat",
    price: "$79.99",
    priceValue: 79.99,
    farm: "Professional Essentials",
    category: "lab-coats" as const,
    images: [
      "https://images.unsplash.com/photo-1735653192853-e86e638ff6d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWIlMjBjb2F0JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2MTQ1Mzk2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Premium white lab coat with professional tailoring. Features multiple pockets, reinforced stitching, and wrinkle-resistant fabric for a polished appearance.",
    location: "Professional Essentials",
    dietary: ["XS", "S", "M", "L", "XL", "XXL"],
    availableSizes: {
      "XS": 4,
      "S": 8,
      "M": 10,
      "L": 12,
      "XL": 7,
      "XXL": 5,
    },
  },
  {
    id: 11,
    name: "Premium Lab Coat - Tailored Fit",
    price: "$89.99",
    priceValue: 89.99,
    farm: "Elite Medical Wear",
    category: "lab-coats" as const,
    images: [
      "https://images.unsplash.com/photo-1557777586-f6682739fcf3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwaWxsdXN0cmF0aW9uJTIwc2tldGNofGVufDF8fHx8MTc2MTQxMDM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Tailored-fit lab coat with modern design. Premium cotton blend with stain-resistant treatment and tablet pocket for today's healthcare professional.",
    location: "Elite Medical Wear",
    dietary: ["S", "M", "L", "XL"],
    availableSizes: {
      "S": 6,
      "M": 9,
      "L": 8,
      "XL": 5,
    },
  },
  {
    id: 12,
    name: "Surgical Cap - Classic Blue",
    price: "$12.99",
    priceValue: 12.99,
    farm: "Surgical Essentials",
    category: "head-caps" as const,
    images: [
      "https://images.unsplash.com/photo-1715526411349-2d9aa764ed41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJnaWNhbCUyMGNhcCUyMGlsbHVzdHJhdGlvbnxlbnwxfHx8fDE3NjE0NTM5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Comfortable surgical cap in classic blue. Breathable fabric with adjustable tie closure. Perfect for OR and clinical settings.",
    location: "Surgical Essentials",
    dietary: ["One Size"],
    availableSizes: {
      "One Size": 25,
    },
  },
  {
    id: 13,
    name: "Printed Scrub Cap - Fun Patterns",
    price: "$14.99",
    priceValue: 14.99,
    farm: "Style & Comfort",
    category: "head-caps" as const,
    images: [
      "https://images.unsplash.com/photo-1663280426574-00126d048f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJnaWNhbCUyMGNhcCUyMG1vY2t1cHxlbnwxfHx8fDE3NjE0NTM5NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Stylish printed scrub cap with fun patterns. Soft, stretchy fabric with sweatband. Add personality to your professional attire.",
    location: "Style & Comfort",
    dietary: ["One Size"],
    availableSizes: {
      "One Size": 30,
    },
  },
  {
    id: 14,
    name: "Bouffant Surgical Cap",
    price: "$11.99",
    priceValue: 11.99,
    farm: "Surgical Essentials",
    category: "head-caps" as const,
    images: [
      "https://images.unsplash.com/photo-1725399459296-935c0d72f04a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYXBwYXJlbCUyMGRyYXdpbmd8ZW58MXx8fHwxNzYxNDUzOTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    isFavorite: false,
    description:
      "Comfortable bouffant-style surgical cap with elastic band. Provides full hair coverage and all-day comfort during procedures.",
    location: "Surgical Essentials",
    dietary: ["One Size"],
    availableSizes: {
      "One Size": 20,
    },
  },
];

type SortOption = "default" | "a-z" | "price";
type ViewMode =
  | "list"
  | "detail"
  | "basket"
  | "checkout"
  | "payment"
  | "confirmation"
  | "orderConfirmation"
  | "newsstand"
  | "about"
  | "profile"
  | "contact";

type CategoryFilter = "all" | "scrubs" | "head-caps" | "lab-coats";

interface CartItem {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  quantity: number;
  size?: string;
}

interface OverlayProduct {
  id: number;
  name: string;
  image: string;
}

interface CustomerInfo {
  fullName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

interface ProfileInfo {
  email: string;
  password: string;
}

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(
    new Set(),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] =
    useState<SortOption>("default");
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>("scrubs");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof PRODUCTS)[0] | null
  >(null);

  // Customer information from checkout
  const [customerInfo, setCustomerInfo] =
    useState<CustomerInfo>({
      fullName: "",
      address: "",
      city: "",
      country: "",
      state: "",
      zipCode: "",
    });

  // Profile information (if user creates profile during checkout)
  const [profileInfo, setProfileInfo] = useState<ProfileInfo | null>(null);

  // Add to cart overlay state
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayProduct, setOverlayProduct] =
    useState<OverlayProduct | null>(null);
  const [overlayQuantity, setOverlayQuantity] = useState(1);
  
  // Brand video overlay state
  const [showBrandVideo, setShowBrandVideo] = useState(false);

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter,
      );
    }

    switch (sortOption) {
      case "a-z":
        return filtered.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
      case "price":
        return filtered.sort(
          (a, b) => a.priceValue - b.priceValue,
        );
      default:
        return filtered;
    }
  }, [searchTerm, sortOption, categoryFilter]);

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const showAddToCartOverlay = (
    product: (typeof PRODUCTS)[0],
    quantity = 1,
  ) => {
    setOverlayProduct({
      id: product.id,
      name: product.name,
      image: product.images[0],
    });
    setOverlayQuantity(quantity);
    setShowOverlay(true);

    // Hide overlay after 1 second
    setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
  };

  const addToCart = (productId?: number, quantityToAdd = 1, size?: string) => {
    let targetProduct;

    if (productId) {
      targetProduct = PRODUCTS.find((p) => p.id === productId);
    } else if (selectedProduct) {
      targetProduct = selectedProduct;
    }

    if (!targetProduct) return;

    // Show overlay
    showAddToCartOverlay(targetProduct, quantityToAdd);

    setCartItems((prevItems) => {
      // Find existing item with same id AND size
      const existingItem = prevItems.find(
        (item) => item.id === targetProduct.id && item.size === size,
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === targetProduct.id && item.size === size
            ? {
                ...item,
                quantity: item.quantity + quantityToAdd,
              }
            : item,
        );
      } else {
        return [
          ...prevItems,
          {
            id: targetProduct.id,
            name: targetProduct.name,
            price: targetProduct.price,
            priceValue: targetProduct.priceValue,
            image: targetProduct.images[0],
            quantity: quantityToAdd,
            size: size,
          },
        ];
      }
    });
  };

  const updateCartItemQuantity = (
    productId: number,
    quantity: number,
    size?: string,
  ) => {
    if (quantity === 0) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => !(item.id === productId && item.size === size)),
      );
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId && item.size === size ? { ...item, quantity } : item,
        ),
      );
    }
  };

  // Navigation handlers
  const handleProductClick = (
    product: (typeof PRODUCTS)[0],
  ) => {
    setSelectedProduct(product);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    setViewMode("basket");
  };

  const handleBackFromBasket = () => {
    setViewMode("list");
  };

  const handleGoToCheckout = () => {
    setViewMode("checkout");
  };

  const handleBackFromCheckout = () => {
    setViewMode("basket");
  };

  const handleProceedToPayment = (
    customerData: CustomerInfo,
    profileData?: ProfileInfo,
  ) => {
    setCustomerInfo(customerData);
    // Here you would typically send profileInfo to your backend if it exists
    if (profileData) {
      console.log('Profile creation requested:', profileData);
      // TODO: Send to backend API to create user account
      setProfileInfo(profileData);
    }
    setViewMode("payment");
  };

  const handleBackFromPayment = () => {
    setViewMode("checkout");
  };

  const handleProceedToConfirmation = () => {
    setViewMode("confirmation");
  };

  const handleBackFromConfirmation = () => {
    setViewMode("payment");
  };

  const handleCompletePurchase = () => {
    // Show order confirmation and clear cart
    setViewMode("orderConfirmation");
    setCartItems([]);
  };

  const handleShopFromOrderConfirmation = () => {
    setViewMode("list");
    setSelectedProduct(null);
    // Keep profile and shipping info if profile was created
    // Only reset if no profile exists
    if (!profileInfo) {
      setCustomerInfo({
        fullName: "",
        address: "",
        city: "",
        country: "",
        state: "",
        zipCode: "",
      });
    }
  };

  const handleMenuNavigation = (screen: string) => {
    setViewMode(screen as ViewMode);
    setSelectedProduct(null);
  };

  const handleCreateProfileFromProfilePage = (newProfileInfo: ProfileInfo, newCustomerInfo: CustomerInfo) => {
    setProfileInfo(newProfileInfo);
    setCustomerInfo(newCustomerInfo);
  };

  // Render current view based on viewMode
  const renderCurrentView = () => {
    switch (viewMode) {
      case "list":
        return (
          <ProductListPage
            products={filteredAndSortedProducts}
            favorites={favorites}
            searchTerm={searchTerm}
            sortOption={sortOption}
            categoryFilter={categoryFilter}
            cartCount={cartCount}
            onSearchChange={setSearchTerm}
            onSortChange={setSortOption}
            onCategoryChange={setCategoryFilter}
            onToggleFavorite={toggleFavorite}
            onAddToCart={(productId) => addToCart(productId, 1)}
            onProductClick={handleProductClick}
            onMenuClick={() => setIsNavOpen(true)}
            onCartClick={handleCartClick}
            onLogoClick={() => setShowBrandVideo(true)}
          />
        );

      case "detail":
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            cartCount={cartCount}
            isFavorite={favorites.has(selectedProduct.id)}
            onToggleFavorite={() => toggleFavorite(selectedProduct.id)}
            onBack={handleBackToList}
            onLogoClick={handleBackToList}
            onAddToCart={(quantity, size) =>
              addToCart(undefined, quantity, size)
            }
            onMenuClick={() => setIsNavOpen(true)}
            onCartClick={handleCartClick}
          />
        ) : null;

      case "basket":
        return (
          <BasketPage
            cartItems={cartItems}
            onBack={handleBackFromBasket}
            onLogoClick={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
            onUpdateQuantity={updateCartItemQuantity}
            onGoToCheckout={handleGoToCheckout}
          />
        );

      case "checkout":
        return (
          <CheckoutPage
            cartCount={cartCount}
            customerInfo={customerInfo}
            onBack={handleBackFromCheckout}
            onLogoClick={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
            onProceedToPayment={handleProceedToPayment}
          />
        );

      case "payment":
        return (
          <PaymentPage
            cartCount={cartCount}
            onBack={handleBackFromPayment}
            onLogoClick={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
            onProceedToConfirmation={
              handleProceedToConfirmation
            }
          />
        );

      case "confirmation":
        return (
          <ConfirmationPage
            cartItems={cartItems}
            cartCount={cartCount}
            onBack={handleBackFromConfirmation}
            onLogoClick={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
            onUpdateQuantity={updateCartItemQuantity}
            onCompletePurchase={handleCompletePurchase}
          />
        );

      case "orderConfirmation":
        return (
          <OrderConfirmationPage
            cartCount={0} // Cart is cleared after purchase
            customerInfo={customerInfo}
            onShop={handleShopFromOrderConfirmation}
            onMenuClick={() => setIsNavOpen(true)}
          />
        );

      case "newsstand":
      case "about":
      case "profile":
      case "contact":
        return (
          <PlaceholderPage
            title={
              viewMode === "newsstand"
                ? "Newsstand"
                : viewMode === "about"
                  ? "About Us"
                  : viewMode === "profile"
                    ? "My Profile"
                    : "Contact Us"
            }
            onBack={handleBackToList}
            onMenuClick={() => setIsNavOpen(true)}
            cartCount={cartCount}
            onCartClick={handleCartClick}
            onLogoClick={handleBackToList}
            profileInfo={viewMode === "profile" ? profileInfo : undefined}
            customerInfo={viewMode === "profile" ? customerInfo : undefined}
            onCreateProfile={viewMode === "profile" ? handleCreateProfileFromProfilePage : undefined}
            favorites={viewMode === "profile" ? favorites : undefined}
            products={viewMode === "profile" ? PRODUCTS : undefined}
            onProductClick={viewMode === "profile" ? handleProductClick : undefined}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* iPhone 16 Container */}
      <div className="w-[393px] h-[852px] bg-[#ffffff] relative overflow-hidden rounded-[40px] shadow-2xl border-8 border-black">
        {renderCurrentView()}

        {/* Add to Cart Overlay */}
        <AddToCartOverlay
          isVisible={showOverlay}
          product={overlayProduct}
          quantity={overlayQuantity}
        />

        {/* Custom Menu */}
        <Menu
          isOpen={isNavOpen}
          onClose={() => setIsNavOpen(false)}
          onNavigate={handleMenuNavigation}
        />
        
        {/* Brand Video Overlay - Inside iPhone container for device-bounded playback */}
        <BrandVideoOverlay
          isOpen={showBrandVideo}
          onClose={() => setShowBrandVideo(false)}
        />
        
        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
      </div>
    </div>
  );
}