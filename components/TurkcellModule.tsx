import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

type AnimType = 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';

interface CityData {
  id: string;
  city: string;
  slug: string;
  districts: string[];
  images: string[];
}

interface TileLayer {
  id: string;
  image: string;
  isNew: boolean;
  animType?: AnimType;
}

const turkcellCities: CityData[] = [
  {
    id: 'izmir',
    city: 'İZMİR',
    slug: 'turkcell-izmir',
    districts: ['Bornova', 'Karşıyaka', 'Konak', 'Buca', 'Çiğli', 'Bayraklı'],
    images: ['/turkcell/1.jpeg', '/turkcell/2.jpeg', '/turkcell/3.jpeg', '/turkcell_ekip/1.jpg'],
  },
  {
    id: 'aydin',
    city: 'AYDIN',
    slug: 'turkcell-aydin',
    districts: ['Kuşadası', 'Söke', 'Nazilli', 'Efeler', 'Didim'],
    images: ['/turkcell/4.jpeg', '/turkcell/5.jpeg', '/turkcell/6.jpeg', '/turkcell_ekip/3.jpg'],
  },
  {
    id: 'manisa',
    city: 'MANİSA',
    slug: 'turkcell-manisa',
    districts: ['Akhisar', 'Turgutlu', 'Salihli', 'Soma', 'Şehzadeler'],
    images: ['/turkcell/7.jpeg', '/turkcell/8.jpeg', '/turkcell/9.jpeg', '/turkcell_ekip/4.jpg'],
  },
  {
    id: 'denizli',
    city: 'DENİZLİ',
    slug: 'turkcell-denizli',
    districts: ['Pamukkale', 'Merkezefendi', 'Çivril', 'Sarayköy', 'Tavas'],
    images: ['/turkcell/11.jpeg', '/turkcell/10.jpeg', '/turkcell_ekip/5.jpg'],
  },
  {
    id: 'balikesir',
    city: 'BALIKESİR',
    slug: 'turkcell-balikesir',
    districts: ['Bandırma', 'Edremit', 'Ayvalık', 'Bigadiç', 'Susurluk'],
    images: ['/turkcell/12.jpeg', '/turkcell/13.jpeg'],
  },
  {
    id: 'mugla',
    city: 'MUĞLA',
    slug: 'turkcell-mugla',
    districts: ['Bodrum', 'Marmaris', 'Fethiye', 'Milas', 'Datça'],
    images: ['/turkcell/14.jpeg', '/turkcell/15.jpeg'],
  },
  {
    id: 'burdur',
    city: 'BURDUR',
    slug: 'turkcell-burdur',
    districts: ['Bucak', 'Gölhisar', 'Tefenni', 'Yeşilova', 'Ağlasun'],
    images: ['/turkcell/16.jpeg'],
  },
];

const LOOP_INTERVAL = 4500;
const ANIM_DURATION = 1800;

const TurkcellModule: React.FC = () => {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const { t, language, isRtl } = useLanguage();
  const [tileLayers, setTileLayers] = useState<{ [cityId: string]: TileLayer[] }>(() => {
    const init: { [cityId: string]: TileLayer[] } = {};
    turkcellCities.forEach(c => {
      if (c.images.length > 0) {
        init[c.id] = [{ id: `init-${c.id}`, image: c.images[0], isNew: false }];
      }
    });
    return init;
  });

  const getLocalizedCity = (cityId: string, defaultCity: string) => {
    const cityMap: { [key: string]: { en: string, ar: string } } = {
      izmir: { en: 'IZMIR', ar: 'إزمير' },
      aydin: { en: 'AYDIN', ar: 'أيدين' },
      manisa: { en: 'MANISA', ar: 'مانيسا' },
      denizli: { en: 'DENIZLI', ar: 'دنيزلي' },
      balikesir: { en: 'BALIKESIR', ar: 'باليكسير' },
      mugla: { en: 'MUGLA', ar: 'موغلا' },
      burdur: { en: 'BURDUR', ar: 'بوردر' }
    };
    if (language === 'en') return cityMap[cityId]?.en || defaultCity;
    if (language === 'ar') return cityMap[cityId]?.ar || defaultCity;
    return defaultCity;
  };

  const triggerAnimations = useCallback(() => {
    setTileLayers(prev => {
      const next = { ...prev };
      const animTypes: AnimType[] = ['slide-up', 'slide-down', 'slide-left', 'slide-right'];
      
      const currentlyVisibleImages = new Set<string>();
      (Object.values(prev) as TileLayer[][]).forEach(layers => {
        if (layers && layers.length > 0) {
          currentlyVisibleImages.add(layers[layers.length - 1].image);
        }
      });

      turkcellCities.forEach(city => {
        if (city.images.length <= 1) return;
        const current = next[city.id] || [];
        if (current.length > 1) return;

        const currentImg = current[0]?.image;
        
        const candidates = city.images.filter(img => 
          img !== currentImg && !currentlyVisibleImages.has(img)
        );

        const finalCandidates = candidates.length > 0 
          ? candidates 
          : city.images.filter(img => img !== currentImg);

        if (finalCandidates.length === 0) return;
        const newImg = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];
        const anim = animTypes[Math.floor(Math.random() * animTypes.length)];
        next[city.id] = [...current, {
          id: `layer-${city.id}-${Date.now()}`,
          image: newImg,
          isNew: true,
          animType: anim,
        }];
      });
      return next;
    });
  }, []);

  useEffect(() => {
    const tTimer = setTimeout(triggerAnimations, 600);
    return () => clearTimeout(tTimer);
  }, [triggerAnimations]);

  useEffect(() => {
    const id = setInterval(triggerAnimations, LOOP_INTERVAL);
    return () => clearInterval(id);
  }, [triggerAnimations]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    (Object.entries(tileLayers) as [string, TileLayer[]][]).forEach(([cityId, layers]) => {
      if (layers.length > 1) {
        const tTimer = setTimeout(() => {
          setTileLayers(prev => {
            const currentLayers = prev[cityId];
            if (!currentLayers || currentLayers.length <= 1) return prev;
            const top = currentLayers[currentLayers.length - 1];
            return { ...prev, [cityId]: [{ ...top, isNew: false }] };
          });
        }, ANIM_DURATION);
        timeouts.push(tTimer);
      }
    });
    return () => timeouts.forEach(clearTimeout);
  }, [tileLayers]);

  const activeCityData = activeCity ? turkcellCities.find(c => c.id === activeCity) : null;

  return (
    <section className="bg-stone-950 relative overflow-hidden py-0 border-y border-stone-900 font-sans">
      {/* Keyframes injected inline */}
      <style>{`
        @keyframes tc-slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes tc-slide-down { from { transform: translateY(-100%); } to { transform: translateY(0); } }
        @keyframes tc-slide-left { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes tc-slide-right { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes tc-glow-pulse {
          0%, 100% { box-shadow: inset 0 0 15px rgba(203, 163, 106, 0.4), 0 0 15px rgba(203, 163, 106, 0.2); }
          50% { box-shadow: inset 0 0 25px rgba(203, 163, 106, 0.7), 0 0 25px rgba(203, 163, 106, 0.4); }
        }
        @keyframes tc-text-reveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tc-zoom-in-logic {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.40); }
        }
        .tc-tile-anim { animation-fill-mode: forwards; }
      `}</style>

      {/* Ambient burgundy & gold background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Premium Top Burgundy Brand Line */}
      <div
        className="w-full h-[3px] opacity-90 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(159, 18, 57, 1) 50%, transparent 100%)',
          boxShadow: '0 2px 15px rgba(159, 18, 57, 0.6)'
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className={`flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-10 lg:px-16 pt-16 pb-10 gap-6 ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
          <div className={`${isRtl ? 'text-right w-full' : 'text-left'}`}>
            {/* YFS x Turkcell co-brand */}
            <div className={`flex items-center gap-3 mb-4 ${isRtl ? 'justify-end' : 'justify-start'}`}>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-500 font-sans">{t('tc_partnership')}</span>
              <span className="w-8 h-px bg-stone-800" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-primary font-sans">{t('tc_collection')}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display text-white leading-tight font-medium flex items-center gap-2 flex-wrap justify-start">
              <span>YFS</span>
              <span className="bg-gradient-to-r from-stone-400 to-stone-600 bg-clip-text text-transparent font-sans font-medium select-none text-2xl md:text-4xl px-1">x</span>
              <span className="text-brand-primary tracking-wider uppercase font-semibold">Turkcell</span>
            </h2>
            <p className="text-stone-400 text-sm mt-3 max-w-lg font-light leading-relaxed">
              {t('tc_desc')}
            </p>
          </div>

          {/* Stats */}
          <div className={`flex gap-8 flex-shrink-0 font-serif ${isRtl ? 'flex-row-reverse w-full md:w-auto justify-center md:justify-end' : 'justify-center md:justify-start'}`}>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-normal text-white">7</p>
              <p className="text-stone-500 text-[10px] tracking-widest uppercase mt-1 font-sans font-bold">{t('tc_stat_regions')}</p>
            </div>
            <div className="w-px bg-stone-800" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-normal text-brand-primary">2025</p>
              <p className="text-stone-500 text-[10px] tracking-widest uppercase mt-1 font-sans font-bold">{t('tc_stat_year')}</p>
            </div>
            <div className="w-px bg-stone-800" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-normal text-white">35+</p>
              <p className="text-stone-500 text-[10px] tracking-widest uppercase mt-1 font-sans font-bold">{t('tc_stat_retailers')}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 md:mx-10 lg:mx-16 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent mb-0" />

        {/* Main live tiles grid + details panel */}
        <div
          className="flex flex-col xl:flex-row border-y border-stone-900/60 relative"
          style={{ minHeight: '520px' }}
          onMouseLeave={() => setActiveCity(null)}
        >
          {/* City tiles — stable equal widths, no layout shifting */}
          <div className={`flex-1 flex flex-col sm:flex-row flex-wrap xl:flex-nowrap w-full p-4 gap-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {turkcellCities.map((city) => {
              const layers = tileLayers[city.id] || [];
              const isActive = activeCity === city.id;
              const localizedCityName = getLocalizedCity(city.id, city.city);

              return (
                <div
                  key={city.id}
                  className="relative overflow-hidden cursor-pointer transition-all duration-500 rounded-2xl border border-stone-850"
                  style={{
                    minHeight: '260px',
                    flex: '1 1 0%',
                    minWidth: '110px',
                  }}
                  onMouseEnter={() => setActiveCity(city.id)}
                  onClick={() => {
                    window.location.hash = `/projects/${city.slug}`;
                  }}
                >
                  {/* Glowing active border - Gold / Sunlight (Mimari Sanat style) */}
                  {isActive && (
                    <div
                      className="absolute inset-0 z-30 pointer-events-none rounded-2xl"
                      style={{
                        border: '1.5px solid rgba(203, 163, 106, 0.65)',
                        animation: 'tc-glow-pulse 2s ease-in-out infinite',
                      }}
                    />
                  )}

                  {/* Image layers */}
                  {layers.map((layer, idx) => (
                    <div
                      key={layer.id}
                      className="absolute inset-0 w-full h-full overflow-hidden tc-tile-anim"
                      style={{
                        zIndex: idx * 10 + 1,
                        animation: layer.isNew
                          ? `tc-${layer.animType} ${ANIM_DURATION}ms cubic-bezier(0.25, 1, 0.5, 1) forwards`
                          : 'none',
                      }}
                    >
                      <img
                        src={layer.image}
                        alt={localizedCityName}
                        className="w-full h-full object-cover transition-all duration-700"
                        style={{
                          animation: 'tc-zoom-in-logic 13s ease-in-out infinite alternate',
                        }}
                      />
                    </div>
                  ))}

                  {/* Dark overlay */}
                  <div
                    className={`absolute inset-0 z-20 transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent'
                        : 'bg-gradient-to-t from-stone-950/90 via-stone-900/70 to-stone-900/40'
                    }`}
                  />

                  {/* Glowing active z-index shadow helper */}
                  {isActive && (
                    <div
                      className="absolute inset-0 z-30 pointer-events-none"
                      style={{
                        boxShadow: '0 0 30px rgba(203, 163, 106, 0.25)',
                      }}
                    />
                  )}

                  {/* City label */}
                  <div className={`absolute bottom-0 left-0 right-0 z-30 p-4 md:p-5 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <p
                      className={`text-[10px] tracking-[0.3em] uppercase font-bold transition-colors duration-300 font-sans ${
                        isActive ? 'text-brand-primary' : 'text-stone-400'
                      }`}
                    >
                      {localizedCityName}
                    </p>
                    {isActive && (
                      <p
                        className="text-white text-xs mt-1 font-serif italic font-light"
                        style={{ animation: 'tc-text-reveal 0.4s ease-out forwards' }}
                      >
                        {city.districts.length} {t('tc_points_suffix')}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Details panel — shown on hover (absolutely positioned on desktop to prevent tile resizing) */}
          <div
            className={`xl:absolute xl:top-0 xl:bottom-0 xl:h-full xl:z-50 bg-stone-900/95 backdrop-blur-md border-stone-850 flex flex-col justify-between transition-all duration-500 overflow-hidden ${
              isRtl 
                ? 'xl:left-0 xl:border-r active-panel-rtl' 
                : 'xl:right-0 xl:border-l active-panel-ltr'
            } ${
              activeCityData ? 'xl:w-80 opacity-100' : 'xl:w-0 opacity-0 pointer-events-none'
            }`}
          >
            {activeCityData && (
              <div className={`p-6 md:p-8 h-full flex flex-col justify-between ${isRtl ? 'text-right items-end' : 'text-left items-start'}`} style={{ animation: 'tc-text-reveal 0.5s ease-out forwards' }}>
                {/* City header */}
                <div className="w-full">
                  <div className={`flex items-center gap-2 mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <p className="text-[9px] tracking-[0.4em] uppercase text-brand-primary font-bold">{t('tc_partnership')}</p>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-700" />
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-2 font-normal tracking-wide">{getLocalizedCity(activeCityData.id, activeCityData.city)}</h3>
                  <div className={`w-10 h-0.5 bg-brand-primary mb-6 ${isRtl ? 'mr-0 ml-auto' : ''}`} />

                  <p className="text-stone-400 text-xs leading-relaxed mb-6 font-light">
                    {t('tc_project_desc', { city: getLocalizedCity(activeCityData.id, activeCityData.city) })}
                  </p>

                  {/* Districts list */}
                  <div>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-stone-500 font-bold mb-3 font-sans">{t('tc_completed_districts')}</p>
                    <ul className="grid grid-cols-1 gap-2">
                      {activeCityData.districts.map((d, i) => (
                        <li key={i} className={`flex items-center gap-2.5 text-stone-300 text-xs font-light group/item hover:text-white transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <span className="w-1 h-1 rounded-full bg-brand-primary group-hover/item:scale-150 transition-transform" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={`#/projects/${activeCityData.slug}`}
                  className={`mt-8 inline-flex items-center gap-2 text-[10px] tracking-widest uppercase text-brand-primary hover:text-white transition-all font-bold group border border-brand-primary/20 hover:border-brand-primary px-4 py-2.5 rounded bg-stone-950/20 backdrop-blur ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  {t('tc_btn_detail')}
                  <svg className={`w-4 h-4 transition-transform text-brand-primary ${isRtl ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Bottom strip: all district tags for ALL cities */}
        <div className="border-t border-stone-900 bg-stone-950/30 px-6 md:px-10 lg:px-16 py-8">
          <div className={`flex flex-wrap gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
            {turkcellCities.flatMap(city =>
              city.districts.map(d => (
                <span
                  key={`${city.id}-${d}`}
                  className="text-[9px] text-stone-500 border border-stone-900 px-2.5 py-1.5 rounded-sm hover:border-brand-primary/40 hover:text-stone-300 transition-colors cursor-default font-sans"
                >
                  {getLocalizedCity(city.id, city.city)} / {d}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Footer bar */}
        <div className={`border-t border-stone-900/60 bg-stone-950/50 px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between font-sans ${isRtl ? 'flex-row-reverse' : ''}`}>
          <p className="text-stone-600 text-xs font-light">YFS İnşaat © 2025 — Turkcell</p>
          <a
            href="#/projects"
            className={`text-brand-primary text-xs tracking-widest uppercase font-bold hover:text-white transition-colors flex items-center gap-1 ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            {t('showcase_all')} {isRtl ? '←' : '→'}
          </a>
        </div>
      </div>

      {/* Premium Bottom Burgundy Brand Line */}
      <div
        className="w-full h-[3px] opacity-90 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(159, 18, 57, 1) 50%, transparent 100%)',
          boxShadow: '0 2px 15px rgba(159, 18, 57, 0.6)'
        }}
      />
    </section>
  );
};

export default TurkcellModule;
