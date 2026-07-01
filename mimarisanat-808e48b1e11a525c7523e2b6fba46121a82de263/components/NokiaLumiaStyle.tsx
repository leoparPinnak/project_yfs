import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useSiteContent } from '../context/SiteContentContext';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

type AnimType = 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';

export interface LumiaTileData {
    id: string;
    title: string;
    className?: string;
    images: string[];
    box?: {
        x: [number, number]; // [start, end]
        y: [number, number]; // [start, end]
    };
}

export interface NokiaLumiaStyleProps {
    title?: string;
    subtitle?: string;
    tilesData?: LumiaTileData[];
    layoutType?: 'vertical' | 'horizontal' | 'square';
    testMode?: boolean; // Geçiçi test modu için eklendi
}

interface TileLayer {
    id: string;
    image: string;
    isZooming: boolean;
    isNew: boolean;
    animType?: AnimType;
}

interface TileState {
    id: string; // Updated to match LumiaTileData id type
    layers: TileLayer[];
}

export const NokiaLumiaStyle: React.FC<NokiaLumiaStyleProps> = ({
    title,
    subtitle,
    tilesData = [],
    layoutType = 'vertical',
    testMode = false
}) => {
    const { content } = useSiteContent();
    const [selectedTile, setSelectedTile] = useState<LumiaTileData | null>(null);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const settings = useMemo(() => content?.nokiaLumia || {
        loopInterval: 4000,
        animDuration: 2000,
        zoomDuration: 8000,
        minTiles: 3,
        maxTiles: 6,
        zoomChance: 50,
        zoomScale: 1.15
    }, [content]);

    // We no longer filter out empty tiles, as the user wants to see placeholders
    const validTilesData = useMemo(() => tilesData, [tilesData]);

    const initialTiles: TileState[] = useMemo(() => {
        return validTilesData.map((data) => ({
            id: data.id,
            layers: data.images?.length > 0 ? [{
                id: `init-${data.id}-${Math.random().toString(36).substring(7)}`,
                image: data.images[0],
                isZooming: false,
                isNew: false
            }] : []
        }));
    }, [validTilesData]);

    const [tiles, setTiles] = useState<TileState[]>(initialTiles);
    const tileRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    useEffect(() => {
        setTiles(initialTiles);
    }, [initialTiles]);


    // Animasyon tetikleme fonksiyonu — hem ilk yüklemede hem de interval'de kullanılır
    const triggerAnimation = useCallback(() => {
        setTiles(prevTiles => {
            const newTiles = [...prevTiles];

            const animatingCount = newTiles.filter(t => t.layers.length > 1).length;
            if (animatingCount >= settings.maxTiles) {
                return prevTiles;
            }

            const availableTileIndices = newTiles
                .map((t, index) => ({ t, index }))
                // Sadece görseli olan ve animasyonda olmayan kutucukları animasyon havuzuna dahil et
                .filter(({ t }) => t.layers.length === 1)
                .map(({ index }) => index);

            if (availableTileIndices.length === 0) return prevTiles;

            const animCountThisCycle = Math.floor(Math.random() * (settings.maxTiles - settings.minTiles + 1)) + settings.minTiles;
            const tilesToAnimateIndices: number[] = [];

            const availableCopy = [...availableTileIndices];
            for (let i = 0; i < animCountThisCycle && availableCopy.length > 0; i++) {
                const randIdx = Math.floor(Math.random() * availableCopy.length);
                tilesToAnimateIndices.push(availableCopy.splice(randIdx, 1)[0]);
            }

            tilesToAnimateIndices.forEach(index => {
                const tile = newTiles[index];
                const data = validTilesData.find(d => d.id === tile.id);
                if (!data || !data.images?.length) return;

                const currentImage = tile.layers[0]?.image;

                let newImage = data.images[Math.floor(Math.random() * data.images.length)];
                let attempts = 0;
                while (currentImage && newImage === currentImage && data.images.length > 1 && attempts < 5) {
                    newImage = data.images[Math.floor(Math.random() * data.images.length)];
                    attempts++;
                }

                const animTypes: AnimType[] = ['slide-up', 'slide-down', 'slide-left', 'slide-right'];
                const randomAnim = animTypes[Math.floor(Math.random() * animTypes.length)];
                const shouldZoom = Math.random() * 100 < settings.zoomChance;

                newTiles[index] = {
                    ...tile,
                    layers: [
                        ...tile.layers,
                        {
                            id: `layer-${tile.id}-${Math.random().toString(36).substring(7)}`,
                            image: newImage,
                            animType: randomAnim,
                            isZooming: shouldZoom,
                            isNew: true
                        }
                    ]
                };
            });

            return newTiles;
        });
    }, [validTilesData, settings]);

    // İlk yüklemede kısa bir gecikmeyle animasyonu hemen başlat
    useEffect(() => {
        if (validTilesData.length === 0) return;
        const initialTimeout = setTimeout(triggerAnimation, 500);
        return () => clearTimeout(initialTimeout);
    }, [validTilesData, triggerAnimation]);

    // Sonraki döngüler için interval
    useEffect(() => {
        if (validTilesData.length === 0) return;
        const intervalId = setInterval(triggerAnimation, settings.loopInterval);
        return () => clearInterval(intervalId);
    }, [validTilesData, settings, triggerAnimation]);


    useEffect(() => {
        if (selectedTile) {
            // Calculate scrollbar width
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

            // Apply lock and padding to body
            document.body.style.overflow = 'hidden';
            if (scrollbarWidth > 0) {
                document.body.style.paddingRight = `${scrollbarWidth}px`;

                // ALSO apply to fixed header to prevent it from shifting
                const fixedNavs = document.querySelectorAll('nav.fixed');
                fixedNavs.forEach(nav => {
                    (nav as HTMLElement).style.paddingRight = `${scrollbarWidth}px`;
                });
            }

            // Start the transition after a tiny delay
            const timer = setTimeout(() => setIsMounted(true), 50);
            return () => {
                clearTimeout(timer);
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';

                // Reset fixed navs
                const fixedNavs = document.querySelectorAll('nav.fixed');
                fixedNavs.forEach(nav => {
                    (nav as HTMLElement).style.paddingRight = '';
                });

                setIsMounted(false);
            };
        }
    }, [selectedTile]);


    useEffect(() => {
        const timeoutIds: { [key: string]: ReturnType<typeof setTimeout> } = {};

        tiles.forEach((tile) => {
            if (tile.layers.length > 1) {
                // Her kutucuk için kendi animasyon süresi sonunda durumu sıfırla
                const id = setTimeout(() => {
                    setTiles(currentTiles => {
                        return currentTiles.map(t => {
                            if (t.id === tile.id && t.layers.length > 1) {
                                const topLayer = t.layers[t.layers.length - 1];
                                return {
                                    ...t,
                                    layers: [{ ...topLayer, isNew: false }]
                                };
                            }
                            return t;
                        });
                    });
                }, settings.animDuration);
                timeoutIds[tile.id] = id;
            }
        });

        return () => {
            Object.values(timeoutIds).forEach(clearTimeout);
        };
    }, [tiles, settings.animDuration]);

    if (validTilesData.length === 0) return null;

    const getGridClasses = () => {
        if (layoutType === 'vertical') return 'grid-cols-2 auto-rows-fr';
        if (layoutType === 'horizontal') return 'grid-cols-2 md:grid-cols-4 xl:grid-cols-6 auto-rows-fr';
        if (layoutType === 'square') return 'grid-cols-2 md:grid-cols-3 xl:grid-cols-5 auto-rows-fr';
        return 'grid-cols-2 lg:grid-cols-4 auto-rows-fr';
    };

    return (
        <div className="w-full h-full flex flex-col relative z-10 bg-white dark:bg-stone-900 overflow-hidden">
            {/* Olay katmanı efekti için hafif bir noise veya texture eklenebilir (opsiyonel) */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none z-0"></div>

            {(title || subtitle) && (
                <div className="p-4 md:p-6 lg:p-8 bg-brand-primary/5 dark:bg-brand-primary/10 border-b border-gray-100 dark:border-stone-800 z-10 flex-shrink-0">
                    <div className="flex flex-col">
                        {title && <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-800 dark:text-white mb-2">{title}</h3>}
                        {subtitle && <p className="text-sm text-stone-500 dark:text-stone-400 font-light">{subtitle}</p>}
                    </div>
                </div>
            )}

            <div className={`p-2 md:p-3 xl:p-3 flex-1 grid gap-3 md:gap-4 xl:gap-4 ${getGridClasses()} relative z-10 min-h-0`}>
                {validTilesData.map((data) => {
                    const tileState = tiles.find(t => t.id === data.id);
                    if (!tileState) return null;
                    const hasImages = tileState.layers.length > 0;
                    const safeSettings = settings || { animDuration: 2000, zoomDuration: 8000 };

                    // Eğer kullanıcı koordinat girdiyse mutlak pozisyonlama yap (20x20 SCALE)
                    const isMosaic = !!data.box;
                    const xMulti = 5; // 100% / 20 = 5
                    const yMulti = 5; // 100% / 20 = 5

                    const dynamicStyle: React.CSSProperties = isMosaic ? {
                        position: 'absolute',
                        left: `${data.box!.x[0] * xMulti}%`,
                        bottom: `${data.box!.y[0] * yMulti}%`,
                        width: `${(data.box!.x[1] - data.box!.x[0]) * xMulti}%`,
                        height: `${(data.box!.y[1] - data.box!.y[0]) * yMulti}%`,
                        zIndex: 20, // Izgara çizgilerinin altında kalmasın
                    } : {};

                    return (
                        <div
                            key={`tile-${data.id}`}
                            ref={el => tileRefs.current[`tile-${data.id}`] = el}
                            style={dynamicStyle}
                            className={`${isMosaic ? 'p-1 md:p-1.5 xl:p-2' : ''} ${!isMosaic && data.className ? data.className : ''} transition-all duration-500`}
                            onClick={() => data.images?.length > 0 && setSelectedTile(data)}
                        >
                            <div className={`w-full h-full relative overflow-hidden rounded-none shadow-sm border border-stone-100 dark:border-stone-800 bg-stone-100 dark:bg-stone-800 group transition-all duration-500 ${data.images?.length > 0 ? 'cursor-pointer hover:scale-[1.03] hover:shadow-2xl hover:brightness-[1.05] hover:z-30' : ''}`}>
                                {/* Tıklanabilirlik İpucu */}
                                {data.images?.length > 0 && (
                                    <div className="absolute top-3 right-3 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-black/40 backdrop-blur-md p-1.5 rounded-full text-white/80">
                                            <Maximize2 size={14} />
                                        </div>
                                    </div>
                                )}
                                {hasImages ? (
                                    <>
                                        {tileState.layers.map((layer, idx) => (
                                            <div
                                                key={layer.id}
                                                className="absolute inset-0 w-full h-full z-10 overflow-hidden"
                                                style={{
                                                    zIndex: idx * 10 + 10,
                                                    animation: layer.isNew ? `${layer.animType}-in ${safeSettings.animDuration}ms cubic-bezier(0.25, 1, 0.5, 1) forwards` : 'none'
                                                }}
                                            >
                                                <img
                                                    src={layer.image}
                                                    alt={data.title}
                                                    className="w-full h-full object-cover object-center"
                                                    style={{
                                                        animationName: layer.isZooming ? 'zoom-in-logic' : 'none',
                                                        animationDuration: `${safeSettings.zoomDuration}ms`,
                                                        animationTimingFunction: 'ease-in-out',
                                                        animationIterationCount: 'infinite',
                                                        animationDirection: 'alternate',
                                                        animationFillMode: 'both',
                                                        transform: !layer.isZooming ? 'scale(1)' : undefined
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-stone-50 dark:bg-stone-800/50">
                                        <div className="w-12 h-12 mb-3 rounded-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400">
                                                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">Eksik Görsel</span>
                                        <span className="text-[11px] text-stone-500 font-medium">{data.title}</span>
                                    </div>
                                )}

                                {/* Info Overlay (Sürekli Görünür veya Hover ile Görünür) */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-5 opacity-90 transition-opacity duration-300 z-30 pointer-events-none">
                                    <h4 className="text-white font-bold text-sm md:text-base tracking-wide drop-shadow-md z-10">{data.title}</h4>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* --- TEST MODU IZGARASI --- */}
                {testMode && (
                    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden border-2 border-amber-500/50">
                        {/* Orijin (Sol Alt, X=0, Y=0) ve Oklar */}
                        {/* Y Ekseni Oku (Yukarı Doğru) */}
                        <div className="absolute left-1 bottom-1 w-0.5 bg-amber-500 h-[95%] z-50">
                            {/* Ok Ucu */}
                            <div className="absolute -top-2 -translate-x-[40%] w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-transparent border-b-amber-500"></div>
                            <span className="absolute -top-6 -translate-x-[40%] text-amber-500 font-bold text-sm bg-black/50 px-1 rounded-full">Y</span>
                        </div>

                        {/* X Ekseni Oku (Sağa Doğru) */}
                        <div className="absolute left-1 bottom-1 h-0.5 bg-amber-500 w-[95%] z-50">
                            {/* Ok Ucu */}
                            <div className="absolute -right-2 -translate-y-[40%] w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent border-l-amber-500"></div>
                            <span className="absolute -right-6 -translate-y-[40%] text-amber-500 font-bold text-sm bg-black/50 px-1 rounded-full">X</span>
                        </div>

                        {/* Y Ekseni Rakamları (İçeride, Sol Kenar, YUKARI DOĞRU ARTAR, 20 BIRIM SCALE) */}
                        {Array.from({ length: 21 }).map((_, i) => (
                            <div key={`y-${i}`} className="absolute left-3 text-[10px] md:text-sm font-bold font-mono text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] translate-y-1/2 z-40" style={{ bottom: `${i * 5}%` }}>
                                <span className="bg-black/80 px-1.5 rounded">{i}</span>
                            </div>
                        ))}

                        {/* X Ekseni Rakamları (İçeride, Alt Kenar, SAĞA DOĞRU ARTAR, 20 BIRIM SCALE) */}
                        {Array.from({ length: 21 }).map((_, i) => (
                            <div key={`x-${i}`} className={`absolute bottom-3 text-[10px] md:text-sm font-bold font-mono text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] ${i === 0 ? '-translate-x-1/2 translate-y-full left-4' : '-translate-x-1/2'} z-40`} style={{ left: `${i * 5}%` }}>
                                <span className="bg-black/80 px-1.5 rounded">{i}</span>
                            </div>
                        ))}

                        {/* Izgara Çizgileri */}
                        <div className="w-full h-full relative">
                            {/* Dikey Çizgiler (Her 1 birimde bir %5'e denk gelir) */}
                            {Array.from({ length: 19 }).map((_, i) => (
                                <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-amber-500/30 border-dashed" style={{ left: `${(i + 1) * 5}%` }}></div>
                            ))}
                            {/* Yatay Çizgiler */}
                            {Array.from({ length: 19 }).map((_, i) => (
                                <div key={`h-${i}`} className="absolute left-0 right-0 border-b border-amber-500/30 border-dashed" style={{ bottom: `${(i + 1) * 5}%` }}></div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Premium Önizleme Katmanı (Ultra Smooth & Maximum Z-Index via Portal) */}
            {selectedTile && typeof document !== 'undefined' && createPortal(
                <div
                    className={`fixed inset-0 z-[999999] bg-black/98 backdrop-blur-3xl flex items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => { setSelectedTile(null); setPreviewIndex(0); }}
                >
                    {/* Kapatme Butonu */}
                    <button
                        onClick={() => { setSelectedTile(null); setPreviewIndex(0); }}
                        className={`absolute top-8 right-8 text-white/40 hover:text-white transition-all p-2 z-[1000000] bg-white/5 hover:bg-white/10 rounded-full transition-all duration-700 delay-500 ${isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                    >
                        <X size={32} strokeWidth={1.5} />
                    </button>

                    {/* İçerik Konteynerı */}
                    <div
                        className={`relative max-w-[90vw] max-h-[85vh] flex items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${isMounted ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-[0.7] blur-sm'}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <img
                            src={selectedTile.images[previewIndex]}
                            alt={selectedTile.title}
                            className="max-w-full max-h-[85vh] object-contain shadow-[0_0_100px_rgba(0,0,0,0.5)] select-none"
                            draggable={false}
                        />

                        {/* Numaratör (Zarif Sağ Alt Tasarım) */}
                        {selectedTile.images.length > 1 && (
                            <div className={`absolute -bottom-10 right-0 flex items-center gap-3 transition-all duration-700 delay-300 ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                                <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">Koleksiyon</span>
                                <div className="h-[1px] w-8 bg-white/10"></div>
                                <span className="text-white/80 text-sm font-mono tracking-tighter">
                                    {previewIndex + 1} <span className="text-white/20 mx-0.5">/</span> {selectedTile.images.length}
                                </span>
                            </div>
                        )}

                        {/* Navigasyon Okları (İnce ve Şeffaf) */}
                        {selectedTile.images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPreviewIndex(prev => (prev - 1 + selectedTile.images.length) % selectedTile.images.length);
                                    }}
                                    className={`absolute -left-12 md:-left-24 top-1/2 -translate-y-1/2 text-white/5 hover:text-white/40 transition-all p-6 active:scale-95 transition-opacity duration-500 delay-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <ChevronLeft size={80} strokeWidth={0.5} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPreviewIndex(prev => (prev + 1) % selectedTile.images.length);
                                    }}
                                    className={`absolute -right-12 md:-right-24 top-1/2 -translate-y-1/2 text-white/5 hover:text-white/40 transition-all p-6 active:scale-95 transition-opacity duration-500 delay-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <ChevronRight size={80} strokeWidth={0.5} />
                                </button>
                            </>
                        )}
                    </div>
                </div>,
                document.body
            )}

            <style>{`
                @keyframes slide-up-in { from { transform: translateY(100%); } to { transform: translateY(0); } }
                @keyframes slide-down-in { from { transform: translateY(-100%); } to { transform: translateY(0); } }
                @keyframes slide-left-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
                @keyframes slide-right-in { from { transform: translateX(-100%); } to { transform: translateX(0); } }
                @keyframes zoom-in-logic { from { transform: scale(1); } to { transform: scale(${settings.zoomScale}); } }
            `}</style>
        </div >
    );
};

// --- YARDIMCI FOKSİYONLAR ---

function getExitTransform(animType: AnimType): string {
    switch (animType) {
        case 'slide-up': return '-translate-y-full opacity-0';
        case 'slide-down': return 'translate-y-full opacity-0';
        case 'slide-left': return '-translate-x-full opacity-0';
        case 'slide-right': return 'translate-x-full opacity-0';
        default: return 'translate-y-0 opacity-0';
    }
}

function getEnterTransform(animType: AnimType): string {
    switch (animType) {
        // Başlangıç pozisyonları (Animating in için hazır bekleme)
        case 'slide-up': return 'translate-y-full';
        case 'slide-down': return '-translate-y-full';
        case 'slide-left': return 'translate-x-full';
        case 'slide-right': return '-translate-x-full';
        default: return 'translate-y-full';
    }
}
