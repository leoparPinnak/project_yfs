import React from 'react';
import { CompassIcon, ClipboardListIcon, BuildingOfficeIcon, KeyIcon } from './IconComponents';

const servicesData = [
  {
    icon: <CompassIcon className="h-10 w-10 text-indigo-500" aria-hidden="true" />,
    title: 'Mühendislik & Danışmanlık',
    description: 'Projenizin her aşamasında, fizibiliteden tasarıma, en verimli ve yenilikçi mühendislik çözümleri sunuyoruz.',
  },
  {
    icon: <ClipboardListIcon className="h-10 w-10 text-indigo-500" aria-hidden="true" />,
    title: 'Proje Yönetimi',
    description: 'Bütçe, zaman ve kalite hedeflerinize sadık kalarak projelerinizi baştan sona profesyonel bir şekilde yönetiyoruz.',
  },
  {
    icon: <BuildingOfficeIcon className="h-10 w-10 text-indigo-500" aria-hidden="true" />,
    title: 'Kurumsal Tadilat',
    description: 'Ofis, mağaza ve diğer ticari alanlarınızı, marka kimliğinize uygun, modern ve fonksiyonel mekanlara dönüştürüyoruz.',
  },
  {
    icon: <KeyIcon className="h-10 w-10 text-indigo-500" aria-hidden="true" />,
    title: 'Anahtar Teslim Projeler',
    description: 'Fikirden uygulamaya, tüm süreci üstlenerek size sadece anahtarı teslim almanın konforunu yaşatıyoruz.',
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Hizmetlerimiz
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Kurumsal ihtiyaçlarınıza yönelik sunduğumuz profesyonel çözümlerle projelerinize değer katıyoruz.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl border border-gray-200 hover:border-indigo-500 focus:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{service.title}</h3>
              <p className="text-slate-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
