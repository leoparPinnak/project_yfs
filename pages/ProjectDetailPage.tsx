
import React, { useState, useEffect } from 'react';
import { projectsData, Project } from '../data/projectsData';
import { ArrowLeftIcon } from '../components/IconComponents';

const ProjectDetailPage: React.FC = () => {
    const [project, setProject] = useState<Project | undefined>(undefined);
    const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

    useEffect(() => {
        const getProjectFromHash = () => {
            const hash = window.location.hash;
            const slug = hash.split('/projects/')[1];
            if (slug) {
                const foundProject = projectsData.find(p => p.slug === slug);
                setProject(foundProject);
            } else {
                setProject(undefined);
            }
        };

        getProjectFromHash();
        window.addEventListener('hashchange', getProjectFromHash);
        return () => window.removeEventListener('hashchange', getProjectFromHash);
    }, []);

    if (!project) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center p-8">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Proje Bulunamadı</h1>
                    <p className="text-slate-600 mb-8">Aradığınız proje mevcut değil veya kaldırılmış olabilir.</p>
                    <a href="/#/" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        Ana Sayfaya Dön
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn">
            <section
                className="relative h-[60vh] flex items-end justify-start text-white bg-cover bg-center overflow-hidden"
                style={!project.imageUrl.endsWith('.mp4') ? { backgroundImage: `url(${project.imageUrl})` } : {}}
                aria-label={`${project.name} projesi`}
            >
                {project.imageUrl.endsWith('.mp4') && (
                    <video src={`${project.imageUrl}#t=2`} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pb-16">
                    <p className="text-lg text-indigo-300 font-semibold mb-1">{project.category}</p>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
                        {project.name}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 drop-shadow-md font-light tracking-widest uppercase mt-2">
                        {project.location}
                    </p>
                </div>
            </section>

            <article className="py-16 sm:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                         <div className="md:col-span-2">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Proje Hakkında</h2>
                            <div className="prose prose-lg max-w-none text-slate-600">
                                <p>{project.description}</p>
                            </div>
                        </div>
                        <aside>
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-800 mb-4">Proje Künyesi</h3>
                                <ul className="space-y-3 text-slate-600">
                                    <li className="flex flex-col">
                                        <strong className="text-sm text-slate-500">Müşteri</strong>
                                        <span>{project.name}</span>
                                    </li>
                                     <li className="flex flex-col">
                                        <strong className="text-sm text-slate-500">Lokasyon</strong>
                                        <span>{project.location}</span>
                                    </li>
                                     <li className="flex flex-col">
                                        <strong className="text-sm text-slate-500">Kategori</strong>
                                        <span>{project.category}</span>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                    </div>

                    <div className="mt-16 sm:mt-24">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">Proje Galerisi</h3>
                        
                        {/* Standart 16:9 Simetrik Grid Yerleşimi (Kırpmasız / Kayıpsız Ölçeklendirme) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {project.imageGallery.map((media, index) => {
                                const isVideo = media.endsWith('.mp4');
                                return (
                                    <div 
                                        key={index} 
                                        onClick={() => setSelectedMedia(media)}
                                        className="group aspect-video rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.03] bg-slate-950 flex items-center justify-center cursor-pointer relative border border-gray-200/50"
                                    >
                                        {isVideo ? (
                                            <video src={`${media}#t=2`} className="w-full h-full object-cover pointer-events-none" />
                                        ) : (
                                            <img src={media} alt={`${project.name} galeri ${index + 1}`} className="w-full h-full object-cover" />
                                        )}
                                        {/* Büyüteç Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                            </svg>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                     <div className="mt-16 text-center">
                        <a href="#/projects" className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                           <ArrowLeftIcon className="h-5 w-5" />
                           Diğer Projeler
                        </a>
                    </div>
                </div>
            </article>

            {/* Lightbox Önizleme Modalı */}
            {selectedMedia && (
                <div 
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 animate-fadeIn"
                    onClick={() => setSelectedMedia(null)}
                >
                    <button 
                        className="absolute top-4 right-4 md:top-8 md:right-8 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 md:p-3 rounded-full transition-all duration-200 z-50 focus:outline-none"
                        onClick={() => setSelectedMedia(null)}
                    >
                        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div 
                        className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedMedia.endsWith('.mp4') ? (
                            <video src={`${selectedMedia}#t=2`} controls autoPlay className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain" />
                        ) : (
                            <img src={selectedMedia} alt="Önizleme" className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetailPage;
