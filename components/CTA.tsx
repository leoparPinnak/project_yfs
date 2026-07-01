import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface CTAProps {
  setContactPopoverOpen: (isOpen: boolean) => void;
}

const CTA: React.FC<CTAProps> = ({ setContactPopoverOpen }) => {
  const { t } = useLanguage();

  return (
    <section className="bg-white dark:bg-stone-950 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-stone-900 dark:to-stone-950 p-8 sm:p-12 rounded-2xl shadow-lg dark:border dark:border-stone-850 dark:shadow-rose-950/10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white dark:text-brand-primary mb-4 dark:font-display dark:font-normal">
            {t('cta_title')}
          </h2>
          <p className="text-indigo-100 dark:text-stone-400 text-lg mb-8 font-light">
            {t('cta_desc')}
          </p>
          <button 
            onClick={() => setContactPopoverOpen(true)}
            className="bg-white dark:bg-brand-primary text-indigo-600 dark:text-stone-950 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-110 hover:bg-indigo-50 dark:hover:bg-brand-primary/90 shadow-md inline-block">
            {t('btn_quote')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
