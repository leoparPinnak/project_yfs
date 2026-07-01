import React, { useState } from 'react';
import { ArrowUpRight, Check, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { useSiteContent } from '../context/SiteContentContext';

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const { content } = useSiteContent();
  const projects = content?.projects || [];

  const [activeId, setActiveId] = useState<number | null>(null);
  const activeProject = activeId ? projects.find(p => p.id === activeId) : null;

  const getStatusText = (status: string) => {
    if (status === 'Ongoing') return t.projects.ongoing;
    if (status === 'Completed') return t.projects.completed;
    return t.projects.planned;
  };

  return (
    <section id="projects" className="relative py-32 bg-stone-900 text-stone-100 border-t border-stone-800 overflow-hidden transition-all duration-700">

      <style>{`
        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rotateBorderReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>

      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeId === null ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-stone-900"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-stone-800/40 via-stone-900 to-stone-950"></div>
        </div>

        {projects.map((project) => (
          <div
            key={project.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeId === project.id ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={project.image} alt="" className="w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 opacity-70 bg-stone-900"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-900/90 mix-blend-multiply"></div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-bronze-400 text-xs tracking-[0.3em] uppercase mb-4 block">{t.projects.badge}</span>
            <h3
              key={activeId ? activeId : 'default'}
              className="text-4xl md:text-6xl font-display font-light text-stone-50 animate-[fadeInUp_0.6s_ease-out]"
            >
              {activeProject ? activeProject.title : t.projects.defaultTitle}
            </h3>
          </div>
          <div className="hidden md:flex items-center gap-3 text-stone-400 hover:text-white transition-colors text-sm tracking-widest uppercase group cursor-pointer">
            {t.projects.seeAll} <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </div>
        </div>

        <div
          className="flex flex-col lg:flex-row gap-6 min-h-[500px]"
          onMouseLeave={() => setActiveId(null)}
        >
          {projects.map((project) => {
            const isActive = activeId === project.id;
            const isIdle = activeId === null;
            const statusText = getStatusText(project.status);

            return (
              <div
                key={project.id}
                onMouseEnter={() => setActiveId(project.id)}
                className={`
                  relative group cursor-pointer overflow-hidden rounded-3xl border backdrop-blur-sm bg-stone-900/40
                  transition-all duration-500 ease-out
                  ${isActive ? 'lg:flex-[1.5] border-transparent shadow-2xl scale-[1.02] z-20' : 'lg:flex-1 border-stone-800'}
                  ${!isActive && !isIdle ? 'opacity-0' : 'opacity-100'}
                  flex flex-col justify-end
                `}
              >
                {isActive && (
                  <>
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none z-30"
                      style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, transparent 60deg, rgba(255,140,0,0.8) 90deg, rgba(255,200,50,1) 100deg, rgba(255,140,0,0.8) 110deg, transparent 140deg, transparent 360deg)`,
                        animation: 'rotateBorder 4s linear infinite',
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude'
                      }}
                    />
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none z-30"
                      style={{
                        background: `conic-gradient(from 0deg, transparent 0deg, transparent 220deg, rgba(212,175,55,0.8) 250deg, rgba(255,215,100,1) 260deg, rgba(212,175,55,0.8) 270deg, transparent 300deg, transparent 360deg)`,
                        animation: 'rotateBorderReverse 4s linear infinite',
                        padding: '1px',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude'
                      }}
                    />
                  </>
                )}

                <div className="absolute inset-0 z-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'scale-110 grayscale-0' : 'grayscale scale-100'}`}
                  />
                  <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? 'bg-stone-900/20' : 'bg-stone-900/60'}`}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/50 to-transparent"></div>
                </div>

                <div className="absolute top-6 left-6 z-20">
                  {project.status === 'Ongoing' ? (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950/90 backdrop-blur-md border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-emerald-100 font-medium">{statusText}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950/90 backdrop-blur-md border border-stone-700">
                      <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-full p-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-400" />
                      </div>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-emerald-200 font-medium">{statusText}</span>
                    </div>
                  )}
                </div>

                <div className="relative z-10 p-6 md:p-8 transform transition-transform duration-500">
                  <div className={`flex items-center gap-3 text-xs font-medium uppercase tracking-wider mb-3 transition-all duration-300 ${isActive ? 'text-bronze-400 translate-y-0 opacity-100' : 'text-stone-400 translate-y-4 opacity-0'}`}>
                    <span>{project.category}</span>
                    <span className="w-1 h-1 bg-stone-500 rounded-full"></span>
                    <span>{project.year}</span>
                  </div>

                  <h4 className={`text-xl md:text-2xl font-display text-white mb-2 transition-all duration-300 ${isActive ? 'translate-y-0' : 'translate-y-2'}`}>
                    {project.title}
                  </h4>

                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <div className="flex items-center gap-2 text-stone-300 text-xs mb-3">
                      <MapPin className="w-3 h-3 text-stone-500" />
                      {project.location}
                    </div>
                    <p className="text-stone-400 text-sm font-light leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {isActive && (
                    <button className="mt-6 px-8 py-3 rounded-full bg-stone-950/5 backdrop-blur-md border border-amber-500/50 text-white flex items-center gap-2 hover:bg-stone-950/80 hover:border-amber-400 transition-all duration-300 group shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                      {t.projects.discoverNow}
                      <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-bronze-400" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center lg:hidden">
          <button className="px-8 py-4 border border-stone-700 text-stone-300 text-xs tracking-widest uppercase hover:bg-stone-100 hover:text-stone-900 transition-all">
            {t.projects.seeAllProjects}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;