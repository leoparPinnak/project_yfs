import React, { useState, useEffect } from 'react';
import { YfsLogo } from './YfsLogo';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [key, setKey] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Loop the logo drawing animation every 7.5 seconds
    const animInterval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 7500);

    // Fade out the preloader after a complete animation cycle and 1s showcase window (5.8 seconds)
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
    }, 5800);

    // Complete preloader and show main page (6.4 seconds)
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 6400);

    return () => {
      clearInterval(animInterval);
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-900 transition-opacity duration-[600ms] ease-in-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={fadeOut}
    >
      <div className="w-80 md:w-96 max-w-[80vw] h-auto flex flex-col items-center justify-center">
        {/* Animated YFS Logo in Gold (re-mounted on key change to trigger loop) */}
        <YfsLogo key={key} className="w-full h-auto text-brand-primary" loop={false} showText={true} />
        

      </div>
    </div>
  );
};

export default Preloader;
