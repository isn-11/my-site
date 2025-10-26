import image_c49aba315f0b70161526e5d8fe398521d6dc42aa from 'figma:asset/c49aba315f0b70161526e5d8fe398521d6dc42aa.png';
import image_caed99883f4af22b2e09498aeacb67210d5e4ee9 from 'figma:asset/caed99883f4af22b2e09498aeacb67210d5e4ee9.png';
import React, { useEffect, useRef, useState } from 'react';
import StatusBar from './shared/StatusBar';
import svgPaths from "../imports/svg-s5y93igtx2";
import clsx from "clsx";
import { Input } from './ui/input';
import imgLogo from "figma:asset/3418bd52656c2783eaddc16e8c771fac1de55762.png";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  farm: string;
  images: string[];
  isFavorite: boolean;
  description: string;
  location: string;
  dietary: string[];
  status?: "soldout" | "sale" | "premium";
  availableSizes?: Record<string, number>;
}

type SortOption = 'default' | 'a-z' | 'price';

type CategoryFilter = 'all' | 'scrubs' | 'head-caps' | 'lab-coats';

interface ProductListPageProps {
  products: Product[];
  favorites: Set<number>;
  searchTerm: string;
  sortOption: SortOption;
  categoryFilter: CategoryFilter;
  cartCount: number;
  onSearchChange: (term: string) => void;
  onSortChange: (option: SortOption) => void;
  onCategoryChange: (category: CategoryFilter) => void;
  onToggleFavorite: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  onProductClick: (product: Product) => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  onLogoClick: () => void;
}

export default function ProductListPage({
  products,
  favorites,
  searchTerm,
  sortOption,
  categoryFilter,
  cartCount,
  onSearchChange,
  onSortChange,
  onCategoryChange,
  onToggleFavorite,
  onAddToCart,
  onProductClick,
  onMenuClick,
  onCartClick,
  onLogoClick
}: ProductListPageProps) {
  return (
    <div className="bg-[#ffffff] relative size-full">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Header */}
      <Header 
        cartCount={cartCount}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        categoryFilter={categoryFilter}
        onCategoryChange={onCategoryChange}
        onMenuClick={onMenuClick}
        onCartClick={onCartClick}
        onLogoClick={onLogoClick}
      />
      
      {/* Content */}
      <Content 
        products={products}
        favorites={favorites}
        sortOption={sortOption}
        categoryFilter={categoryFilter}
        onSortChange={onSortChange}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={onAddToCart}
        onProductClick={onProductClick}
      />
      
      {/* Floating Menu Button */}
      <button
        onClick={onMenuClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#4C3F6C] rounded-full size-14 flex items-center justify-center shadow-[0px_4px_20px_0px_rgba(76,63,108,0.4)] hover:shadow-[0px_6px_25px_0px_rgba(76,63,108,0.5)] transition-all duration-200 hover:scale-110 border-2 border-white"
      >
        <div className="h-3 w-5">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
            <g>
              <line stroke="white" strokeWidth="2" x1="0" x2="18" y1="2" y2="2" strokeLinecap="round" />
              <line stroke="white" strokeWidth="2" x1="0" x2="18" y1="10" y2="10" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </button>
    </div>
  );
}

interface HeaderProps {
  cartCount: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  categoryFilter: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onMenuClick: () => void;
  onCartClick: () => void;
  onLogoClick: () => void;
}

function Header({ cartCount, searchTerm, onSearchChange, categoryFilter, onCategoryChange, onMenuClick, onCartClick, onLogoClick }: HeaderProps) {
  return (
    <div className="absolute bg-[rgb(59,42,85)] h-[149px] left-0 right-0 top-0">
      <div className="absolute border-[0px_0px_1px] border-neutral-200 border-solid inset-0 pointer-events-none shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]" />
      
      {/* Mobile Nav */}
      <div className="absolute bg-[#ffffff] h-16 left-0 overflow-clip right-0 top-[31px]">
        <div className="absolute bg-[rgb(59,42,85)] h-[66px] left-0 top-0 w-[393px]" />
        
        {/* Search Icon - Left of Logo */}
        <div className="absolute left-5 size-8 top-[18px]">
          <Input
            placeholder="search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="absolute left-0 top-0 w-8 h-8 p-0 border-0 bg-transparent text-transparent placeholder:text-transparent rounded-full focus:w-[100px] focus:h-[30px] focus:text-black focus:placeholder:text-gray-400 transition-all duration-300 ease-in-out focus:bg-white focus:rounded-3xl focus:px-4 z-10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          />
          <svg className="absolute inset-0 size-8 pointer-events-none" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
            <g>
              <path d={svgPaths.p14ffce80} fill="var(--fill-0, white)" />
            </g>
          </svg>
        </div>
        
        <div
          className="absolute css-v5bt0j flex flex-col font-['Newsreader:Medium',_sans-serif] font-medium justify-center leading-[0] text-[#4C3F6C] text-[24px] text-center text-nowrap top-9 tracking-[-0.24px] translate-x-[-50%] translate-y-[-50%] cursor-pointer hover:opacity-80 transition-opacity"
          style={{ left: "calc(50% - 0.5px)" }}
          onClick={onLogoClick}
        >
          <img src={image_c49aba315f0b70161526e5d8fe398521d6dc42aa} alt="iktara" className="h-16 w-auto m-[0px] px-[50px] py-[0px]" />
        </div>
        
        {/* Cart Icon */}
        <button 
          onClick={onCartClick}
          className="absolute right-5 rounded-2xl size-8 top-[18px] cursor-pointer"
        >
          <div className="size-8 bg-[rgba(255,255,255,0)]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
              <g>
                <path d={svgPaths.p2003cd00} fill="var(--fill-0, white)" />
              </g>
            </svg>
          </div>
          {cartCount > 0 && (
            <div className="absolute bg-[#4C3F6C] left-[17px] rounded-lg size-4 top-[-1px]">
              <div className="flex flex-col items-center justify-center relative size-full">
                <div className="box-border content-stretch flex flex-col gap-2 items-center justify-center px-0.5 py-px relative size-4">
                  <div className="css-78fix6 flex flex-col font-['Inter:Medium',_sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[12px] text-center text-nowrap tracking-[-0.12px]">
                    <p className="adjustLetterSpacing block leading-none whitespace-pre">{cartCount}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </button>
      </div>
      
      {/* Sub Nav */}
      <div className="absolute left-6 right-4 top-[103px]">
        <div className="box-border content-stretch flex flex-col gap-4 items-end justify-end p-0 relative w-full">
          {/* Breadcrumb and Search */}
          <div className="relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative w-full">
              {/* Breadcrumb */}
              <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                <div className="box-border content-stretch flex flex-row font-['Newsreader:Regular',_sans-serif] font-normal gap-1 items-center justify-start leading-[0] p-0 relative text-[24px] text-left text-nowrap tracking-[-0.48px] w-full">
                  <div className="flex items-center gap-1">
                    <div className="css-eomsl1 flex flex-col justify-center relative shrink-0 text-[#757575]">
                      <p className="adjustLetterSpacing block leading-[32px] text-nowrap whitespace-pre text-[24px] text-[rgb(255,255,255)]">
                        {categoryFilter === 'all' && 'All Categories'}
                        {categoryFilter === 'scrubs' && 'Scrubs'}
                        {categoryFilter === 'head-caps' && 'Head Caps'}
                        {categoryFilter === 'lab-coats' && 'Lab Coats'}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center cursor-pointer hover:opacity-80 transition-opacity">
                        <ChevronDown className="size-5 text-white" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40 bg-[#4C3F6C] border-[#4C3F6C]">
                        <DropdownMenuItem
                          className={clsx(
                            'text-white font-["Newsreader:Regular",_sans-serif] text-[14px] leading-[1.6] cursor-pointer focus:bg-transparent hover:text-[#FFFD8F] focus:text-[#FFFD8F]',
                            categoryFilter === 'all' && 'bg-[#FFFD8F] text-[#4C3F6C] focus:bg-[#FFFD8F] focus:text-[#4C3F6C] hover:text-[#4C3F6C]'
                          )}
                          onClick={() => onCategoryChange('all')}
                        >
                          All Categories
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={clsx(
                            'text-white font-["Newsreader:Regular",_sans-serif] text-[14px] leading-[1.6] cursor-pointer focus:bg-transparent hover:text-[#FFFD8F] focus:text-[#FFFD8F]',
                            categoryFilter === 'scrubs' && 'bg-[#FFFD8F] text-[#4C3F6C] focus:bg-[#FFFD8F] focus:text-[#4C3F6C] hover:text-[#4C3F6C]'
                          )}
                          onClick={() => onCategoryChange('scrubs')}
                        >
                          Scrubs
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={clsx(
                            'text-white font-["Newsreader:Regular",_sans-serif] text-[14px] leading-[1.6] cursor-pointer focus:bg-transparent hover:text-[#FFFD8F] focus:text-[#FFFD8F]',
                            categoryFilter === 'head-caps' && 'bg-[#FFFD8F] text-[#4C3F6C] focus:bg-[#FFFD8F] focus:text-[#4C3F6C] hover:text-[#4C3F6C]'
                          )}
                          onClick={() => onCategoryChange('head-caps')}
                        >
                          Head Caps
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={clsx(
                            'text-white font-["Newsreader:Regular",_sans-serif] text-[14px] leading-[1.6] cursor-pointer focus:bg-transparent hover:text-[#FFFD8F] focus:text-[#FFFD8F]',
                            categoryFilter === 'lab-coats' && 'bg-[#FFFD8F] text-[#4C3F6C] focus:bg-[#FFFD8F] focus:text-[#4C3F6C] hover:text-[#4C3F6C]'
                          )}
                          onClick={() => onCategoryChange('lab-coats')}
                        >
                          Lab Coats
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContentProps {
  products: Product[];
  favorites: Set<number>;
  sortOption: SortOption;
  categoryFilter: CategoryFilter;
  onSortChange: (option: SortOption) => void;
  onToggleFavorite: (productId: number) => void;
  onAddToCart: (productId: number) => void;
  onProductClick: (product: Product) => void;
}

function Content({ products, favorites, sortOption, categoryFilter, onSortChange, onToggleFavorite, onAddToCart, onProductClick }: ContentProps) {
  const [api, setApi] = React.useState<CarouselApi>();

  // Get top purchases based on the current category filter
  const getTopPurchases = () => {
    const categoryMap: Record<CategoryFilter, number[]> = {
      'all': [2, 1, 5], // Mix from different categories
      'scrubs': [2, 1, 5], // Top scrub products (IDs 1-9 are scrubs)
      'head-caps': [12, 13, 14], // All head cap products (IDs 12-14)
      'lab-coats': [10, 11, 10], // Lab coat products (IDs 10-11, repeat 10 for 3 items)
    };

    const selectedIds = categoryMap[categoryFilter];
    return selectedIds
      .map(id => products.find(p => p.id === id))
      .filter(Boolean) as Product[];
  };

  const topPurchases = getTopPurchases();

  // Auto-scroll functionality
  React.useEffect(() => {
    if (!api) {
      return;
    }

    const autoScroll = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => {
      clearInterval(autoScroll);
    };
  }, [api]);

  return (
    <div className="absolute left-0 right-0 top-[185px] bottom-4 overflow-y-auto scrollbar-thin">
      <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start relative w-full px-6 py-[0px] px-[21px] pb-24">
        {/* Top Purchases Carousel */}
        <div className="w-full mb-2">
          <h2 className="font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-3">Top Purchases</h2>
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent className="-ml-2">
              {topPurchases.map((product, index) => (
                <CarouselItem key={`${product.id}-${index}`} className="pl-2 basis-4/5">
                  <div 
                    className="relative rounded-xl overflow-hidden shadow-md hover-lift cursor-pointer"
                    onClick={() => onProductClick(product)}
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-[180px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-[#FFFD8F] text-[#4C3F6C] px-2 py-1 rounded text-[10px]">
                          {index === 0 ? 'Top Seller' : index === 1 ? 'Trending' : 'Popular'}
                        </span>
                      </div>
                      <h3 className="text-white font-['Inter:Regular',_sans-serif] mb-1">
                        {product.name}
                      </h3>
                      <p className="text-[#FFFD8F]">{product.price}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-4">
              <CarouselPrevious className="static translate-y-0 bg-white/80 hover:bg-white transition-all hover:scale-110 button-smooth" />
              <CarouselNext className="static translate-y-0 bg-white/80 hover:bg-white transition-all hover:scale-110 button-smooth" />
            </div>
          </Carousel>
        </div>

        {/* Sort Options */}
        <div className="relative shrink-0 w-full">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <p className="text-[#4C3F6C] font-['Newsreader:Regular',_sans-serif] text-[14px] leading-[1.6] whitespace-pre">
                {sortOption === 'default' ? 'Sort by' : sortOption === 'a-z' ? 'A-Z' : 'Price'}
              </p>
              <ChevronDown className="size-4 text-[#4C3F6C]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuItem
                className={clsx(
                  'text-[#4C3F6C] font-[\"Newsreader:Regular\",_sans-serif] text-[14px] leading-[1.6] whitespace-pre cursor-pointer',
                  sortOption === 'default' && 'bg-[#4C3F6C] text-[#ffffff]'
                )}
                onClick={() => onSortChange('default')}
              >
                Sort by
              </DropdownMenuItem>
              <DropdownMenuItem
                className={clsx(
                  'text-[#4C3F6C] font-[\"Newsreader:Regular\",_sans-serif] text-[14px] leading-[1.6] whitespace-pre cursor-pointer',
                  sortOption === 'a-z' && 'bg-[#4C3F6C] text-[#ffffff]'
                )}
                onClick={() => onSortChange('a-z')}
              >
                A-Z
              </DropdownMenuItem>
              <DropdownMenuItem
                className={clsx(
                  'text-[#4C3F6C] font-[\"Newsreader:Regular\",_sans-serif] text-[14px] leading-[1.6] whitespace-pre cursor-pointer',
                  sortOption === 'price' && 'bg-[#4C3F6C] text-[#ffffff]'
                )}
                onClick={() => onSortChange('price')}
              >
                Price
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.has(product.id)}
              onToggleFavorite={() => onToggleFavorite(product.id)}
              onAddToCart={() => onAddToCart(product.id)}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
  onClick: () => void;
}

function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart, onClick }: ProductCardProps) {
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  
  // Get available sizes with stock from product
  const getAvailableSizes = () => {
    if (!product.availableSizes) return [];
    return Object.entries(product.availableSizes)
      .filter(([size, stock]) => stock > 0)
      .map(([size]) => size);
  };
  
  const availableSizes = getAvailableSizes();
  const hasStock = availableSizes.length > 0;
  
  const handleSizeSelect = (size: string) => {
    onAddToCart();
    setShowSizeSelector(false);
  };
  
  // Get badge configuration based on product status
  const getBadgeConfig = () => {
    if (!product.status) return null;
    
    switch (product.status) {
      case "soldout":
        return {
          text: "SOLD OUT",
          bgColor: "bg-[#DC2626]",
          textColor: "text-white",
          borderColor: "border-[#DC2626]"
        };
      case "sale":
        return {
          text: "SALE",
          bgColor: "bg-[#16A34A]",
          textColor: "text-white",
          borderColor: "border-[#16A34A]"
        };
      case "premium":
        return {
          text: "PREMIUM",
          bgColor: "bg-[#4C3F6C]",
          textColor: "text-white",
          borderColor: "border-[#4C3F6C]"
        };
      default:
        return null;
    }
  };

  const badgeConfig = getBadgeConfig();
  
  const handleProductClick = () => {
    // Delay the onClick callback to allow animation to play
    setTimeout(() => {
      onClick();
    }, 400); // Match animation duration
  };

  return (
    <div className="bg-[#F5F5F5] relative shrink-0 w-full rounded-[8px] overflow-hidden shadow-sm hover-lift">
      {/* Product Image Container */}
      <div
        className="relative w-full aspect-[3/4] bg-[#F5F5F5] cursor-pointer overflow-hidden group"
        onClick={onClick}
      >
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Heart Icon - Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute right-3 top-3 size-8 z-10"
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      
      {/* Badge Container */}
      {badgeConfig && (
        <div className="absolute left-4 bottom-[85px] flex gap-2 z-10">
          <div className={clsx(
            badgeConfig.bgColor,
            badgeConfig.borderColor,
            "border rounded-full px-3 py-1"
          )}>
            <span className={clsx(
              badgeConfig.textColor,
              "text-[11px] font-['Inter:Regular',_sans-serif]"
            )}>
              {badgeConfig.text}
            </span>
          </div>
        </div>
      )}
      
      {/* Product Info Container */}
      <div className="bg-white px-4 py-3 relative">
        <div className="mb-2">
          <p className="text-[#333333] font-['Inter:Regular',_sans-serif] text-[14px] leading-[1.5] line-clamp-2">
            {product.name}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-[#333333] font-['Inter:Regular',_sans-serif] text-[16px]">
            {product.price}
          </p>
          
          {/* Add to Cart Button with Size Selector */}
          <div className="relative">
            {showSizeSelector && hasStock && (
              <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-20 min-w-[140px]">
                <p className="text-[#4C3F6C] text-[12px] mb-2 px-2">Select Size:</p>
                <div className="grid grid-cols-3 gap-1">
                  {availableSizes.map((size) => {
                    const stock = product.availableSizes?.[size] || 0;
                    return (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSizeSelect(size);
                        }}
                        className="bg-[#F5F5F5] hover:bg-[#4C3F6C] hover:text-white text-[#333333] rounded px-2 py-1 text-[12px] transition-colors relative"
                        title={`${stock} in stock`}
                      >
                        {size}
                        {stock < 5 && stock > 0 && (
                          <span className="absolute -top-1 -right-1 bg-[#FFFD8F] text-[#4C3F6C] rounded-full size-3 flex items-center justify-center text-[8px]">
                            {stock}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {!hasStock && (
                  <p className="text-[#DC2626] text-[10px] text-center mt-2">Out of Stock</p>
                )}
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (hasStock) {
                  setShowSizeSelector(!showSizeSelector);
                }
              }}
              disabled={!hasStock}
              className={clsx(
                "rounded-lg size-8 flex items-center justify-center transition-colors",
                hasStock
                  ? "bg-[#4C3F6C] hover:bg-[#3d3256] cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed opacity-50"
              )}
              title={!hasStock ? "Out of Stock" : "Add to Cart"}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <div className="size-8">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g>
          {filled ? (
            <>
              <path
                d={svgPaths.p297cea80}
                fill="var(--fill-0, #FF8577)"
                fillOpacity="0.98"
              />
              <path
                d={svgPaths.p3bfbe380}
                fill="var(--fill-0, #FF8577)"
                fillOpacity="0.98"
              />
            </>
          ) : (
            <>
              <path
                d={svgPaths.p1177b300}
                stroke="var(--stroke-0, black)"
              />
              <path
                d={svgPaths.p1d24580}
                fill="var(--fill-0, #FF8577)"
                fillOpacity="0.98"
              />
            </>
          )}
        </g>
      </svg>
    </div>
  );
}

function PlusIcon() {
  return (
    <div className="size-8">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g>
          <path d={svgPaths.p367b3d00} fill="var(--fill-0, white)" />
        </g>
      </svg>
    </div>
  );
}