import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useSiteContent } from '../context/SiteContentContext';
import { Reveal } from './Reveal';

export const LocationSection: React.FC = () => {
    const { t } = useTranslation();
    const { content } = useSiteContent();
    const loc = content?.location;
    const contact = content?.contact;

    const mapLat = contact?.mapLat ?? 38.632642;
    const mapLng = contact?.mapLng ?? 27.388388;

    return (
        <section className="py-16 md:py-20 lg:py-24 bg-slate-50 dark:bg-stone-800 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-800 dark:text-white mb-4">
                            {loc?.title || t.location.title}
                        </h2>
                        <p className="text-gray-600 dark:text-stone-300 max-w-2xl mx-auto font-light">
                            {loc?.description || t.location.description}
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={200}>
                    <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-stone-700">
                        <iframe
                            src={`https://maps.google.com/maps?q=${mapLat},${mapLng}&hl=tr&z=15&output=embed`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={t.location.mapTitle}
                            className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
