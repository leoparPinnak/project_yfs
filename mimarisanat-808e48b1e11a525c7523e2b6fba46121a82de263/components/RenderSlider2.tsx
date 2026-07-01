import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../context/SiteContentContext';

const SLIDE_DURATION = 3500; // 3.5 seconds

export const RenderSlider2: React.FC = () => {
    const { content } = useSiteContent();
    const slides = content?.introSlider || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance effect
    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);

        return () => clearInterval(interval);
    }, [slides.length]);

    if (slides.length === 0) {
        return (
            <div className="relative w-full h-full overflow-hidden rounded-[40px] shadow-2xl bg-stone-200 dark:bg-stone-800 animate-pulse"></div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden rounded-[40px] shadow-2xl">
            {/* Slides */}
            {slides.map((image, index) => (
                <div
                    key={`${image}-${index}`}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-linear"
                        style={{
                            backgroundImage: `url(${image})`,
                            transform: index === currentIndex ? 'scale(1.1)' : 'scale(1.0)'
                        }}
                    ></div>
                    {/* Subtle Overlay to ensure text visibility if user resizes */}
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>
            ))}
        </div>
    );
};
