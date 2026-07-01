import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface SiteContent {
    hero: {
        darkImage: string;
        lightImage: string;
        featuredImage: string;
        subtitle: string;
        title: string;
        titleItalic: string;
    };
    intro: {
        badge: string;
        title: string;
        titleItalic: string;
        description: string;
        features: { title: string; desc: string }[];
        detailsButton: string;
        blockCount: string;
        blockLabel: string;
        visualizationTitle: string;
        visualizationTitleItalic: string;
        visualizationDesc: string;
    };
    introSlider: string[];
    projects: {
        id: number;
        title: string;
        description: string;
        category: string;
        status: string;
        year: string;
        location: string;
        image: string;
    }[];
    features: {
        badge: string;
        title: string;
        items: { title: string; desc: string }[];
    };
    contact: {
        phone: string;
        email: string;
        address: string;
        mapLat: number;
        mapLng: number;
        instagramUrl: string;
        facebookUrl: string;
        linkedinUrl: string;
    };
    projectDetails: {
        title: string;
        description: string;
        technicalSpecs: string;
        techDescription: string;
        specs: string[];
        amenities: { title: string; desc: string }[];
        info: {
            landArea: string;
            blockCount: string;
            designLanguage: string;
            materialQuality: string;
            deliveryDate: string;
        };
    };
    footer: {
        description: string;
    };
    nokiaLumia: {
        loopInterval: number;
        animDuration: number;
        maxTiles: number;
        minTiles: number;
        zoomChance: number;
        zoomDuration: number;
        zoomScale: number;
        testMode?: boolean;
        tileImages: {
            [id: string]: string[];
        };
    };
    location: {
        title: string;
        description: string;
    };
    mediaLibrary?: {
        path: string;
        name: string;
        folder: string;
        type: string;
        size: number;
    }[];
}

interface SiteContentContextType {
    content: SiteContent | null;
    loading: boolean;
    updateSection: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
    updateNestedField: (path: string, value: any) => void;
    saveAll: () => Promise<boolean>;
    hasUnsavedChanges: boolean;
}

const SiteContentContext = createContext<SiteContentContextType>({
    content: null,
    loading: true,
    updateSection: () => { },
    updateNestedField: () => { },
    saveAll: async () => false,
    hasUnsavedChanges: false,
});

export const useSiteContent = () => useContext(SiteContentContext);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<SiteContent | null>(null);
    const [loading, setLoading] = useState(true);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                // Try localStorage first (for admin preview)
                const cached = localStorage.getItem('mimari_sanat_site_content');
                if (cached) {
                    setContent(JSON.parse(cached));
                    setLoading(false);
                }

                // Then fetch the latest from server
                const res = await fetch('/api/site-content?t=' + Date.now());
                if (res.ok) {
                    let data = await res.json();

                    // Force sanitization of nokiaLumia.tileImages (ensure object, not array)
                    if (data.nokiaLumia && Array.isArray(data.nokiaLumia.tileImages)) {
                        const newImages: { [id: string]: string[] } = {};
                        data.nokiaLumia.tileImages.forEach((val: any, idx: number) => {
                            if (val) newImages[idx.toString()] = val;
                        });
                        data.nokiaLumia.tileImages = newImages;
                    }

                    setContent(data);
                    localStorage.setItem('mimari_sanat_site_content', JSON.stringify(data));
                }
            } catch (err) {
                console.error('Site içeriği yüklenemedi:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const updateSection = useCallback(<K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
        setContent(prev => {
            if (!prev) return prev;
            const updated = { ...prev, [key]: value };
            localStorage.setItem('mimari_sanat_site_content', JSON.stringify(updated));
            setHasUnsavedChanges(true);
            return updated;
        });
    }, []);

    const updateNestedField = useCallback((path: string, value: any) => {
        setContent(prev => {
            if (!prev) return prev;

            // Deep clone to avoid mutations
            const updated = JSON.parse(JSON.stringify(prev));
            const keys = path.split('.');
            let obj: any = updated;

            // Traverse path and create missing objects
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (obj[key] === undefined || obj[key] === null) {
                    obj[key] = {};
                }

                // CRITICAL FIX: If we are at the penultimate key (tileImages) and it's an array, convert it to object
                if (key === 'tileImages' && Array.isArray(obj[key])) {
                    const asObj: any = {};
                    obj[key].forEach((v: any, idx: number) => { if (v) asObj[idx] = v; });
                    obj[key] = asObj;
                } else if (typeof obj[key] !== 'object' && obj[key] !== null) {
                    // Fallback for any other corrupted path
                    obj[key] = {};
                }

                obj = obj[key];
            }

            const lastKey = keys[keys.length - 1];

            // Check if value actually changed to prevent unnecessary re-renders
            if (JSON.stringify(obj[lastKey]) === JSON.stringify(value)) return prev;

            obj[lastKey] = value;
            localStorage.setItem('mimari_sanat_site_content', JSON.stringify(updated));
            setHasUnsavedChanges(true);
            return updated;
        });
    }, []);

    const saveAll = useCallback(async (): Promise<boolean> => {
        if (!content) return false;
        try {
            const res = await fetch('/api/site-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content, null, 2),
            });
            if (res.ok) {
                setHasUnsavedChanges(false);
                return true;
            }
            return false;
        } catch (err) {
            console.error('Kayıt başarısız:', err);
            return false;
        }
    }, [content]);

    return (
        <SiteContentContext.Provider value={{ content, loading, updateSection, updateNestedField, saveAll, hasUnsavedChanges }}>
            {children}
        </SiteContentContext.Provider>
    );
};
