import React, { useState, useEffect } from 'react';
import { projectsData } from '../data/projectsData';
import { useLanguage } from '../context/LanguageContext';

const ProjectsPage: React.FC = () => {
  const { t, language, isRtl } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCardSlug, setActiveCardSlug] = useState<string | null>(null);

  // Group Turkcell projects under a single slide, other projects remain single
  const turkcellProjects = projectsData.filter(p => p.slug.startsWith('turkcell-'));
  const otherProjects = projectsData.filter(p => !p.slug.startsWith('turkcell-'));

  const slides = [
    { type: 'single', project: otherProjects[0] }, // Swiss Otel Resorts
    { type: 'single', project: otherProjects[1] }, // Akış Yapı
    { type: 'grouped', name: t('projects_page_turkcell_title'), location: t('projects_page_turkcell_location'), slug: 'turkcell', projects: turkcellProjects },
    { type: 'single', project: otherProjects[2] }, // Ekmas Egem
    { type: 'single', project: otherProjects[3] }, // SunExpress Apron Ekbina
    { type: 'single', project: otherProjects[4] }, // YFS Modern
    { type: 'single', project: otherProjects[5] }, // Kağıthane Metro İnşaatı İnce İşler
    { type: 'single', project: otherProjects[6] }, // Çeşme Boyalık Kumsal Projesi
  ];

  // Auto-advance slides when not paused
  useEffect(() => {
    setProgressKey(prevKey => prevKey + 1);

    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Advance every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, slides.length]);

  const handleDotClick = (index: number) => {
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const currentSlide = slides[currentIndex];
  
  const getLocalizedName = (proj: any) => {
    if (language === 'en' && proj.name_en) return proj.name_en;
    if (language === 'ar' && proj.name_ar) return proj.name_ar;
    return proj.name;
  };

  const getLocalizedLocation = (proj: any) => {
    if (language === 'en' && proj.location_en) return proj.location_en;
    if (language === 'ar' && proj.location_ar) return proj.location_ar;
    return proj.location;
  };

  const getLocalizedDesc = (proj: any) => {
    if (language === 'en' && proj.description_en) return proj.description_en;
    if (language === 'ar' && proj.description_ar) return proj.description_ar;
    return proj.description;
  };

  const currentSlideTitle = currentSlide.type === 'grouped' ? currentSlide.name : getLocalizedName(currentSlide.project);
  const currentSlideLocation = currentSlide.type === 'grouped' ? currentSlide.location : getLocalizedLocation(currentSlide.project);

  return (
    <section 
      className="fixed inset-0 z-0 flex items-center justify-center text-white overflow-hidden bg-slate-950"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Background Images / Videos */}
      {slides.map((slide, index) => {
        const isCurrent = index === currentIndex;
        if (slide.type === 'grouped') {
          return (
            <div
              key={slide.slug}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
              aria-hidden={!isCurrent}
            >
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center filter blur-md scale-105"
                style={{ backgroundImage: `url(/turkcell/1.jpeg)` }}
              />
              <div className="absolute inset-0 bg-slate-950/80 z-0"></div>
            </div>
          );
        } else {
          const project = slide.project!;
          const isVideo = project.imageUrl.endsWith('.mp4');
          return (
            <div
              key={project.slug}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
              aria-hidden={!isCurrent}
            >
              {isVideo ? (
                <video
                  src={`${project.imageUrl}#t=2`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                  role="img"
                  aria-label={`${getLocalizedName(project)} projesi, ${getLocalizedLocation(project)}'da`}
                />
              )}
            </div>
          );
        }
      })}

      {/* Global overlay for readability */}
      <div className="absolute inset-0 bg-black/45 z-10 pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between py-12 md:py-16">
        
        {/* Top: Header Info */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mt-4">
          <div key={currentIndex} style={{ animation: 'fadeIn 0.6s ease-out' }}>
            <h1 className="text-3xl md:text-5xl font-light tracking-wide mb-1 text-white/95 drop-shadow-lg leading-tight dark:font-display dark:font-normal">
              {currentSlideTitle}
            </h1>
            <p className="text-sm md:text-base text-indigo-300 drop-shadow-md font-semibold tracking-widest uppercase mt-2">
              {currentSlideLocation}
            </p>
          </div>
        </div>

        {/* Center: Lumia grid or CTA Button */}
        <div className="flex-grow flex items-center justify-center my-6 overflow-hidden">
          {currentSlide.type === 'grouped' ? (
            <div 
              className="w-full max-w-7xl mx-auto px-4 md:px-8" 
              style={{ animation: 'fadeIn 0.8s ease-out' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => {
                setIsPaused(false);
                setActiveCardSlug(null);
              }}
            >
              {/* Flex row accordion side-by-side cards layout */}
              <div className={`flex flex-col lg:flex-row gap-4 min-h-[380px] lg:h-[420px] items-stretch ${isRtl ? 'lg:flex-row-reverse' : ''}`}>
                {currentSlide.projects.map((project) => {
                  const isActive = activeCardSlug === project.slug;
                  const isIdle = activeCardSlug === null;

                  return (
                    <div
                      key={project.slug}
                      onMouseEnter={() => setActiveCardSlug(project.slug)}
                      className={`
                        relative group cursor-pointer overflow-hidden rounded-2xl border backdrop-blur-sm bg-slate-900/40
                        transition-all duration-500 ease-out flex flex-col justify-end p-5
                        ${isActive ? 'lg:flex-[2.2] border-transparent shadow-2xl scale-[1.01] z-20' : 'lg:flex-1 border-white/10'}
                        ${!isActive && !isIdle ? 'opacity-40 scale-[0.98]' : 'opacity-100'}
                        h-[120px] lg:h-auto
                      `}
                    >
                      {/* Rotating Glowing Pistachio Border Effect */}
                      {isActive && (
                        <>
                          <div
                            className="absolute inset-0 rounded-2xl pointer-events-none z-30"
                            style={{
                              background: `conic-gradient(
                                from 0deg,
                                transparent 0deg,
                                transparent 60deg,
                                rgba(167, 244, 102, 0.8) 90deg,
                                rgba(167, 244, 102, 1) 100deg,
                                rgba(167, 244, 102, 0.8) 110deg,
                                transparent 140deg,
                                transparent 360deg
                              )`,
                              animation: 'rotateBorder 4s linear infinite',
                              padding: '1.5px',
                              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                              WebkitMaskComposite: 'xor',
                              maskComposite: 'exclude'
                            }}
                          />
                          <div
                            className="absolute inset-0 rounded-2xl pointer-events-none z-30"
                            style={{
                              background: `conic-gradient(
                                from 0deg,
                                transparent 0deg,
                                transparent 220deg,
                                rgba(167, 244, 102, 0.8) 250deg,
                                rgba(167, 244, 102, 1) 260deg,
                                rgba(167, 244, 102, 0.8) 270deg,
                                transparent 300deg,
                                transparent 360deg
                              )`,
                              animation: 'rotateBorderReverse 4s linear infinite',
                              padding: '1.5px',
                              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                              WebkitMaskComposite: 'xor',
                              maskComposite: 'exclude'
                            }}
                          />
                        </>
                      )}

                      {/* Card Background Image */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={project.imageUrl}
                          alt={getLocalizedName(project)}
                          className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}
                        />
                        <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-black/10' : 'bg-black/45'}`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                      </div>

                      {/* Completed Status Badge */}
                      <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} z-20`}>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                          </span>
                          <span className="text-[8px] tracking-wider uppercase text-emerald-300 font-semibold">{t('project_completed')}</span>
                        </div>
                      </div>

                      {/* Card Text Content */}
                      <div className={`relative z-10 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <p className={`text-[9px] uppercase tracking-widest text-indigo-300 font-bold mb-1 transition-all duration-300 ${isActive ? 'translate-y-0 opacity-100' : 'lg:translate-y-4 lg:opacity-0'}`}>
                          {t('project_concept_conversion')}
                        </p>
                        
                        <h3 className="text-sm lg:text-xl font-bold text-white leading-tight uppercase mb-1">
                          {getLocalizedLocation(project)}
                        </h3>

                        {/* Location Details and Button (Visible when active) */}
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-24 opacity-100 mt-1 lg:mt-2' : 'lg:max-h-0 lg:opacity-0'}`}>
                          <p className="text-[11px] text-gray-300 line-clamp-2 font-light leading-snug mb-3">
                            {getLocalizedDesc(project)}
                          </p>
                          <a
                            href={`/#/projects/${project.slug}`}
                            className={`inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider group/link transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}
                          >
                            {t('project_view_details')}
                            <svg className={`w-3.5 h-3.5 transform transition-transform ${isRtl ? 'group-hover/link:-translate-x-0.5 group-hover/link:-translate-y-0.5 rotate-180' : 'group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <a
              href={`/#/projects/${currentSlide.project!.slug}`}
              className="w-full h-full flex flex-col items-center justify-center text-center cursor-pointer px-4"
            >
              <span className="btn-glow-pistachio text-sm md:text-base px-6 py-2.5 rounded-full shadow-md font-semibold tracking-wide">
                {t('project_view_project')}
              </span>
            </a>
          )}
        </div>

        {/* Bottom: Navigation and Progress */}
        <div className="container mx-auto px-4 text-center pb-2">
          {/* Navigation Dots */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  currentIndex === index ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Proje ${index + 1}'e git`}
              />
            ))}
          </div>

          {/* Progress Bar and Play/Pause Button Container */}
          <div className="flex items-center justify-center space-x-4 max-w-xs mx-auto">
            {/* Progress Bar (Pauses on Hover or via Button) */}
            <div className="flex-grow bg-white/20 rounded-full h-1 overflow-hidden">
              <div
                key={progressKey}
                className="bg-white h-1"
                style={{ 
                  animation: 'progressFill 5s linear forwards',
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              ></div>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 transition-all duration-200 text-white focus:outline-none flex-shrink-0"
              aria-label={isPaused ? "Slaytı Oynat" : "Slaytı Duraklat"}
              title={isPaused ? "Oynat" : "Duraklat"}
            >
              {isPaused ? (
                // Play Icon
                <svg className="w-3 h-3 fill-current text-white translate-x-[0.5px]" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                // Pause Icon
                <svg className="w-3 h-3 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProjectsPage;
