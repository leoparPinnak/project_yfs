
import React, { useState } from 'react';
import { MenuIcon, XIcon } from './IconComponents';
import { YfsLogo } from './YfsLogo';

interface HeaderProps {
  setContactPopoverOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setContactPopoverOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#services', label: 'Hizmetlerimiz' },
    { href: '#/projects', label: 'Projelerimiz' },
    { href: '#testimonials', label: 'Referanslar' },
    { href: '#contact', label: 'İletişim' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/#/" className="flex items-center space-x-2 text-slate-900">
              <YfsLogo className="h-9 w-auto text-indigo-600" />
              <span className="font-bold text-xl tracking-tight">YFS İNŞAAT</span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-600 hover:bg-gray-100 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
             <button 
                onClick={() => setContactPopoverOpen(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block">
              Teklif Alın
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500"
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
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-slate-700 hover:bg-gray-100 hover:text-slate-900 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2">
              <button 
                onClick={() => {
                  setContactPopoverOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full block text-center bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                Teklif Alın
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;