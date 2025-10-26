import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface BrandVideoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BrandVideoOverlay({ isOpen, onClose }: BrandVideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Reset video to start
      videoRef.current.currentTime = 0;
      
      // Attempt to play and handle the promise
      playPromiseRef.current = videoRef.current.play();
      
      if (playPromiseRef.current !== undefined) {
        playPromiseRef.current
          .then(() => {
            // Video started playing successfully
            playPromiseRef.current = null;
          })
          .catch((error) => {
            // Auto-play was prevented or interrupted
            console.log('Video playback prevented:', error);
            playPromiseRef.current = null;
          });
      }
      
      // Auto-close after video ends
      const handleEnded = () => {
        onClose();
      };
      
      const currentVideo = videoRef.current;
      currentVideo.addEventListener('ended', handleEnded);
      
      return () => {
        if (currentVideo) {
          currentVideo.removeEventListener('ended', handleEnded);
          
          // Properly pause the video if it's playing
          if (playPromiseRef.current) {
            playPromiseRef.current
              .then(() => {
                if (currentVideo) {
                  currentVideo.pause();
                }
              })
              .catch(() => {
                // Ignore errors during cleanup
              });
          } else if (currentVideo) {
            currentVideo.pause();
          }
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-0 left-0 right-0 bottom-0 z-[9999] bg-black flex items-center justify-center"
    >
      {/* Video Player */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        onClick={onClose}
        preload="metadata"
        crossOrigin="anonymous"
      >
        {/* Using multiple video sources for better compatibility */}
        <source
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
          type="video/mp4"
        />
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
      </video>

      {/* Close Button - Bottom Center (same position as menu button) */}
      <button
        onClick={onClose}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[10000] bg-white/20 hover:bg-white/30 rounded-full size-14 flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:scale-110 border-2 border-white/40"
        aria-label="Close video"
      >
        <X className="size-7 text-white" />
      </button>
    </div>
  );
}