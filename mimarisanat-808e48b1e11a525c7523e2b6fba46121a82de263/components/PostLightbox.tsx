import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PostData {
    id: number;
    folder: string;
    media: string[];
    visible: boolean;
}

interface PostLightboxProps {
    post: PostData;
    onClose: () => void;
}

export const PostLightbox: React.FC<PostLightboxProps> = ({ post, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalMedia = post.media.length;

    const goNext = useCallback(() => {
        setCurrentIndex(prev => (prev + 1) % totalMedia);
    }, [totalMedia]);

    const goPrev = useCallback(() => {
        setCurrentIndex(prev => (prev - 1 + totalMedia) % totalMedia);
    }, [totalMedia]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose, goNext, goPrev]);

    const currentFile = post.media[currentIndex];
    const mediaSrc = `/insta_post/${post.folder}/${currentFile}`;
    const isVideo = /\.(mp4|webm)$/i.test(currentFile);

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            >
                <X size={24} />
            </button>

            {/* Media Container */}
            <div
                className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                onClick={e => e.stopPropagation()}
            >
                {isVideo ? (
                    <video
                        key={mediaSrc}
                        src={mediaSrc}
                        controls
                        autoPlay
                        className="max-w-full max-h-[85vh] rounded-lg object-contain"
                    />
                ) : (
                    <img
                        key={mediaSrc}
                        src={mediaSrc}
                        alt={`Post ${post.id} - ${currentIndex + 1}`}
                        className="max-w-full max-h-[85vh] rounded-lg object-contain select-none"
                        draggable={false}
                    />
                )}

                {/* Navigation Arrows */}
                {totalMedia > 1 && (
                    <>
                        <button
                            onClick={(e) => { e.stopPropagation(); goPrev(); }}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); goNext(); }}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}

                {/* Dots Indicator */}
                {totalMedia > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {post.media.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                                        ? 'bg-white w-4'
                                        : 'bg-white/40 hover:bg-white/60'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Counter */}
            {totalMedia > 1 && (
                <div className="absolute bottom-4 right-4 text-white/60 text-sm">
                    {currentIndex + 1} / {totalMedia}
                </div>
            )}
        </div>
    );
};
