import React from 'react';
import { ClockIcon, ShieldCheckIcon, UsersIcon, BriefcaseIcon } from './IconComponents';

const featuresData = [
  {
    icon: <ClockIcon className="h-10 w-10 text-indigo-500" aria-hidden="true" />,
    title: 'Zamanında Teslimat',
    description: 'Proje takvimlerinize sadık kalarak, işlerinizin aksamadan devam etmesini sağlıyoruz ve projelerinizi zamanında tamamlıyoruz.',
  },
  {
    icon: <ShieldCheckIcon className="h-10 w-10 text-indigo-500" aria-hidden="true" />,
    title: 'Yüksek Kalite Standartları',
    description: 'En kaliteli malzemeler ve usta işçilikle, mekanlarınıza uzun ömürlü ve estetik çözümler sunuyoruz.',
  },
  {
    icon: <UsersIcon className="h-10 w-10 text-indigo-500" aria-hidden="true" />,
    title: 'Müşteri Odaklı Yaklaşım',
    description: 'Sürecin her aşamasında sizinle şeffaf bir iletişim kurarak, ihtiyaçlarınıza en uygun çözümleri üretiyoruz.',
  },
  {
    icon: <BriefcaseIcon className="h-10 w-10 text-indigo-500" aria-hidden="true" />,
    title: 'Uzman Ekip',
    description: 'Deneyimli uzmanlarımızla, her projede en iyi sonuçları garanti ediyoruz.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Neden YFS İnşaat?
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Deneyim, kalite ve güveni bir araya getirerek kurumsal projelerinize değer katıyoruz.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-gray-200 hover:border-indigo-500 focus:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
              <p className="text-slate-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;