import React from 'react';
import { EyeIcon, RocketLaunchIcon, LinkedInIcon } from '../components/IconComponents';
import { useLanguage } from '../context/LanguageContext';

const AboutPage: React.FC = () => {
    const { t, language, isRtl } = useLanguage();

    const teamData = [
      {
        name: 'Yiğit Fırat Sekitmez',
        title: language === 'en' ? 'M.Sc. Civil Engineer & Founder' : (language === 'ar' ? 'ماجستير مهندس مدني ومؤسس' : 'İnşaat Yüksek Mühendisi & Kurucu'),
        imageUrl: 'https://media.licdn.com/dms/image/v2/C4D03AQG3zFTQkgPrxw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1634477186403?e=1764806400&v=beta&t=wpnsA5NvMMk4f3UDUMQVM9k5wmYoaxJdQmV9Hno49iA',
        linkedinUrl: 'https://www.linkedin.com/in/yi%C4%9Fit-f%C4%B1rat-sekitmez-523606128/',
      },
      {
        name: 'Erhan Altun',
        title: language === 'en' ? 'Co-founder & General Manager' : (language === 'ar' ? 'مؤسس مشارك ومدير عام' : 'Kurucu Ortak & Genel Müdür'),
        imageUrl: 'https://www.yfsinsaat.com/public/erhan.jpg',
        linkedinUrl: 'https://www.linkedin.com/',
      },
      {
        name: 'Ulaş Can Yücel',
        title: language === 'en' ? 'Site Manager' : (language === 'ar' ? 'مدير الموقع' : 'Şantiye Şefi'),
        imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQFLREtKKmwtgA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726856409176?e=1764806400&v=beta&t=KISC7sD1A-st2mWGMRJB546jbKXgvIE2pTWPEOcBQGw',
        linkedinUrl: 'https://www.linkedin.com/in/canyucelulas/',
      },
    ];

    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <section
                className="relative h-[50vh] flex items-center justify-center text-white bg-cover bg-center"
                style={{ backgroundImage: `url('https://www.yfsinsaat.com/public/22.png')` }}
                aria-label="Modern bir şantiye alanı"
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 font-sans">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg dark:font-display dark:font-normal">
                        {t('about_title')}
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
                        {t('about_desc')}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <article className="py-16 sm:py-24 bg-white dark:bg-stone-950 transition-colors duration-500 font-sans">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Story Section */}
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 dark:font-display dark:font-normal">{t('about_story_title')}</h2>
                        <img src="https://www.yfsinsaat.com/public/yfs1.png" alt="YFS İnşaat Logosu" className="h-20 w-auto mx-auto mb-6" />
                        <div className={`prose prose-lg max-w-none text-slate-600 dark:text-stone-300 font-light leading-relaxed ${isRtl ? 'text-right' : 'text-left sm:text-justify'}`}>
                            <p className="mb-4">
                                {t('about_story_p1')}
                            </p>
                            <p>
                                {t('about_story_p2')}
                            </p>
                        </div>
                    </div>

                    {/* Vision & Mission Section */}
                    <div className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 ${isRtl ? 'direction-rtl' : ''}`}>
                        <div className={`bg-gray-50 dark:bg-stone-900 p-8 rounded-xl border border-gray-200 dark:border-stone-850 ${isRtl ? 'text-right' : 'text-left'}`}>
                             <div className={`flex items-center text-2xl font-bold text-slate-900 dark:text-white mb-4 dark:font-serif dark:font-medium ${isRtl ? 'flex-row-reverse' : ''}`}>
                                <EyeIcon className={`h-8 w-8 text-indigo-500 dark:text-brand-primary flex-shrink-0 ${isRtl ? 'ml-3' : 'mr-3'}`} />
                                {t('about_vision_title')}
                            </div>
                            <p className="text-slate-600 dark:text-stone-300 font-light leading-relaxed">
                                {t('about_vision_desc')}
                            </p>
                        </div>
                        <div className={`bg-gray-50 dark:bg-stone-900 p-8 rounded-xl border border-gray-200 dark:border-stone-850 ${isRtl ? 'text-right' : 'text-left'}`}>
                             <div className={`flex items-center text-2xl font-bold text-slate-900 dark:text-white mb-4 dark:font-serif dark:font-medium ${isRtl ? 'flex-row-reverse' : ''}`}>
                                <RocketLaunchIcon className={`h-8 w-8 text-indigo-500 dark:text-brand-primary flex-shrink-0 ${isRtl ? 'ml-3' : 'mr-3'}`} />
                                {t('about_mission_title')}
                            </div>
                             <p className="text-slate-600 dark:text-stone-300 font-light leading-relaxed">
                                {t('about_mission_desc')}
                            </p>
                        </div>
                    </div>
                </div>
            </article>
            
            {/* Team Section */}
            <section id="team" className="py-20 bg-gray-50 dark:bg-stone-900 transition-colors duration-500 font-sans">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:font-display dark:font-normal">
                    {t('about_team_title')}
                  </h2>
                  <p className="mt-4 text-lg text-slate-500 dark:text-stone-400 max-w-2xl mx-auto font-light leading-relaxed">
                    {t('about_team_desc')}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamData.map((member) => (
                    <div 
                      key={member.name} 
                      className="group text-center bg-white dark:bg-stone-950 p-6 rounded-xl border border-gray-200 dark:border-stone-850 hover:border-indigo-300 dark:hover:border-brand-primary transition-all duration-300 transform hover:-translate-y-2 shadow-sm hover:shadow-xl"
                    >
                      <div className="relative inline-block">
                        <img 
                          src={member.imageUrl} 
                          alt={`${member.name} portresi`}
                          className="w-36 h-36 rounded-full mx-auto mb-4 object-cover border-4 border-white dark:border-stone-900 group-hover:border-indigo-200 dark:group-hover:border-brand-primary transition-colors duration-300" 
                        />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-stone-100 dark:font-serif dark:font-medium">{member.name}</h3>
                      <p className="text-indigo-500 dark:text-brand-primary font-medium mb-4">{member.title}</p>
                      {member.linkedinUrl && (
                        <a 
                          href={member.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-slate-400 hover:text-indigo-600 dark:hover:text-brand-primary transition-colors duration-300"
                          aria-label={`${member.name}'s LinkedIn Profili`}
                        >
                          <LinkedInIcon className="h-6 w-6 mx-auto" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
        </div>
    );
};
export default AboutPage;
