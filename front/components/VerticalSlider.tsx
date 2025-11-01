'use client';

import { useState, useEffect, useRef } from 'react';

interface VerticalSliderProps {
  children: React.ReactNode[];
}

export default function VerticalSlider({ children }: VerticalSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = children.length;

  const goToSlide = (index: number) => {
    if (isTransitioning || index < 0 || index >= totalSlides) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      goToSlide(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    }
  };

  // Handle wheel event (mouse scroll)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Clear existing timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      // Set new timeout to debounce scroll events
      wheelTimeoutRef.current = setTimeout(() => {
        if (e.deltaY > 0) {
          // Scrolling down
          nextSlide();
        } else if (e.deltaY < 0) {
          // Scrolling up
          prevSlide();
        }
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, [currentIndex, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Touch events for mobile
  const touchStartY = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diff = touchStartY.current - touchEndY.current;
    const threshold = 50; // minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped up -> next slide
        nextSlide();
      } else {
        // Swiped down -> prev slide
        prevSlide();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Container */}
      <div
        className="h-full transition-transform duration-600 ease-out"
        style={{ transform: `translateY(-${currentIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="h-screen w-full flex-shrink-0">
            <div className="h-full overflow-y-auto">
              {child}
            </div>
          </div>
        ))}
      </div>

      {/* Minimal Slide Indicator */}
      {totalSlides > 1 && (
        <div className="fixed bottom-6 right-6 z-50 text-neon-green/40 text-xs uppercase tracking-wider text-right">
          <p className="text-neon-green/60 font-bold">[ {currentIndex + 1} / {totalSlides} ]</p>
          <p className="mt-1">&gt; Usa la rueda del mouse &lt;</p>
        </div>
      )}
    </div>
  );
}
