import React, { useState } from 'react';
import { MenuIcon, XIcon } from './IconComponents';
import { YfsLogo } from './YfsLogo';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  setContactPopoverOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setContactPopoverOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t, isRtl } = useLanguage();

  const navLinks = [
    { href: '#services', label: t('nav_services') },
    { href: '#/projects', label: t('nav_projects') },
    { href: '#testimonials', label: t('nav_testimonials') },
    { href: '#contact', label: t('nav_contact') },
  ];

  const languages = [
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-stone-900/90 backdrop-blur-lg transition-all duration-300 border-b border-gray-100 dark:border-stone-800/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/#/" className="flex items-center space-x-2 text-slate-900 dark:text-stone-100 group">
              <YfsLogo className="h-9 w-auto text-indigo-600 dark:text-brand-primary" />
              <span className="font-bold text-xl tracking-tight transition-colors group-hover:text-indigo-600 dark:group-hover:text-brand-primary">YFS İNŞAAT</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className={`ml-10 flex items-baseline ${isRtl ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-600 dark:text-stone-300 hover:bg-gray-100 dark:hover:bg-stone-800 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className={`hidden md:flex items-center ${isRtl ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
            {/* Language Selector (Circular Flags Side-by-Side) */}
            <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              {languages.map((lang) => {
                const isActive = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-300 font-medium ${
                      isActive 
                        ? 'bg-slate-900 dark:bg-stone-950 border border-indigo-500 dark:border-brand-primary text-white scale-110 shadow-md shadow-indigo-500/25 dark:shadow-brand-primary/25 z-10' 
                        : 'bg-slate-800/10 dark:bg-stone-800/60 border border-transparent hover:bg-slate-800/20 dark:hover:bg-stone-800/80 text-stone-500 dark:text-stone-400 opacity-60 hover:opacity-100 scale-95'
                    }`}
                    title={lang.label}
                    aria-label={`Select ${lang.label}`}
                  >
                    <span className="text-base leading-none select-none filter drop-shadow-sm">{lang.flag}</span>
                  </button>
                );
              })}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-stone-400 hover:bg-gray-100 dark:hover:bg-stone-800 transition-all duration-350 border border-transparent dark:border-stone-800"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                // Sun Icon (Light Mode)
                <svg className="w-5 h-5 text-amber-400 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="5" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                // Moon Icon (Dark Mode)
                <svg className="w-5 h-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button 
              onClick={() => setContactPopoverOpen(true)}
              className="bg-indigo-500 dark:bg-brand-primary dark:hover:bg-brand-primary/95 text-white dark:text-stone-950 font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block">
              {t('btn_quote')}
            </button>
          </div>
          <div className={`-mr-2 flex items-center ${isRtl ? 'space-x-reverse space-x-2' : 'space-x-2'} md:hidden`}>
            {/* Mobile Language selector (Circular Flags Side-by-Side) */}
            <div className={`flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
              {languages.map((lang) => {
                const isActive = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 font-medium ${
                      isActive 
                        ? 'bg-slate-900 dark:bg-stone-950 border border-indigo-500 dark:border-brand-primary text-white scale-105 shadow-sm z-10' 
                        : 'bg-slate-800/10 dark:bg-stone-800/60 border border-transparent opacity-60 hover:opacity-100'
                    }`}
                    title={lang.label}
                    aria-label={`Select ${lang.label}`}
                  >
                    <span className="text-sm leading-none select-none">{lang.flag}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-stone-400 hover:bg-gray-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="5" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-white dark:bg-stone-900 inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-stone-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Menüyü aç</span>
              {isMenuOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-stone-900 border-b border-gray-200 dark:border-stone-850" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-700 dark:text-stone-300 hover:bg-gray-100 dark:hover:bg-stone-800 hover:text-slate-900 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-stone-800">
            <div className="px-2">
              <button 
                onClick={() => {
                  setContactPopoverOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full block text-center bg-indigo-500 dark:bg-brand-primary dark:text-stone-950 hover:bg-indigo-600 font-bold py-2 px-4 rounded-lg transition-all duration-300">
                {t('btn_quote')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Burgundy Separator Line */}
      <div 
        className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#3E0B14] dark:via-rose-900/85 to-transparent opacity-95 pointer-events-none" 
        style={{
          boxShadow: '0 1px 12px rgba(62, 11, 20, 0.45)'
        }}
      />
    </header>
  );
};

export default Header;