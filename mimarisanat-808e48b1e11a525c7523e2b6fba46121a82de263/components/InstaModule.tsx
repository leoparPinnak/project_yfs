import React, { useState, useEffect } from 'react';
import { PostLightbox } from './PostLightbox';
import { Eye } from 'lucide-react';

interface PostData {
    id: number;
    folder: string;
    media: string[];
    visible: boolean;
}

export const InstaModule: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

    useEffect(() => {
        // Check localStorage for admin overrides first
        const stored = localStorage.getItem('mimari_sanat_posts');
        if (stored) {
            setPosts(JSON.parse(stored).filter((p: PostData) => p.visible));
        } else {
            fetch('/posts.json')
                .then(res => res.json())
                .then((data: PostData[]) => setPosts(data.filter(p => p.visible)))
                .catch(err => console.error('posts.json yüklenemedi:', err));
        }
    }, []);

    const handleImageLoad = (id: number) => {
        setLoadedImages(prev => new Set(prev).add(id));
    };

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 sm:gap-1.5">
                {posts.map((post) => {
                    const thumbSrc = `/insta_post/${post.folder}/${post.media[0]}`;
                    return (
                        <div
                            key={post.id}
                            className="relative aspect-square overflow-hidden cursor-pointer group bg-stone-200 dark:bg-stone-800"
                            onClick={() => setSelectedPost(post)}
                        >
                            <img
                                src={thumbSrc}
                                alt={`Post ${post.id}`}
                                loading="lazy"
                                onLoad={() => handleImageLoad(post.id)}
                                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${loadedImages.has(post.id) ? 'opacity-100' : 'opacity-0'
                                    }`}
                                style={{ transition: 'opacity 0.4s ease, transform 0.5s ease' }}
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                                    <Eye className="text-white" size={24} />
                                    {post.media.length > 1 && (
                                        <span className="text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                            {post.media.length}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {/* Multi-image indicator */}
                            {post.media.length > 1 && (
                                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="2" y="2" width="13" height="13" rx="2" />
                                        <rect x="9" y="9" width="13" height="13" rx="2" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {selectedPost && (
                <PostLightbox
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            )}
        </>
    );
};
