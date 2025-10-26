import image_c49aba315f0b70161526e5d8fe398521d6dc42aa from 'figma:asset/c49aba315f0b70161526e5d8fe398521d6dc42aa.png';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

export default function Menu({ isOpen, onClose, onNavigate }: MenuProps) {
  const handleNavigation = (screen: string) => {
    onNavigate(screen);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Menu with circle reveal */}
          <motion.div
            initial={{ 
              clipPath: 'circle(0% at 50% calc(100% - 32px))'
            }}
            animate={{ 
              clipPath: 'circle(150% at 50% calc(100% - 32px))'
            }}
            exit={{ 
              clipPath: 'circle(0% at 50% calc(100% - 32px))'
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="absolute inset-0 bg-[#3B2A55] z-50 flex flex-col items-center justify-center"
          >
            {/* Background Illustration */}
            <MaskGroup />
            
            {/* Menu Items */}
            <MenuItems onNavigate={handleNavigation} onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MaskGroup() {
  return null;
}

interface MenuItemsProps {
  onNavigate: (screen: string) => void;
  onClose: () => void;
}

function MenuItems({ onNavigate, onClose }: MenuItemsProps) {
  const menuItems = [
    { label: "Shop", screen: "list" },
    { label: "About Us", screen: "about" },
    { label: "My Profile", screen: "profile" },
    { label: "Contact Us", screen: "contact" },
    { label: "Cart", screen: "basket" },
  ];

  return (
    <div className="flex flex-col items-center w-full h-full relative">
      {/* Logo at top */}
      <div className="pt-16 mb-16">
        <img src={image_c49aba315f0b70161526e5d8fe398521d6dc42aa} alt="iktara" className="h-24 w-auto" />
      </div>
      
      {/* Menu Items centered */}
      <div className="flex flex-col gap-8 items-center flex-1 justify-center">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.screen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            onClick={() => onNavigate(item.screen)}
            className="font-['Newsreader:Regular',_sans-serif] font-normal text-[#ffffff] text-[36px] text-center tracking-[-0.52px] hover:text-[#FFFD8F] transition-all duration-200 hover:scale-110 text-shadow-sm"
          >
            {item.label}
          </motion.button>
        ))}
      </div>
      
      {/* Close Button at bottom - positioned to match floating menu button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <CloseButtonInline onClick={onClose} />
      </div>
    </div>
  );
}

interface CloseButtonProps {
  onClick: () => void;
}

function CloseButtonInline({ onClick }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer overflow-visible rounded-full size-14 border-2 border-white hover:opacity-80 transition-opacity"
    >
      <svg className="block w-6 h-6" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g>
          <path
            d="M1 1.00003L13.7279 13.7279"
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            d="M1.13605 13.7279L13.864 1"
            stroke="white"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </button>
  );
}

function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className="absolute block cursor-pointer right-[20px] overflow-visible rounded-2xl size-8 top-[20px] hover:opacity-80 transition-opacity"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="block w-6 h-6" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
          <g>
            <path
              d="M1 1.00003L13.7279 13.7279"
              stroke="white"
              strokeWidth="1.5"
            />
            <path
              d="M1.13605 13.7279L13.864 1"
              stroke="white"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>
    </button>
  );
}