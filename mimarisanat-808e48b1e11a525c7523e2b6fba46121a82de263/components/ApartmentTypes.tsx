import React from 'react';
import { Maximize2, ArrowRight, Bed, Bath } from 'lucide-react';
import { Reveal } from './Reveal';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

interface ApartmentCardProps {
  title: string;
  type: string;
  size: string;
  image: string;
  features: { beds: number; baths: number };
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ title, type, size, image, features }) => {
  const { t } = useTranslation();

  return (
    <div className="group relative bg-white dark:bg-stone-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-stone-700 top-0 hover:-top-2">
      <div className="relative h-56 md:h-64 overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-brand-dark/0 transition-colors z-10"></div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-20 bg-white/90 dark:bg-stone-900/90 backdrop-blur text-brand-dark dark:text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs font-bold tracking-wider shadow-sm">
          {size}
        </div>
      </div>

      <div className="p-5 md:p-6 lg:p-8">
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <div>
            <span className="text-brand-primary text-xs font-bold uppercase tracking-widest mb-1 block">{type}</span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-800 dark:text-white group-hover:text-brand-primary transition-colors">{title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6 mb-4 md:mb-6 text-gray-500 dark:text-stone-400 text-sm">
          <div className="flex items-center gap-2">
            <Bed size={18} />
            <span>{features.beds} {t.apartments.bedrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={18} />
            <span>{features.baths} {t.apartments.bathrooms}</span>
          </div>
        </div>

        <div className="pt-4 md:pt-6 border-t border-gray-100 dark:border-stone-700 flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-stone-500 font-medium">{t.apartments.detailedPlan}</span>
          <Link to="/project" className="w-11 h-11 md:w-10 md:h-10 rounded-full bg-slate-100 dark:bg-stone-700 group-hover:bg-brand-primary flex items-center justify-center text-slate-600 dark:text-stone-300 group-hover:text-white transition-all duration-300" aria-label="Detaylı plan görüntüle">
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};


export const ApartmentTypes: React.FC = () => {
  const { t } = useTranslation();

  const apartments = [
    {
      title: t.apartments.comfortSuite,
      type: t.apartments.type21,
      size: "115 m²",
      image: "/mimarisanatt/post_1/image_1.jpg",
      features: { beds: 2, baths: 1 }
    },
    {
      title: t.apartments.familyDeluxe,
      type: t.apartments.type31,
      size: "145 m²",
      image: "/mimarisanatt/post_2/image_1.jpg",
      features: { beds: 3, baths: 2 }
    },
    {
      title: t.apartments.grandDuplex,
      type: t.apartments.type41,
      size: "210 m²",
      image: "/mimarisanatt/post_3/image_1.jpg",
      features: { beds: 4, baths: 3 }
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-50 dark:bg-stone-900 relative transition-colors duration-500">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100/50 dark:bg-stone-800/20 -z-0 skew-x-12 transform translate-x-20 hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center mb-12 md:mb-14 lg:mb-16">
            <span className="text-brand-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">{t.apartments.badge}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4 md:mb-6">{t.apartments.title}</h2>
            <p className="text-gray-600 dark:text-stone-300 max-w-2xl mx-auto text-base md:text-lg font-light px-4 md:px-0">
              {t.apartments.description}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {apartments.map((apt, idx) => (
            <Reveal key={idx} delay={idx * 200}>
              <ApartmentCard {...apt} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};