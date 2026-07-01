import React from 'react';

const partners = [
    { name: 'Swissôtel', logo: 'https://www.swissotelcesme.com/wp-content/themes/swissotel-template/images/logo/swissotel.svg' },
    { name: 'Turkcell', logo: 'https://cdn.worldvectorlogo.com/logos/turkcell-1.svg' },
    { name: 'SunExpress', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuBnnTFlcC_BONNkbjCtJRjkV3NKWWNta_yw&s' },
    { name: 'Ekmas', logo: 'https://imaj.emlakjet.com/cms/resize/400/400/companies/881/obs93svexqiodnhokrnw.png' },
    { name: 'BLT', logo: 'https://cdn.prod.website-files.com/66031341b87c2eb45d8f9422/66033f6eba669eca199b2618_blt.svg' },
    { name: 'Bözart', logo: '/logos/bozart.jpg' },
    { name: 'Yaşar Üniversitesi', logo: '/logos/yasar_uni.png' },
    { name: 'Seba İnşaat', logo: '/logos/seba_insaat.png' },
    { name: 'Miray İnşaat', logo: '/logos/miray_insaat.jpg' },
];

// Sonsuz kayma efekti için logoları iki kez ekliyoruz
const extendedPartners = [...partners, ...partners];

const Partners: React.FC = () => {
    return (
        <section className="py-8 bg-gray-50 border-b border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                    GÜÇLÜ REFERANSLARIMIZ
                </p>

                {/* Logo Slider */}
                <div className="logo-slider">
                    <div className="logo-track flex">
                        {extendedPartners.map((partner, index) => (
                            <div
                                key={`${partner.name}-${index}`}
                                className="logo-slide flex-shrink-0 flex items-center justify-center px-6 md:px-8 lg:px-10"
                                title={partner.name}
                            >
                                <img
                                    src={partner.logo}
                                    alt={`${partner.name} Logosu`}
                                    className="h-16 sm:h-20 md:h-24 w-auto object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;