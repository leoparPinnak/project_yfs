import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const images = [
  
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/220282/l/Swissotel-Resort---Spa-Cesme-Genel-390459.jpg',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/220282/l/Swissotel-Resort---Spa-Cesme-Genel-390473.jpg'
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <section className="relative h-screen min-h-[100dvh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image Slider */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Bottom gradient transition fade-out to blend with features section bg below */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 dark:from-stone-900 to-transparent pointer-events-none z-10 transition-colors duration-500"></div>

      {/* Scroll Down Indicator - Guaranteed viewport visibility */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30 pointer-events-none">
        <div className="w-[16px] h-[26px] rounded-full border border-white/25 flex justify-center p-1.5">
          <div className="w-[3px] h-[5px] rounded-full bg-brand-primary animate-bounce"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-sans pb-16">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-4 text-white drop-shadow-lg dark:font-display dark:font-normal">
          {t('hero_title')}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md font-light">
          {t('hero_desc')}
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a 
            href="#services" 
            className="bg-indigo-500 hover:bg-indigo-600 dark:bg-stone-900/60 dark:backdrop-blur-md dark:border dark:border-brand-primary/40 dark:hover:border-brand-primary dark:text-brand-primary dark:hover:bg-brand-primary/15 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30 dark:shadow-rose-950/20"
          >
            {t('nav_services')}
          </a>
          <a href="#/projects" className="btn-glow-pistachio font-bold py-3 px-8 rounded-lg text-lg inline-block">
            {t('nav_projects')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
