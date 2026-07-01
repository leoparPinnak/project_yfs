import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const Showcase: React.FC = () => {
  const { theme } = useTheme();
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-20 bg-white dark:bg-stone-950 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 font-sans">

        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">

          {/* SOL TARAF – YAZI */}
          <div className={`${isRtl ? 'order-2 md:order-2 text-right' : 'order-2 md:order-1 text-left'}`}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white dark:font-display dark:font-normal">
              {t('showcase_header')}
            </h2>

            <p className="text-slate-600 dark:text-stone-400 mb-6 text-lg font-light leading-relaxed">
              {t('showcase_desc_body')}
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  className={`w-6 h-6 ${theme === 'dark' ? 'text-brand-primary' : 'text-indigo-500'} ${isRtl ? 'ml-3' : 'mr-3'} flex-shrink-0`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-slate-700 dark:text-stone-300 font-light text-sm md:text-base">
                  {t('showcase_li_1')}
                </span>
              </li>

              <li className="flex items-start">
                <svg
                  className={`w-6 h-6 ${theme === 'dark' ? 'text-brand-primary' : 'text-indigo-500'} ${isRtl ? 'ml-3' : 'mr-3'} flex-shrink-0`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-slate-700 dark:text-stone-300 font-light text-sm md:text-base">
                  {t('showcase_li_2')}
                </span>
              </li>

              <li className="flex items-start">
                <svg
                  className={`w-6 h-6 ${theme === 'dark' ? 'text-brand-primary' : 'text-indigo-500'} ${isRtl ? 'ml-3' : 'mr-3'} flex-shrink-0`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-slate-700 dark:text-stone-300 font-light text-sm md:text-base">
                  {t('showcase_li_3')}
                </span>
              </li>
            </ul>
          </div>

          {/* SAĞ TARAF – RESİM */}
          <div className={`${isRtl ? 'order-1 md:order-1' : 'order-1 md:order-2'} flex justify-center w-full relative`}>
            {theme === 'dark' && (
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-primary via-brand-red to-brand-primary rounded-2xl blur-lg opacity-40 animate-pulse" />
            )}
            <img
              src="/sw1.jpg"
              alt={t('showcase_img_alt')}
              className="rounded-xl shadow-lg dark:shadow-rose-950/20 transform transition-transform duration-500 hover:scale-105 w-full max-w-[550px] h-auto relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
