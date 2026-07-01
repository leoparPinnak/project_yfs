import React from 'react';
import { ClockIcon, ShieldCheckIcon, UsersIcon, BriefcaseIcon } from './IconComponents';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Features: React.FC = () => {
  const { theme } = useTheme();
  const { t, isRtl } = useLanguage();

  const featuresData = [
    {
      icon: (themeStr: string) => <ClockIcon className={`h-10 w-10 ${themeStr === 'dark' ? 'text-brand-primary' : 'text-indigo-500'}`} aria-hidden="true" />,
      title: t('feature_1_title'),
      description: t('feature_1_desc'),
    },
    {
      icon: (themeStr: string) => <ShieldCheckIcon className={`h-10 w-10 ${themeStr === 'dark' ? 'text-brand-primary' : 'text-indigo-500'}`} aria-hidden="true" />,
      title: t('feature_2_title'),
      description: t('feature_2_desc'),
    },
    {
      icon: (themeStr: string) => <UsersIcon className={`h-10 w-10 ${themeStr === 'dark' ? 'text-brand-primary' : 'text-indigo-500'}`} aria-hidden="true" />,
      title: t('feature_3_title'),
      description: t('feature_3_desc'),
    },
    {
      icon: (themeStr: string) => <BriefcaseIcon className={`h-10 w-10 ${themeStr === 'dark' ? 'text-brand-primary' : 'text-indigo-500'}`} aria-hidden="true" />,
      title: t('feature_4_title'),
      description: t('feature_4_desc'),
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-stone-900 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:font-display dark:font-normal">
            {t('features_title')}
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-stone-400 max-w-2xl mx-auto font-light">
            {t('features_desc')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className={`bg-white dark:bg-stone-950 p-8 rounded-xl border border-gray-200 dark:border-stone-850 hover:border-indigo-500 dark:hover:border-brand-primary focus:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isRtl ? 'text-right' : 'text-left'
              }`}
            >
              <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-indigo-50 dark:bg-rose-950/20 mb-6 ${
                isRtl ? 'mr-0 ml-auto' : 'mr-auto ml-0'
              }`}>
                {feature.icon(theme)}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-stone-100 dark:font-serif dark:font-medium">{feature.title}</h3>
              <p className="text-slate-500 dark:text-stone-400 text-sm font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;