import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Building2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import { useSiteContent } from '../context/SiteContentContext';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { content } = useSiteContent();
  const contact = content?.contact;
  const footerContent = content?.footer;

  const mapLat = contact?.mapLat ?? 38.632642;
  const mapLng = contact?.mapLng ?? 27.388388;

  return (
    <footer className="bg-stone-950 text-white pt-16 md:pt-20 pb-8 md:pb-10 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-12 mb-12 md:mb-16">
          {/* Brand Column */}
          <div className="space-y-4 md:space-y-6">
            <Link to="" className="flex items-center space-x-2 group w-fit">
              <Building2 className="text-brand-primary" size={32} strokeWidth={1} />
              <div className="flex flex-col">
                <h3 className="text-2xl font-serif font-semibold leading-none">MİMARİ <span className="text-brand-primary italic">Sanat</span></h3>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              {footerContent?.description || t.footer.description}
            </p>
            <div className="flex space-x-3 md:space-x-4 pt-2">
              <a href={contact?.instagramUrl || "#"} className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300" aria-label="Instagram"><Instagram size={18} /></a>
              <a href={contact?.facebookUrl || "#"} className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300" aria-label="Facebook"><Facebook size={18} /></a>
              <a href={contact?.linkedinUrl || "#"} className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-primary hover:text-white transition-all duration-300" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-white border-b border-brand-primary/30 pb-2 inline-block">{t.footer.quickLinks}</h4>
            <ul className="space-y-3">
              <li><Link to="/projects/mimarisanat" className="text-gray-400 hover:text-brand-primary text-sm transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-brand-primary rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>{t.footer.home}</Link></li>
              <li><Link to="/projects/mimarisanat/contact" className="text-gray-400 hover:text-brand-primary text-sm transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-brand-primary rounded-full mr-2 opacity-0 hover:opacity-100 transition-opacity"></span>{t.footer.contact}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6 text-white border-b border-brand-primary/30 pb-2 inline-block">{t.footer.contactInfo}</h4>
            <ul className="space-y-5">
              <li className="flex items-start space-x-3 group">
                <MapPin className="text-brand-primary mt-1 flex-shrink-0 group-hover:text-white transition-colors" size={18} />
                <span className="text-gray-400 text-sm font-light group-hover:text-gray-300 transition-colors">{contact?.address || t.footer.addressText}</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="text-brand-primary flex-shrink-0 group-hover:text-white transition-colors" size={18} />
                <span className="text-gray-400 text-sm font-light group-hover:text-gray-300 transition-colors">{contact?.phone || '0236 233 73 90'}</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="text-brand-primary flex-shrink-0 group-hover:text-white transition-colors" size={18} />
                <span className="text-gray-400 text-sm font-light group-hover:text-gray-300 transition-colors">{contact?.email || 'info@mimarisanat.com'}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Map Placeholder */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4 md:mb-6 text-white border-b border-brand-primary/30 pb-2 inline-block">{t.footer.location}</h4>
            <div className="w-full h-28 md:h-32 bg-gray-800 rounded-sm border border-gray-700 overflow-hidden group cursor-pointer hover:border-brand-primary transition-colors">
              <iframe
                src={`https://maps.google.com/maps?q=${mapLat},${mapLng}&hl=tr&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mimari Sanat Konum"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs text-center md:text-left font-light tracking-wide">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex space-x-6 md:space-x-8">
            <a href="#" className="text-gray-500 hover:text-brand-primary text-xs transition-colors">{t.footer.privacy}</a>
            <a href="#" className="text-gray-500 hover:text-brand-primary text-xs transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};