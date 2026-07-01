
import React from 'react';

const testimonialsData = [
  {
    quote: "YFS İnşaat, otelimizin renovasyon projesinde beklentilerimizin çok ötesine geçti. Profesyonellikleri ve kaliteye verdikleri önem projeye inanılmaz bir değer kattı.",
    name: 'Ayşe Yılmaz',
    title: 'Genel Müdür, Swiss Otel',
    avatar: 'https://picsum.photos/100/100?random=1',
  },
  {
    quote: "Süreç boyunca iletişim harikaydı. Sonuç hem estetik olarak çarpıcı hem de son derece fonksiyonel. Kurumsal ofisimiz için harika bir iş çıkardılar.",
    name: 'Mehmet Kaya',
    title: 'Proje Yöneticisi, Turkcell',
    avatar: 'https://picsum.photos/100/100?random=2',
  },
  {
    quote: "Turkcell Beyaz Konsept Dönüşüm Projesi kapsamında bayimizin inşaat sürecini başarıyla tamamlayan firma sahipleri Yiğit Bey ve Erhan Bey’e, Şantiye Şefi Ulaş Bey’e ve tüm YFS YAPI İNŞAAT ailesine; kontrollü, düzenli ve disiplinli çalışma anlayışları ile süreci titizlikle yönetmeleri ve iş bitiricilikleri için teşekkürlerimizi sunarız.",
    name: 'Yeşim Saraçoğlu',
    title: 'Bayi Müdürü, Kafkas Bilişim',
    avatar: 'https://picsum.photos/100/100?random=11',
  },
  {
    quote: "Modern ve kullanıcı dostu bir mağaza konseptine ihtiyacımız vardı ve tam olarak istediğimizi aldık. Müşterilerimiz yeni mağazamızı çok sevdi.",
    name: 'Esra Pınar Eker',
    title: 'Şantiye Şefi, Ekmas',
    avatar: 'https://picsum.photos/100/100?random=12',
  },
  {
    quote: "Mağazamız dönüşüm kapsamında inşaat sürecini profesyonel bir şekilde tamamlayan firma sahipleri Yiğit bey ve Erhan bey’e aynı zamanda şantiye şefi Ulaş beye ve tüm YFS YAPI bünyesinde çalışan tüm ekibe, süreç boyunca profesyonel şekilde çalışıp, titizlikle göstermiş oldukları iş ahlak ve düzeni için teşekkür ederim.",
    name: 'Ali Gürbüz',
    title: 'Mağaza Müdürü, Beren Teknoloji',
    avatar: 'https://picsum.photos/100/100?random=13',
  },
  {
    quote: "Proje yönetimi konusundaki uzmanlıkları sayesinde, karmaşık lojistik merkezimiz tam zamanında ve bütçemizi aşmadan tamamlandı. Kesinlikle tekrar çalışacağız.",
    name: 'Ali Vural',
    title: 'Teknik Ekip Müdürü, SunExpress',
    avatar: 'https://picsum.photos/100/100?random=4',
  },
  {
    quote: "Yeni ofisimiz hem çalışanlarımızın motivasyonunu artırdı hem de marka imajımızı güçlendirdi. Yaratıcı ve fonksiyonel tasarımları için YFS İnşaat'a teşekkür ederiz.",
    name: 'Yakup Yücel',
    title: 'Proje Müdürü, BLT',
    avatar: 'https://picsum.photos/100/100?random=15',
  },
  {
    quote: "Tadilat sürecinin bu kadar sorunsuz geçeceğini tahmin etmiyordum. Ekip her zaman ulaşılabilirdi ve tüm sorularımıza sabırla cevap verdi. Sonuç mükemmel oldu.",
    name: 'Zeynep Aksoy',
    title: 'Mağaza Sahibi, Yerel Butik',
    avatar: 'https://picsum.photos/100/100?random=7',
  }
];

const extendedTestimonials = [...testimonialsData, ...testimonialsData];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Başarı hikayelerimiz, memnun müşterilerimizin sözleriyle anlatılıyor.
          </p>
        </div>
        <div className="testimonial-slider">
          <div className="testimonial-track">
            {extendedTestimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-slide bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <svg className="w-10 h-10 text-indigo-500 mb-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                      <path d="M9.33 6.984h5.328l-2.656 7.968h-5.328l2.656-7.968zM22.016 6.984h5.328l-2.656 7.968h-5.328l2.656-7.968zM29.332 14.952c-1.472 4.416-4.416 8.272-8.272 8.272-2.096 0-3.152-1.056-3.152-3.152 0-2.64 3.152-7.392 3.152-7.392s-2.096 4.208-2.096 6.32c0 2.096 1.056 4.208 4.208 4.208 3.152 0 5.248-3.152 6.848-7.392-1.040-0.512-1.040-1.040-0.704-1.584zM16.656 14.952c-1.472 4.416-4.416 8.272-8.272 8.272-2.096 0-3.152-1.056-3.152-3.152 0-2.64 3.152-7.392 3.152-7.392s-2.096 4.208-2.096 6.32c0 2.096 1.056 4.208 4.208 4.208 3.152 0 5.248-3.152 6.848-7.392-1.040-0.512-1.040-1.040-0.704-1.584z"></path>
                    </svg>
                    <p className="text-slate-600 italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-8 flex items-center">
                    <img className="h-12 w-12 rounded-full" src={testimonial.avatar} alt={testimonial.name} />
                    <div className="ml-4">
                      <div className="font-bold text-slate-900">{testimonial.name}</div>
                      <div className="text-slate-500 text-sm">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;