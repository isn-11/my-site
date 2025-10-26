import React, { useState } from 'react';
import StatusBar from './shared/StatusBar';
import svgPaths from "../imports/svg-s5y93igtx2";
import image_c49aba315f0b70161526e5d8fe398521d6dc42aa from 'figma:asset/c49aba315f0b70161526e5d8fe398521d6dc42aa.png';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileInfo {
  email: string;
  password: string;
}

interface CustomerInfo {
  fullName: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  farm: string;
  category: string;
  status?: string;
  images: string[];
  isFavorite: boolean;
  description: string;
  location: string;
  dietary: string[];
  availableSizes?: Record<string, number>;
}

interface PlaceholderPageProps {
  title: string;
  onBack: () => void;
  onMenuClick: () => void;
  cartCount: number;
  onCartClick?: () => void;
  onLogoClick?: () => void;
  profileInfo?: ProfileInfo | null;
  customerInfo?: CustomerInfo;
  onCreateProfile?: (profileInfo: ProfileInfo, customerInfo: CustomerInfo) => void;
  favorites?: Set<number>;
  products?: Product[];
  onProductClick?: (product: Product) => void;
}

export default function PlaceholderPage({ title, onBack, onMenuClick, cartCount, onCartClick, onLogoClick, profileInfo, customerInfo, onCreateProfile, favorites, products, onProductClick }: PlaceholderPageProps) {
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetStep, setResetStep] = useState<'email' | 'newPassword' | 'success'>('email');
  
  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  
  const [formData, setFormData] = useState<ProfileInfo & CustomerInfo>({
    email: '',
    password: '',
    fullName: '',
    address: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
  });

  const handleInputChange = (field: keyof (ProfileInfo & CustomerInfo), value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onCreateProfile) {
      const profileInfo: ProfileInfo = {
        email: formData.email,
        password: formData.password,
      };
      const customerInfo: CustomerInfo = {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        country: formData.country,
        state: formData.state,
        zipCode: formData.zipCode,
      };
      onCreateProfile(profileInfo, customerInfo);
      setIsCreatingProfile(false);
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setResetStep('email');
    if (profileInfo) {
      setResetEmail(profileInfo.email);
    }
  };

  const handleVerifyEmail = () => {
    // In a real app, this would send a reset link to the email
    if (resetEmail === profileInfo?.email) {
      setResetStep('newPassword');
    } else {
      alert('Email does not match the registered email.');
    }
  };

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    
    // In a real app, this would update the password in the backend
    if (onCreateProfile && profileInfo && customerInfo) {
      const updatedProfileInfo: ProfileInfo = {
        email: profileInfo.email,
        password: newPassword,
      };
      onCreateProfile(updatedProfileInfo, customerInfo);
    }
    
    setResetStep('success');
    setTimeout(() => {
      setIsForgotPassword(false);
      setResetEmail('');
      setNewPassword('');
      setConfirmPassword('');
      setResetStep('email');
    }, 2000);
  };

  const handleCancelReset = () => {
    setIsForgotPassword(false);
    setResetEmail('');
    setNewPassword('');
    setConfirmPassword('');
    setResetStep('email');
  };

  const handleContactSubmit = () => {
    // In a real app, this would send the contact form to the backend
    console.log('Contact form submitted:', {
      name: contactName,
      email: contactEmail,
      subject: contactSubject,
      message: contactMessage,
    });
    
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactEmail('');
      setContactSubject('');
      setContactMessage('');
    }, 3000);
  };

  const isContactFormValid = 
    contactName.trim() !== '' &&
    contactEmail.trim() !== '' &&
    contactSubject.trim() !== '' &&
    contactMessage.trim() !== '';

  const isFormValid = 
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.fullName.trim() !== '' &&
    formData.address.trim() !== '' &&
    formData.city.trim() !== '' &&
    formData.country.trim() !== '' &&
    formData.state.trim() !== '' &&
    formData.zipCode.trim() !== '';
  
  return (
    <div className="bg-[#ffffff] relative size-full">
      {/* Status Bar */}
      <StatusBar />
      
      {/* Header */}
      <div className="absolute bg-[rgb(59,42,85)] h-[149px] left-0 right-0 top-0">
        <div className="absolute border-[0px_0px_1px] border-neutral-200 border-solid inset-0 pointer-events-none shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)]" />
        
        {/* Mobile Nav */}
        <div className="absolute bg-[#ffffff] h-16 left-0 overflow-clip right-0 top-[31px]">
          <div className="absolute bg-[rgb(59,42,85)] h-[66px] left-0 top-0 w-[393px]" />
          
          {/* Menu Icon - Left */}
          <button 
            onClick={onMenuClick}
            className="absolute left-5 rounded-2xl size-8 top-[18px] flex items-center justify-center z-10"
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
          
          {/* Logo - Center */}
          <button
            onClick={onLogoClick}
            className="absolute css-v5bt0j flex flex-col font-['Newsreader:Medium',_sans-serif] font-medium justify-center leading-[0] text-[#4C3F6C] text-[24px] text-center text-nowrap top-9 tracking-[-0.24px] translate-x-[-50%] translate-y-[-50%] cursor-pointer"
            style={{ left: "calc(50% - 0.5px)" }}
          >
            <img src={image_c49aba315f0b70161526e5d8fe398521d6dc42aa} alt="iktara" className="h-16 w-auto m-[0px] px-[50px] py-[0px]" />
          </button>
          
          {/* Cart Icon - Right */}
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
          
          {/* Back Button - Next to Cart */}
          <button 
            onClick={onBack}
            className="absolute right-[60px] rounded-2xl size-8 top-[18px] flex items-center justify-center cursor-pointer"
          >
            <svg className="block size-6" fill="none" viewBox="0 0 24 24">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        
        {/* Sub Nav */}
        <div className="absolute left-6 right-6 top-[103px]">
          <div className="box-border content-stretch flex flex-col gap-4 items-end justify-end p-0 relative w-full">
            <div className="relative shrink-0 w-full">
              <div className="box-border content-stretch flex flex-row font-normal items-center justify-start leading-[0] p-0 relative text-left w-full">
                <div className="basis-0 css-ip39ex flex flex-col font-['Newsreader:Regular',_sans-serif] grow justify-center min-h-px min-w-px relative shrink-0 text-white text-[24px] tracking-[-0.48px]">
                  <p className="block leading-[32px] text-[24px]">{title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="absolute left-6 right-6 top-[180px] bottom-[100px] overflow-y-auto">
        {profileInfo ? (
          // Show profile information if it exists
          <div className="mt-4 space-y-4">
            {/* Account Information Card */}
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                Account Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                    Email
                  </label>
                  <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000]">
                    {profileInfo.email}
                  </p>
                </div>
                <div>
                  <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                    Password
                  </label>
                  <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] mb-2">
                    ••••••••
                  </p>
                  <button
                    onClick={handleForgotPassword}
                    className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#4C3F6C] underline hover:text-[#3d3256]"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>
            </div>

            {/* Shipping Information Card */}
            {customerInfo && customerInfo.fullName && (
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                  Shipping Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                      Full Name
                    </label>
                    <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000]">
                      {customerInfo.fullName}
                    </p>
                  </div>
                  <div>
                    <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                      Address
                    </label>
                    <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000]">
                      {customerInfo.address}
                    </p>
                  </div>
                  <div>
                    <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                      City
                    </label>
                    <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000]">
                      {customerInfo.city}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                        State
                      </label>
                      <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000]">
                        {customerInfo.state || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                        Zip Code
                      </label>
                      <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000]">
                        {customerInfo.zipCode}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                      Country
                    </label>
                    <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000]">
                      {customerInfo.country}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Favorite Products Card */}
            {favorites && products && (
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                  My Favorites ({favorites.size})
                </h3>
                {favorites.size === 0 ? (
                  <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575] text-center py-4">
                    You haven't added any favorites yet. Browse our products and tap the heart icon to save your favorites!
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {products
                      .filter((product) => favorites.has(product.id))
                      .map((product) => (
                        <button
                          key={product.id}
                          onClick={() => onProductClick && onProductClick(product)}
                          className="bg-[#F5F5F5] rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="relative w-full aspect-[3/4]">
                            <ImageWithFallback
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            {product.status === 'soldout' && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white text-[12px] font-['Inter:Medium',_sans-serif] bg-[#4C3F6C] px-3 py-1 rounded">
                                  SOLD OUT
                                </span>
                              </div>
                            )}
                            {product.status === 'sale' && (
                              <div className="absolute top-2 left-2">
                                <span className="text-white text-[10px] font-['Inter:Medium',_sans-serif] bg-[#FFFD8F] text-[#4C3F6C] px-2 py-0.5 rounded">
                                  SALE
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="p-2">
                            <h4 className="text-[12px] font-['Inter:Medium',_sans-serif] text-[#000000] line-clamp-2 text-left mb-1">
                              {product.name}
                            </h4>
                            <p className="text-[14px] font-['Inter:Medium',_sans-serif] text-[#4C3F6C] text-left">
                              {product.price}
                            </p>
                          </div>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : isCreatingProfile ? (
          // Show profile creation form
          <div className="mt-4 space-y-4 pb-8">
            {/* Account Information Card */}
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                Account Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                    Password
                  </label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a password"
                    className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Information Card */}
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                Shipping Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                    Full Name
                  </label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                    Address
                  </label>
                  <Input
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your street address"
                    className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                    City
                  </label>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter your city"
                    className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                    Country
                  </label>
                  <Input
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder="Enter your country"
                    className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                      State
                    </label>
                    <Input
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="State/Province"
                      className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                      Zip Code
                    </label>
                    <Input
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="Zip/Postal"
                      className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => setIsCreatingProfile(false)}
                variant="outline"
                className="flex-1 border-neutral-200 text-[#757575] font-['Inter:Medium',_sans-serif] text-[16px] py-3"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="flex-1 bg-[#4C3F6C] hover:bg-[#3d3256] text-[#ffffff] font-['Inter:Medium',_sans-serif] text-[16px] py-3 disabled:bg-neutral-200 disabled:cursor-not-allowed"
              >
                Save Profile
              </Button>
            </div>
          </div>
        ) : isForgotPassword ? (
          // Show password reset form
          <div className="mt-4 space-y-4 pb-8">
            {/* Account Information Card */}
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                Account Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                  />
                </div>
                {resetStep === 'newPassword' && (
                  <>
                    <div>
                      <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                        New Password
                      </label>
                      <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Create a new password"
                        className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                        Confirm Password
                      </label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleCancelReset}
                variant="outline"
                className="flex-1 border-neutral-200 text-[#757575] font-['Inter:Medium',_sans-serif] text-[16px] py-3"
              >
                Cancel
              </Button>
              {resetStep === 'email' && (
                <Button
                  onClick={handleVerifyEmail}
                  className="flex-1 bg-[#4C3F6C] hover:bg-[#3d3256] text-[#ffffff] font-['Inter:Medium',_sans-serif] text-[16px] py-3"
                >
                  Verify Email
                </Button>
              )}
              {resetStep === 'newPassword' && (
                <Button
                  onClick={handleResetPassword}
                  className="flex-1 bg-[#4C3F6C] hover:bg-[#3d3256] text-[#ffffff] font-['Inter:Medium',_sans-serif] text-[16px] py-3"
                >
                  Reset Password
                </Button>
              )}
              {resetStep === 'success' && (
                <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#4C3F6C] text-center">
                  Password reset successfully!
                </p>
              )}
            </div>
          </div>
        ) : title === "About Us" ? (
          // About Us Content
          <div className="mt-4 space-y-4 pb-8">
            {/* Hero Image */}
            <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758653500437-26660f405fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwdGVhbSUyMGhvc3BpdGFsfGVufDF8fHx8MTc2MTIzODY4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Healthcare Team"
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Our Story */}
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                Our Story
              </h3>
              <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575] mb-3 leading-relaxed">
                Founded with a deep respect for healthcare professionals, iktara was born from a simple belief: those who dedicate their lives to caring for others deserve the highest quality medical apparel.
              </p>
              <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575] leading-relaxed">
                We understand the demanding nature of your work, and we're committed to providing scrubs and medical wear that combine comfort, durability, and style to support you throughout your long shifts.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                Our Mission
              </h3>
              <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575] leading-relaxed">
                To empower healthcare professionals with premium medical apparel that enhances their confidence and performance, allowing them to focus on what matters most—providing exceptional patient care.
              </p>
            </div>

            {/* Why Choose iktara */}
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                Why Choose iktara
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#4C3F6C] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-['Inter:Medium',_sans-serif] text-[#000000] mb-1">
                      Premium Quality
                    </h4>
                    <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575]">
                      Our scrubs are crafted from high-performance, breathable fabrics designed to withstand the rigors of your daily work.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#4C3F6C] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-['Inter:Medium',_sans-serif] text-[#000000] mb-1">
                      Comfort First
                    </h4>
                    <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575]">
                      With moisture-wicking technology and ergonomic designs, our apparel keeps you comfortable during long shifts.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#4C3F6C] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-['Inter:Medium',_sans-serif] text-[#000000] mb-1">
                      Functional Design
                    </h4>
                    <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575]">
                      Multiple pockets and practical features ensure you have everything you need within easy reach.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#4C3F6C] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[16px] font-['Inter:Medium',_sans-serif] text-[#000000] mb-1">
                      Professional Style
                    </h4>
                    <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575]">
                      Modern fits and contemporary colors help you look and feel your best while maintaining professionalism.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Commitment */}
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                Our Commitment to You
              </h3>
              <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575] mb-3 leading-relaxed">
                We're dedicated to continuous improvement and innovation in medical apparel. Every piece in our collection undergoes rigorous testing to ensure it meets the demanding standards of healthcare environments.
              </p>
              <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575] leading-relaxed">
                Thank you for choosing iktana. We're honored to be part of your healthcare journey.
              </p>
            </div>
          </div>
        ) : (
          // Show default "coming soon" message or create profile button or contact form
          <div>
            {title === "Contact Us" ? (
              // Contact Us Form
              <div className="mt-4 space-y-4 pb-8">
                {contactSubmitted ? (
                  <div className="flex items-center justify-center h-full py-16">
                    <div className="text-center">
                      <div className="mb-4">
                        <svg className="mx-auto h-16 w-16 text-[#4C3F6C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#757575]">
                        We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Contact Information */}
                    <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                        Get In Touch
                      </h3>
                      <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#757575] mb-4">
                        Have a question or need assistance? We're here to help! Fill out the form below and we'll get back to you as soon as possible.
                      </p>
                      <div className="space-y-2">
                        <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#000000]">
                          <span className="text-[#757575]">Email:</span> support@iktara.com
                        </p>
                        <p className="text-[14px] font-['Inter:Regular',_sans-serif] text-[#000000]">
                          <span className="text-[#757575]">Phone:</span> 1-800-IKTARA
                        </p>
                      </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm">
                      <h3 className="text-[20px] font-['Newsreader:Regular',_sans-serif] text-[#4C3F6C] mb-4">
                        Send us a Message
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                            Name
                          </label>
                          <Input
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Enter your name"
                            className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                          />
                        </div>
                        <div>
                          <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                            Email
                          </label>
                          <Input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                          />
                        </div>
                        <div>
                          <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                            Subject
                          </label>
                          <Input
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            placeholder="What's this about?"
                            className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3"
                          />
                        </div>
                        <div>
                          <label className="text-[12px] font-['Inter:Regular',_sans-serif] text-[#757575] block mb-1">
                            Message
                          </label>
                          <Textarea
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="Tell us how we can help..."
                            className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#000000] border border-neutral-200 rounded-lg px-4 py-3 min-h-[120px]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      onClick={handleContactSubmit}
                      disabled={!isContactFormValid}
                      className="w-full bg-[#4C3F6C] hover:bg-[#3d3256] text-[#ffffff] font-['Inter:Medium',_sans-serif] text-[16px] py-3 disabled:bg-neutral-200 disabled:cursor-not-allowed"
                    >
                      Send Message
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <h2 className="text-[24px] font-['Newsreader:Regular',_sans-serif] text-[#426b1f] mb-4">{title}</h2>
                  <p className="text-[16px] font-['Inter:Regular',_sans-serif] text-[#757575] mb-4">
                    {title === "My Profile" 
                      ? "No profile found. Create a profile to save your information for faster future orders!"
                      : "This screen is coming soon!"
                    }
                  </p>
                  {title === "My Profile" && (
                    <Button
                      onClick={() => setIsCreatingProfile(true)}
                      className="bg-[#4C3F6C] hover:bg-[#3d3256] text-[#ffffff] font-['Inter:Medium',_sans-serif] text-[16px] px-6 py-3"
                    >
                      Create Profile
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
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