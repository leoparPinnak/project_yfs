import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';



interface Slide {
  id: number;
  image: string;
  title?: string;
}

import { TextStrip } from './TextStrip';

const slides: Slide[] = [
  {
    id: 1,
    image: '/mimarisanatt/post_3/image_1.jpg',

  },
  {
    id: 2,
    image: '/mimarisanatt/post_4/image_1.jpg',

  },
  {
    id: 3,
    image: '/mimarisanatt/post_5/image_1.jpg',

  },
  {
    id: 4,
    image: '/mimarisanatt/post_6/image_1.jpg',


  },
  {
    id: 5,
    image: '/mimarisanatt/post_6/image_2.jpg',


  },
  {
    id: 6,
    image: '/mimarisanatt/post_1/image_1.jpg',


  },
  {
    id: 7,
    image: '/mimarisanatt/post_2/image_1.jpg',


  },
  {
    id: 8,
    image: '/mimarisanatt/post_3/image_1.jpg',


  },
  {
    id: 9,
    image: '/mimarisanatt/post_4/image_1.jpg',


  },
  {
    id: 10,
    image: '/mimarisanatt/post_5/image_1.jpg',


  },
  {
    id: 11,
    image: '/mimarisanatt/post_6/image_1.jpg',


  },
  {
    id: 12,
    image: '/mimarisanatt/post_6/image_2.jpg',


  },
  {
    id: 13,
    image: '/mimarisanatt/post_1/image_1.jpg',


  },
  {
    id: 14,
    image: '/mimarisanatt/post_2/image_1.jpg',


  },
  {
    id: 15,
    image: '/mimarisanatt/post_3/image_1.jpg',


  },
  {
    id: 16,
    image: '/mimarisanatt/post_4/image_1.jpg',


  },
  {
    id: 17,
    image: '/mimarisanatt/post_5/image_1.jpg',

  },
  {
    id: 18,
    image: '/mimarisanatt/post_6/image_1.jpg',

  }

];

const SLIDE_DURATION = 5000; // 5 seconds

export const RenderSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Auto-advance effect
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Progress tracking effect
  useEffect(() => {
    if (isPaused) return;

    setProgress(0);
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / SLIDE_DURATION) * 100;

      if (newProgress >= 100) {
        setProgress(100);
        clearInterval(progressInterval);
      } else {
        setProgress(newProgress);
      }
    }, 16); // ~60fps

    return () => clearInterval(progressInterval);
  }, [currentIndex, isPaused]);

  return (
    <div className="relative h-full w-full bg-slate-900 overflow-hidden rounded-[40px]">
      <style>{`
        @keyframes expandCenter {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      {/* Text Overlay */}
      <TextStrip />



      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out overflow-hidden ${index === currentIndex ? 'opacity-100 blur-0 z-10' : 'opacity-0 blur-xl z-0'
            }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-105"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 "></div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-between px-4">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Controls (Title & Dots) */}
      <div className="absolute bottom-0 left-0 w-full z-20 pb-6 md:pb-8 lg:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-3 md:gap-4 lg:gap-6">

          {/* Slide Title */}
          <h3 className="text-white text-lg sm:text-xl md:text-3xl lg:text-4xl font-serif tracking-wider opacity-90 text-center px-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {slides[currentIndex].title}
          </h3>

          {/* Counter and Pause Button */}
          <div className="flex items-center gap-4">
            {/* Slide Counter */}
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 px-3 py-1.5 rounded-full">
              <span className="text-white text-sm font-medium">
                {currentIndex + 1} / {slides.length}
              </span>
            </div>

            {/* Pause/Play Button */}
            <button
              onClick={togglePause}
              className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all duration-300"
              aria-label={isPaused ? "Play" : "Pause"}
            >
              {isPaused ? (
                <Play className="w-4 h-4" fill="white" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex space-x-2 md:space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full h-2 ${idx === currentIndex
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50 hover:bg-white/80'
                  }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-md bg-white/20 rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-white transition-all ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};