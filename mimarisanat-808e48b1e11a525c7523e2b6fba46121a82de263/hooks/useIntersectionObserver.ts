import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const observer = new IntersectionObserver(([entry]) => {
            // Clear any pending timeout
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            if (entry.isIntersecting) {
                // Add 0.25s delay before triggering animation
                timeoutId = setTimeout(() => {
                    setIsVisible(true);
                }, 250);
            } else {
                // Reset when element leaves viewport (for looping effect)
                setIsVisible(false);
            }
        }, { threshold: 0.1, ...options });

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [options]);

    return { elementRef, isVisible };
};
