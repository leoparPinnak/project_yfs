
import React from 'react';
import { EyeIcon, RocketLaunchIcon, LinkedInIcon } from '../components/IconComponents';

const teamData = [
  {
    name: 'Yiğıt Fırat Sekitmez',
    title: 'İnşaat Yüksek Mühendisi & Kurucu ',
    imageUrl: 'https://media.licdn.com/dms/image/v2/C4D03AQG3zFTQkgPrxw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1634477186403?e=1764806400&v=beta&t=wpnsA5NvMMk4f3UDUMQVM9k5wmYoaxJdQmV9Hno49iA',
    linkedinUrl: 'https://www.linkedin.com/in/yi%C4%9Fit-f%C4%B1rat-sekitmez-523606128/',
  },
  {
    name: 'Erhan Altun',
    title: 'Kurucu Ortak & Genel Müdür',
    imageUrl: 'https://www.yfsinsaat.com/public/erhan.jpg',
    linkedinUrl: 'https://www.linkedin.com/',
  },
  {
    name: 'Ulaş Can Yücel',
    title: 'Şantiye Şefi',
    imageUrl: 'https://media.licdn.com/dms/image/v2/D4D03AQFLREtKKmwtgA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1726856409176?e=1764806400&v=beta&t=KISC7sD1A-st2mWGMRJB546jbKXgvIE2pTWPEOcBQGw',
    linkedinUrl: 'https://www.linkedin.com/in/canyucelulas/',
  },
  
];

const AboutPage: React.FC = () => {
    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <section
                className="relative h-[50vh] flex items-center justify-center text-white bg-cover bg-center"
                style={{ backgroundImage: `url('https://www.yfsinsaat.com/public/22.png')` }}
                aria-label="Modern bir şantiye alanı"
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg">
                        Hakkımızda
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
                        Yenilikçi vizyon, sağlam mühendislik ve sarsılmaz dürüstlükle geleceği inşa ediyoruz.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <article className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Story Section */}
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Bizim Hikayemiz</h2>
                        <img src="https://www.yfsinsaat.com/public/yfs1.png" alt="YFS İnşaat Logosu" className="h-20 w-auto mx-auto mb-6" />
                        <div className="prose prose-lg max-w-none text-slate-600 text-left sm:text-justify">
                            <p>
                                <strong>YFS İnşaat</strong>, kurucusu İnşaat Yüksek Mühendisi <strong>Yiğit Fırat Sekitmez</strong>'in adının baş harflerinden doğmuştur. Bu isim, sadece bir kısaltma değil, aynı zamanda temel değerlerimizi de simgeler: <strong>Yenilikçi</strong> yaklaşımlar, <strong>Fonksiyonel</strong> çözümler ve <strong>Sağlam</strong> yapılar.
                            </p>
                            <p>
                                Sektördeki uzun yıllara dayanan tecrübemizi, genç ve dinamik bir bakış açısıyla birleştirerek, her projeye özel, butik ve sonuç odaklı çözümler üretiyoruz. Kurumsal tadilattan anahtar teslim projelere kadar geniş bir yelpazede, müşterilerimizin hayallerini somut gerçeklere dönüştürmek için çalışıyoruz. Bizim için her proje, altına imzamızı atmaktan gurur duyduğumuz bir eserdir.
                            </p>
                        </div>
                    </div>

                    {/* Vision & Mission Section */}
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                             <div className="flex items-center text-2xl font-bold text-slate-900 mb-4">
                                <EyeIcon className="h-8 w-8 text-indigo-500 mr-3 flex-shrink-0" />
                                Vizyonumuz
                            </div>
                            <p className="text-slate-600">
                                İnşaat sektöründe kalite, güven ve estetiği bir araya getiren, yenilikçi çözümleriyle bölgesel bir lider olmak ve sürdürülebilir yapılarla geleceğe kalıcı değerler bırakmak.
                            </p>
                        </div>
                        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                             <div className="flex items-center text-2xl font-bold text-slate-900 mb-4">
                                <RocketLaunchIcon className="h-8 w-8 text-indigo-500 mr-3 flex-shrink-0" />
                                Misyonumuz
                            </div>
                             <p className="text-slate-600">
                                Müşteri memnuniyetini en üst düzeyde tutarak, modern mühendislik tekniklerini ve teknolojiyi kullanarak, her projeyi zamanında, bütçesinde ve beklenen kalitenin üzerinde tamamlamak.
                            </p>
                        </div>
                    </div>
                </div>
            </article>
            
            {/* Team Section */}
            <section id="team" className="py-20 bg-gray-50">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                    Ekibimizle Tanışın
                  </h2>
                  <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                    Projelerinizin arkasındaki deneyimli ve tutkulu gücümüz.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamData.map((member) => (
                    <div 
                      key={member.name} 
                      className="group text-center bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-2 shadow-sm hover:shadow-xl"
                    >
                      <div className="relative inline-block">
                        <img 
                          src={member.imageUrl} 
                          alt={`${member.name} portresi`}
                          className="w-36 h-36 rounded-full mx-auto mb-4 object-cover border-4 border-white group-hover:border-indigo-200 transition-colors duration-300" 
                        />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                      <p className="text-indigo-500 font-medium mb-4">{member.title}</p>
                      {member.linkedinUrl && (
                        <a 
                          href={member.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-slate-400 hover:text-indigo-600 transition-colors duration-300"
                          aria-label={`${member.name}'s LinkedIn Profili`}
                        >
                          <LinkedInIcon className="h-6 w-6 mx-auto" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>
        </div>
    );
};
export default AboutPage;
