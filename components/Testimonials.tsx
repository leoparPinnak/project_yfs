import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const testimonialsData = [
  {
    quote: "YFS İnşaat, otelimizin renovasyon projesinde beklentilerimizin çok ötesine geçti. Profesyonellikleri ve kaliteye verdikleri önem projeye inanılmaz bir değer kattı.",
    quote_en: "YFS Construction went far beyond our expectations in our hotel's renovation project. Their professionalism and commitment to quality added incredible value to the project.",
    quote_ar: "ذهبت YFS للإنشاءات إلى ما هو أبعد بكثير من توقعاتنا في مشروع تجديد فندقنا. لقد أضافت احترافيتهم والتزامهم بالجودة قيمة لا تصدق للمشروع.",
    name: 'Ayşe Yılmaz',
    title: 'Genel Müdür, Swiss Otel',
    title_en: 'General Manager, Swissotel',
    title_ar: 'المدير العام، سويس أوتيل',
    avatar: 'https://picsum.photos/100/100?random=1',
  },
  {
    quote: "Süreç boyunca iletişim harikaydı. Sonuç hem estetik olarak çarpıcı hem de son derece fonksiyonel. Kurumsal ofisimiz için harika bir iş çıkardılar.",
    quote_en: "The communication was great throughout the process. The result is both aesthetically stunning and highly functional. They did a fantastic job for our corporate office.",
    quote_ar: "كان التواصل رائعاً طوال العملية. النتيجة مذهلة جمالياً وعملية للغاية. لقد قاموا بعمل رائع لمكتبنا المؤسسي.",
    name: 'Mehmet Kaya',
    title: 'Proje Yöneticisi, Turkcell',
    title_en: 'Project Manager, Turkcell',
    title_ar: 'مدير المشروع، تركسل',
    avatar: 'https://picsum.photos/100/100?random=2',
  },
  {
    quote: "Turkcell Beyaz Konsept Dönüşüm Projesi kapsamında bayimizin inşaat sürecini başarıyla tamamlayan firma sahipleri Yiğit Bey ve Erhan Bey’e, Şantiye Şefi Ulaş Bey’e ve tüm YFS YAPI İNŞAAT ailesine; kontrollü, düzenli ve disiplinli çalışma anlayışları ile süreci titizlikle yönetmeleri ve iş bitiricilikleri için teşekkürlerimizi sunarız.",
    quote_en: "We express our gratitude to company owners Mr. Yigit and Mr. Erhan, Site Chief Mr. Ulas, and the entire YFS Construction family, who successfully completed the construction process of our retail store under the Turkcell White Concept Conversion Project, for their controlled, organized, and disciplined work ethic.",
    quote_ar: "نعرب عن امتناننا لمالكي الشركة السيد يغيت والسيد إرهان، ورئيس الموقع السيد أولاش، وعائلة YFS بأكملها، الذين أكملوا بنجاح عملية بناء متجرنا بموجب مشروع تحويل مفهوم موزع تركسل الأبيض، على أخلاقيات عملهم المنظمة والمنضبطة.",
    name: 'Yeşim Saraçoğlu',
    title: 'Bayi Müdürü, Kafkas Bilişim',
    title_en: 'Dealer Manager, Kafkas Bilisim',
    title_ar: 'مدير الموزع، كافكاس للمعلوماتية',
    avatar: 'https://picsum.photos/100/100?random=11',
  },
  {
    quote: "Modern ve kullanıcı dostu bir mağaza konseptine ihtiyacımız vardı ve tam olarak istediğimizi aldık. Müşterilerimiz yeni mağazamızı çok sevdi.",
    quote_en: "We needed a modern and user-friendly store concept and got exactly what we wanted. Our customers love our new store.",
    quote_ar: "كنا بحاجة إلى مفهوم متجر حديث وسهل الاستخدام وحصلنا على ما أردناه تماماً. يحب عملاؤنا متجرنا الجديد.",
    name: 'Esra Pınar Eker',
    title: 'Şantiye Şefi, Ekmas',
    title_en: 'Site Chief, Ekmas',
    title_ar: 'رئيس الموقع، إيكماس',
    avatar: 'https://picsum.photos/100/100?random=12',
  },
  {
    quote: "Mağazamız dönüşüm kapsamında inşaat sürecini profesyonel bir şekilde tamamlayan firma sahipleri Yiğit bey ve Erhan bey’e aynı zamanda şantiye şefi Ulaş beye ve tüm YFS YAPI bünyesinde çalışan tüm ekibe, süreç boyunca profesyonel şekilde çalışıp, titizlikle göstermiş oldukları iş ahlak ve düzeni için teşekkür ederim.",
    quote_en: "I would like to thank company owners Mr. Yigit and Mr. Erhan, as well as Site Chief Mr. Ulas and the entire team working within YFS Construction, who professionally completed the construction process of our store under the conversion project, for their work ethic and organization.",
    quote_ar: "أود أن أشكر مالكي الشركة السيد يغيت والسيد إرهان، وكذلك رئيس الموقع السيد أولاش والفريق بأكمله العامل في YFS للإنشاءات، الذين أكملوا عملية بناء متجرنا باحترافية، على أخلاقيات العمل والالتزام.",
    name: 'Ali Gürbüz',
    title: 'Mağaza Müdürü, Beren Teknoloji',
    title_en: 'Store Manager, Beren Technology',
    title_ar: 'مدير المتجر، بيرين للتكنولوجيا',
    avatar: 'https://picsum.photos/100/100?random=13',
  },
  {
    quote: "Proje yönetimi konusundaki uzmanlıkları sayesinde, karmaşık lojistik merkezimiz tam zamanında ve bütçemizi aşmadan tamamlandı. Kesinlikle tekrar çalışacağız.",
    quote_en: "Thanks to their expertise in project management, our complex logistics center was completed on time and within budget. We will definitely work together again.",
    quote_ar: "بفضل خبرتهم في إدارة المشاريع، تم إكمال مركزنا اللوجستي المعقد في الوقت المحدد وضمن الميزانية. سنعمل بالتأكيد معاً مرة أخرى.",
    name: 'Ali Vural',
    title: 'Teknik Ekip Müdürü, SunExpress',
    title_en: 'Technical Team Manager, SunExpress',
    title_ar: 'مدير الفريق الفني، صن إكسبريس',
    avatar: 'https://picsum.photos/100/100?random=4',
  },
  {
    quote: "Yeni ofisimiz hem çalışanlarımızın motivasyonunu artırdı hem de marka imajımızı güçlendirdi. Yaratıcı ve fonksiyonel tasarımları için YFS İnşaat'a teşekkür ederiz.",
    quote_en: "Our new office has boosted employee motivation and strengthened our brand image. Thanks to YFS Construction for their creative and functional designs.",
    quote_ar: "لقد عزز مكتبنا الجديد من تحفيز الموظفين وعزز صورة علامتنا التجارية. شكراً لـ YFS للإنشاءات على تصاميمهم الإبداعية والعملية.",
    name: 'Yakup Yücel',
    title: 'Proje Müdürü, BLT',
    title_en: 'Project Manager, BLT',
    title_ar: 'مدير المشروع، بي إل تي',
    avatar: 'https://picsum.photos/100/100?random=15',
  },
  {
    quote: "Tadilat sürecinin bu kadar sorunsuz geçeceğini tahmin etmiyordum. Ekip her zaman ulaşılabilirdi ve tüm sorularımıza sabırla cevap verdi. Sonuç mükemmel oldu.",
    quote_en: "I did not expect the renovation process to go so smoothly. The team was always accessible and answered all our questions patiently. The result was perfect.",
    quote_ar: "لم أتوقع أن تسير عملية التجديد بسلاسة تامة. كان الفريق متاحاً دائماً وأجاب على جميع أسئلتنا بصبر. كانت النتيجة ممتازة.",
    name: 'Zeynep Aksoy',
    title: 'Mağaza Sahibi, Yerel Butik',
    title_en: 'Store Owner, Local Boutique',
    title_ar: 'صاحبة متجر، بوتيك محلي',
    avatar: 'https://picsum.photos/100/100?random=7',
  }
];

const extendedTestimonials = [...testimonialsData, ...testimonialsData];

const Testimonials: React.FC = () => {
  const { theme } = useTheme();
  const { t, language, isRtl } = useLanguage();

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-stone-900 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 font-sans">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white dark:font-display dark:font-normal">
            {t('testimonials_title')}
          </h2>
          <p className="mt-4 text-lg text-slate-500 dark:text-stone-400 max-w-2xl mx-auto font-light">
            {t('testimonials_desc')}
          </p>
        </div>
        <div className="testimonial-slider">
          <div className={`testimonial-track ${isRtl ? 'flex-row-reverse' : ''}`}>
            {extendedTestimonials.map((testimonial, index) => {
              const localizedQuote = language === 'en' && testimonial.quote_en ? testimonial.quote_en : (language === 'ar' && testimonial.quote_ar ? testimonial.quote_ar : testimonial.quote);
              const localizedTitle = language === 'en' && testimonial.title_en ? testimonial.title_en : (language === 'ar' && testimonial.title_ar ? testimonial.title_ar : testimonial.title);
              
              return (
                <div key={index} className={`testimonial-slide bg-white dark:bg-stone-950 rounded-xl border border-gray-200 dark:border-stone-850 shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <svg className={`w-10 h-10 ${theme === 'dark' ? 'text-brand-primary' : 'text-indigo-500'} mb-4 ${isRtl ? 'mr-0 ml-auto' : ''}`} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M9.33 6.984h5.328l-2.656 7.968h-5.328l2.656-7.968zM22.016 6.984h5.328l-2.656 7.968h-5.328l2.656-7.968zM29.332 14.952c-1.472 4.416-4.416 8.272-8.272 8.272-2.096 0-3.152-1.056-3.152-3.152 0-2.64 3.152-7.392 3.152-7.392s-2.096 4.208-2.096 6.32c0 2.096 1.056 4.208 4.208 4.208 3.152 0 5.248-3.152 6.848-7.392-1.040-0.512-1.040-1.040-0.704-1.584zM16.656 14.952c-1.472 4.416-4.416 8.272-8.272 8.272-2.096 0-3.152-1.056-3.152-3.152 0-2.64 3.152-7.392 3.152-7.392s-2.096 4.208-2.096 6.32c0 2.096 1.056 4.208 4.208 4.208 3.152 0 5.248-3.152 6.848-7.392-1.040-0.512-1.040-1.040-0.704-1.584z"></path>
                      </svg>
                      <p className="text-slate-600 dark:text-stone-300 italic font-light text-sm md:text-base leading-relaxed">"{localizedQuote}"</p>
                    </div>
                    <div className={`mt-8 flex items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <img className="h-12 w-12 rounded-full border dark:border-stone-800" src={testimonial.avatar} alt={testimonial.name} />
                      <div className={isRtl ? 'mr-4 ml-0 text-right' : 'ml-4 mr-0 text-left'}>
                        <div className="font-bold text-slate-900 dark:text-stone-100 dark:font-serif dark:font-medium">{testimonial.name}</div>
                        <div className="text-slate-500 dark:text-stone-500 text-xs font-light">{localizedTitle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;