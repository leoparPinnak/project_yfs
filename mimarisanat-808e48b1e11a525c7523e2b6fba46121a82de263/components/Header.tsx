import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';



export const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    { label: t.nav.home, path: '/' },
    // { label: t.nav.project, path: '/project' }, // Future / Preparation
    // { label: t.nav.gallery, path: '/gallery' }, // Future / Preparation
    { label: t.nav.contact, path: '/contact' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Check if we're already on the page being clicked
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${isScrolled
        ? 'bg-stone-900/90 backdrop-blur-md border-b border-stone-800 py-4 opacity-100'
        : 'bg-transparent py-8 opacity-100'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6 xl:max-w-[95%] flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo - Goes to main homepage */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-start group">
            <span className="text-2xl md:text-3xl font-display font-medium tracking-widest text-white dark:text-stone-100 leading-none">MİMARİ</span>
            <span className="text-[0.6rem] md:text-xs font-bold tracking-[0.4em] text-amber-500 uppercase mt-1 group-hover:text-amber-400 transition-colors drop-shadow-sm">Sanat</span>
          </Link>

          {/* Vertical Red Brand Strip */}
          <div className="hidden md:block w-1.5 h-10 bg-rose-800 ml-8 rounded-full" style={{ boxShadow: '0 0 10px rgba(159, 18, 57, 0.4)' }}></div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8 mr-4 border-r border-stone-700 pr-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="text-xs font-medium text-stone-300 hover:text-white transition-colors tracking-[0.15em] uppercase relative group"
              >
                {item.label}
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-bronze-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeToggle />
            <Link to="/contact" className="ml-4 px-6 py-2.5 border border-stone-600 text-white text-xs tracking-widest uppercase hover:bg-white hover:text-stone-900 hover:border-white transition-all duration-300">
              {t.nav.contactButton}
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="text-white hover:text-bronze-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-stone-900 dark:bg-stone-950 z-40 flex flex-col justify-center items-center gap-8 animate-[fadeIn_0.3s_ease-out]">
          <button
            className="absolute top-8 right-8 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>

          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-2xl font-serif text-stone-200 hover:text-bronze-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-8">
            <LanguageSelector />
          </div>
        </div>
      )}

      {/* Horizontal Gradient Separator at the Bottom of Header - Only visible when scrolled */}
      <div
        className={`absolute bottom-0 left-0 w-full h-[3px] transition-opacity duration-500 pointer-events-none ${isScrolled ? 'opacity-90' : 'opacity-0'}`}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(159, 18, 57, 1) 50%, transparent 100%)',
          boxShadow: '0 2px 15px rgba(159, 18, 57, 0.6)'
        }}
      />
    </nav>
  );
};