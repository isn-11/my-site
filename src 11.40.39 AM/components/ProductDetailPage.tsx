import React, { useState } from 'react';
import svgPaths from "../imports/svg-42raqsyfh4";
import footerSvgPaths from "../imports/svg-ved004mhkj";
import clsx from "clsx";
import StatusBar from './shared/StatusBar';
import image_c49aba315f0b70161526e5d8fe398521d6dc42aa from 'figma:asset/c49aba315f0b70161526e5d8fe398521d6dc42aa.png';

interface ProductDetailPageProps {
  product: {
    id: number;
    name: string;
    price: string;
    priceValue: number;
    farm: string;
    category: string;
    images: string[];
    description: string;
    location: string;
    dietary: string[];
  };
  cartCount: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBack: () => void;
  onLogoClick: () => void;
  onAddToCart: (quantity: number, size: string) => void;
  onMenuClick: () => void;
  onCartClick: () => void;
}

export default function ProductDetailPage({
  product,
  cartCount,
  isFavorite,
  onToggleFavorite,
  onBack,
  onLogoClick,
  onAddToCart,
  onMenuClick,
  onCartClick
}: ProductDetailPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showQuantityDropdown, setShowQuantityDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  const handleAddToCart = () => {
    onAddToCart(quantity, size);
  };

  const handleQuantitySelect = (newQuantity: number) => {
    setQuantity(newQuantity);
    setShowQuantityDropdown(false);
  };

  const handleSizeSelect = (newSize: string) => {
    setSize(newSize);
    setShowSizeDropdown(false);
  };

  return (
    <div className="bg-[#ffffff] relative size-full">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Header */}
      <Header 
        cartCount={cartCount}
        category={product.category}
        onBack={onBack}
        onLogoClick={onLogoClick}
        onMenuClick={onMenuClick}
        onCartClick={onCartClick}
      />
      
      {/* Product Images */}
      <div className="absolute left-0 right-0 top-[149px] h-[300px]">
        <div 
          className="w-full h-full bg-cover bg-center relative transition-all duration-300"
          style={{ backgroundImage: `url('${product.images[currentImageIndex]}')` }}
        >
          {/* Favorite Heart Button - Top Right */}
          <button
            onClick={onToggleFavorite}
            className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 button-smooth"
          >
            <svg
              className="w-6 h-6"
              fill={isFavorite ? "#4C3F6C" : "none"}
              stroke={isFavorite ? "#4C3F6C" : "#4C3F6C"}
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
          </button>
          
          {/* Image Navigation Dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={clsx(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Product Details */}
      <div className="absolute left-0 right-0 top-[449px] bottom-[100px] overflow-y-auto">{/* 149 + 300 = 449 */}
        <div className="px-6 py-6 space-y-6">
          {/* Product Name */}
          <div>
            <h1 className="font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] text-[24px] leading-[32px] tracking-[-0.48px]">
              {product.name}
            </h1>
          </div>
          
          {/* Product Info */}
          <div>
            <p className="text-[18px] font-['Inter:Regular',_sans-serif] text-[#4C3F6C] mb-2">
              {product.price}
            </p>
            <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575]">
              {product.farm} →
            </p>
          </div>
          
          {/* Description */}
          <div>
            <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] leading-[24px] mb-4">
              {product.description}
            </p>
            <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#757575] leading-[20px]">
              {product.location}
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-[#ffffff] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] absolute bottom-0 left-0 right-0 h-[100px]">
        <div className="absolute left-6 right-6 top-6">
          <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative w-full">
            {/* Quantity Input */}
            <div className="bg-[#ffffff] relative rounded-lg shrink-0 w-[58px]">
              <div className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-lg" />
              <div className="relative size-full">
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-3 relative w-[58px]">
                  <div className="relative shrink-0">
                    <button
                      onClick={() => setShowQuantityDropdown(!showQuantityDropdown)}
                      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative"
                    >
                      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.16px]">
                        <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
                          {quantity}
                        </p>
                      </div>
                      <div className="flex h-[4px] items-center justify-center relative shrink-0 w-[7px]">
                        <div className="flex-none rotate-[90deg]">
                          <div className="h-[7px] relative w-[3.5px]">
                            <div className="absolute bottom-[-5.051%] left-[-10.101%] right-[-20.203%] top-[-5.051%]">
                              <svg
                                className="block size-full"
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox="0 0 6 9"
                              >
                                <path
                                  d="M1 1L4.5 4.5L1 8"
                                  stroke="var(--stroke-0, black)"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Dropdown Menu */}
              {showQuantityDropdown && (
                <div className="absolute bottom-full left-0 right-0 bg-white border border-neutral-200 rounded-lg mb-1 max-h-48 overflow-y-auto z-50">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleQuantitySelect(num)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 font-['Inter:Regular',_sans-serif] text-[14px] text-[#000000] font-normal"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Size Input */}
            <div className="bg-[#ffffff] relative rounded-lg shrink-0 w-[58px]">
              <div className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-lg" />
              <div className="relative size-full">
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start px-4 py-3 relative w-[58px]">
                  <div className="relative shrink-0">
                    <button
                      onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                      className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative"
                    >
                      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#000000] text-[16px] text-left text-nowrap tracking-[-0.16px]">
                        <p className="adjustLetterSpacing block leading-[24px] whitespace-pre">
                          {size}
                        </p>
                      </div>
                      <div className="flex h-[4px] items-center justify-center relative shrink-0 w-[7px]">
                        <div className="flex-none rotate-[90deg]">
                          <div className="h-[7px] relative w-[3.5px]">
                            <div className="absolute bottom-[-5.051%] left-[-10.101%] right-[-20.203%] top-[-5.051%]">
                              <svg
                                className="block size-full"
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox="0 0 6 9"
                              >
                                <path
                                  d="M1 1L4.5 4.5L1 8"
                                  stroke="var(--stroke-0, black)"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Dropdown Menu */}
              {showSizeDropdown && (
                <div className="absolute bottom-full left-0 right-0 bg-white border border-neutral-200 rounded-lg mb-1 max-h-48 overflow-y-auto z-50">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 font-['Inter:Regular',_sans-serif] text-[14px] text-[#000000] font-normal"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Add to Basket Button */}
            <div className="basis-0 bg-[#4C3F6C] grow min-h-px min-w-px relative rounded-lg shrink-0">
              <button
                onClick={handleAddToCart}
                className="flex flex-row items-center relative size-full"
              >
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start pl-6 pr-4 py-2 relative w-full">
                  <div className="basis-0 flex flex-col font-['Inter:Regular',_sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left tracking-[-0.16px]">
                    <p className="block leading-[24px] text-[14px]">Add to basket</p>
                  </div>
                  <div className="relative shrink-0 size-8">
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 32 32"
                    >
                      <path d={footerSvgPaths.p367b3d00} fill="var(--fill-0, white)" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface HeaderProps {
  cartCount: number;
  category: string;
  onBack: () => void;
  onLogoClick: () => void;
  onMenuClick: () => void;
  onCartClick: () => void;
}

// Helper function to format category name
function formatCategoryName(category: string): string {
  // Convert "head-caps" to "Head Caps", "scrubs" to "Scrubs", "lab-coats" to "Lab Coats"
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function Header({ cartCount, category, onBack, onLogoClick, onMenuClick, onCartClick }: HeaderProps) {
  return (
    <div className="absolute bg-[rgb(59,42,85)] h-[149px] left-0 right-0 top-0">
      <div className="absolute border-[0px_0px_1px] border-neutral-200 border-solid inset-0 pointer-events-none shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]" />
      
      {/* Mobile Nav */}
      <div className="absolute bg-[#ffffff] h-16 left-0 overflow-clip right-0 top-[31px]">
        <div className="absolute bg-[rgb(59,42,85)] h-[66px] left-0 top-0 w-[393px]" />
        
        {/* Logo */}
        <div
          className="absolute css-v5bt0j flex flex-col font-['Newsreader:Medium',_sans-serif] font-medium justify-center leading-[0] text-[#4C3F6C] text-[24px] text-center text-nowrap top-9 tracking-[-0.24px] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
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
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute right-[60px] rounded-2xl size-8 top-[18px] flex items-center justify-center cursor-pointer"
        >
          <svg className="block size-6" fill="none" viewBox="0 0 24 24">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        
        {/* Menu Icon */}
        <button 
          onClick={onMenuClick}
          className="absolute left-5 rounded-2xl size-8 top-[18px] flex items-center justify-center"
        >
          <div className="h-1.5 w-[18px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 8">
              <g>
                <line stroke="white" strokeWidth="1.5" x2="18" y1="1.25" y2="1.25" />
                <line stroke="white" strokeWidth="1.5" x2="18" y1="7.25" y2="7.25" />
              </g>
            </svg>
          </div>
        </button>
      </div>
      
      {/* Sub Nav - Category Display */}
      <div className="absolute left-6 right-6 top-[103px]">
        <div className="box-border content-stretch flex flex-col gap-4 items-end justify-end p-0 relative w-full">
          <div className="relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-row font-normal items-center justify-start leading-[0] p-0 relative text-left w-full">
              <div className="basis-0 flex flex-col font-['Newsreader:Regular',_sans-serif] grow justify-center min-h-px min-w-px relative shrink-0 text-[#000000] text-[24px] tracking-[-0.48px]">
                <p className="block leading-[32px] text-[24px] text-[rgb(255,255,255)]">{formatCategoryName(category)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}