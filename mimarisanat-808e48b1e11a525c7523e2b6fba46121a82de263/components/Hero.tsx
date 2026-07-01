import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useSiteContent } from '../context/SiteContentContext';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { content } = useSiteContent();
  const hero = content?.hero;
  const [isDark, setIsDark] = useState(() => {
    // Başlangıçta mevcut temanın TERSİ ile başla ki geçiş efekti oluşsun
    if (typeof document !== 'undefined') {
      return !document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    // Dark mode kontrolü
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    // İlk yüklemede kısa bir gecikme ile doğru temaya geçiş yap (animasyonu tetikler)
    const timer = setTimeout(() => {
      checkDarkMode();
    }, 600);

    // Dark mode değişikliklerini izle
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Background Images with Theme-based Switching */}
      <div className="absolute inset-0 z-0">
        {/* Dark Mode Image (Akşam) */}
        <img
          src={hero?.darkImage || "/mimarisanatt/post_4/image_1.jpg"}
          alt="Evening Architecture"
          className={`absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-[2000ms] ${isDark ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-90 to-transparent mix-blend-multiply"></div>

        {/* Light Mode Image (Gündüz) */}
        <img
          src={hero?.lightImage || "/mimarisanatt/post_5/image_1.jpg"}
          alt="Daytime Architecture"
          className={`absolute inset-0 w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-[2000ms] ${!isDark ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Gradient Overlay for Darkening */}

        {/* Gradient for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-900 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute top-[88px] bottom-0 left-0 right-0 z-10 flex flex-col">

        {/* Post Image Integration */}
        <div className="flex-1 w-full fade-in-up delay-200 min-h-0 relative overflow-hidden group">

          {/* Top Frame Border Matching the Initial Request */}
          <div
            className="absolute top-0 left-0 w-full h-[3px] opacity-90 z-[30] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(159, 18, 57, 1) 50%, transparent 100%)',
              boxShadow: '0 2px 15px rgba(159, 18, 57, 0.6)'
            }}
          />

          <img
            src={hero?.featuredImage || "/insta_post/post_1/media_1.jpg"}
            alt="Mimari Sanat Featured Project"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] group-hover:scale-105"
          />
          {/* 1. Base Darkening for Text Readability - Increased contrast at the bottom */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/40 to-black/95 z-[5]"></div>

          {/* 2. Intense Light Source at Logo Area (Top-Left) - Tighter radius */}
          <div className="absolute top-0 left-0 w-[40vw] h-[40vw] pointer-events-none z-10 opacity-80 mix-blend-overlay" style={{ background: 'radial-gradient(circle at 5% 5%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.1) 25%, transparent 50%)', filter: 'blur(30px)' }} />

          {/* 3. Wide Soft Flashlight Beam - Ends much earlier to create contrast */}
          <div className="absolute top-[-20%] left-[-10%] w-[150%] h-[150%] pointer-events-none z-10 opacity-60 mix-blend-overlay transition-opacity duration-1000" style={{ background: 'radial-gradient(ellipse at 15% 15%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.05) 25%, transparent 45%)' }} />

          {/* Centered Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
            {/* Top Text (Optional Subtitle) */}
            <p className={`fade-in-up delay-100 text-xs md:text-sm tracking-[0.4em] uppercase font-medium transition-colors duration-[2000ms] mb-4 md:mb-6 drop-shadow-md ${isDark ? 'text-stone-300' : 'text-stone-200'}`}>
              {hero?.subtitle || t.hero.subtitle}
            </p>

            <h1 className={`fade-in-up delay-300 text-5xl md:text-7xl lg:text-8xl font-display font-normal leading-[1.1] transition-colors duration-[2000ms] ease-in-out drop-shadow-xl ${isDark ? 'text-[#CBA36A]' : 'text-white'}`}>
              {hero?.title || t.hero.title} <br />
              <span className={`italic font-serif transition-colors duration-[2000ms] ease-in-out ${isDark
                ? 'text-white'
                : 'text-[#CBA36A]'
                }`}>
                {hero?.titleItalic || t.hero.titleItalic}
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-all group"
        aria-label="Scroll to content"
      >
        {/* Mouse Icon */}
        <div className="relative">
          <svg width="30" height="45" viewBox="0 0 30 45" fill="none" className="animate-bounce">
            <rect x="1" y="1" width="28" height="43" rx="14" stroke="currentColor" strokeWidth="2" />
            <circle cx="15" cy="12" r="3" fill="currentColor" className="animate-scroll-wheel" />
          </svg>
        </div>
      </button>
    </section>
  );
};