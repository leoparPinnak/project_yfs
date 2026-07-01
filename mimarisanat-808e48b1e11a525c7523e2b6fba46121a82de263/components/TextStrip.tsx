import React, { useEffect, useRef } from 'react';

export const TextStrip: React.FC = () => {
  // Use refs to manipulate DOM directly, avoiding React re-renders on scroll
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;

        // Get the parent element (the slider container) position relative to viewport
        // We want the animation to happen as the slider comes into view and scrolls through
        const parent = containerRef.current.closest('.relative.h-full'); // Target the slider container
        if (!parent) return;

        const rect = parent.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the element has been scrolled past
        // Start animation when top of element enters viewport
        // End animation when bottom of element leaves viewport or reaches a certain point

        // Calculate progress: 0 when top enters bottom of viewport, 1 when fully scrolled
        // We want the strip to expand as we scroll down to it

        // Distance from top of viewport to top of element
        const elementTop = rect.top;

        // Calculate progress based on element position in viewport
        // When elementTop is at windowHeight (just entering), progress is 0
        // When elementTop is at 0 (at top of screen), progress is 1
        let progress = (windowHeight - elementTop) / windowHeight;

        // Clamp between 0 and 1
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        // Responsive check
        const isMobile = window.innerWidth < 768;

        let widthValue;
        if (isMobile) {
          // Mobile: Start at 80%, go to 95%
          const expansion = progress * 15;
          widthValue = `${80 + expansion}%`;
        } else {
          // Desktop: Start at 40%, go to 90%
          const expansion = progress * 50;
          widthValue = `calc(max(300px, 40%) + ${expansion}%)`;
        }

        // Apply directly to DOM node
        if (containerRef.current) {
          containerRef.current.style.width = widthValue;
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize once
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const text = "MIMARI SANAT";
  const chars = text.split('');

  return (
    <div className="absolute top-0 left-0 right-0 z-30 w-full bg-transparent overflow-hidden py-3 md:py-6 lg:py-8 flex flex-col items-center justify-center pointer-events-none">
      {/* Text Container - Width controlled via Ref */}
      {/* Optimized for compact slider container */}
      <div
        ref={containerRef}
        className="flex justify-around items-center will-change-[width] transition-none w-[90vw] sm:w-[85vw] md:w-auto md:max-w-full"
        style={{ maxWidth: '85vw' }} // Fit within slider bounds
      >
        {chars.map((char, index) => (
          <span
            key={index}
            className={`text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-display font-medium text-white whitespace-pre tracking-wider ${char === ' ' ? 'w-0.5 sm:w-1 md:w-2 lg:w-4' : ''
              }`}
            style={{ textShadow: '0 3px 8px rgba(0,0,0,0.6)' }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};