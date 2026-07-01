export interface Project {
  slug: string;
  name: string;
  name_en?: string;
  name_ar?: string;
  location: string;
  location_en?: string;
  location_ar?: string;
  category: string;
  category_en?: string;
  category_ar?: string;
  description: string;
  description_en?: string;
  description_ar?: string;
  imageUrl: string;
  imageGallery: string[];
}

export const projectsData: Project[] = [
  {
    slug: 'swiss-otel-cesme',
    name: 'Swiss Otel Resorts',
    name_en: 'Swissotel Resorts',
    name_ar: 'منتجع سويس أوتيل',
    location: 'ÇEŞME',
    location_en: 'CESME',
    location_ar: 'شيشمي',
    category: 'Otel Renovasyonu',
    category_en: 'Hotel Renovation',
    category_ar: 'تجديد الفنادق',
    description: 'Çeşme\'nin en prestijli otellerinden biri olan Swiss Otel için gerçekleştirdiğimiz kapsamlı renovasyon projesi. Modern tasarım anlayışını lüks ve konforla birleştirdik, misafir deneyimini en üst seviyeye çıkaran detaylarla mekanı yeniden yarattık. Proje, zamanında ve bütçesinde tamamlanarak teslim edilmiştir.',
    description_en: 'A comprehensive renovation project for Swissotel Cesme, one of Cesmes most prestigious hotels. We combined modern design with luxury and comfort, recreating the space with details that maximize guest experience. The project was completed on schedule and within budget.',
    description_ar: 'مشروع تجديد شامل لمنتجع سويس أوتيل، أحد أرقى الفنادق في شيشمي. لقد جمعنا بين التصميم العصري والفخامة والراحة، لإعادة ابتكار المساحة بتفاصيل ترتقي بتجربة الضيوف. تم تسليم المشروع في الوقت المحدد وضمن الميزانية.',
    imageUrl: 'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/220282/l/Swissotel-Resort---Spa-Cesme-Genel-390475.jpg',
    imageGallery: [
      'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/220282/l/Swissotel-Resort---Spa-Cesme-Genel-390475.jpg',
      'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/220282/l/Swissotel-Resort---Spa-Cesme-Genel-390459.jpg',
      'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/220282/l/Swissotel-Resort---Spa-Cesme-Genel-390473.jpg',
      'https://images.etstur.com/imgproxy/files/images/hotelImages/TR/220282/l/Swissotel-Resort---Spa-Cesme-Genel-390467.jpg',
    ]
  },
  {
    slug: 'akis-yapi',
    name: 'Akış Yapı Üretim Tesisi ve İdari Bina Projesi',
    name_en: 'Akis Yapi Production Facility & HQ Project',
    name_ar: 'مشروع مصنع ومبنى إداري Akis Yapi',
    location: 'KOCAELİ / GEBZE OSB',
    location_en: 'KOCAELI / GEBZE OSB',
    location_ar: 'كوجالي / جيبزي',
    category: 'Endüstriyel Tesis',
    category_en: 'Industrial Facility',
    category_ar: 'منشأة صناعية',
    description: 'Akış Yapı Üretim Tesisi Ve İdari Bina Projesi. Proje 2 Kat Kaset Döşeme 21.000 m2 inşaat alanı, 600 ton yapısal çelik olarak yapılmıştır. Proje 2024 yılında başarıyla tamamlanmıştır.',
    description_en: 'Akis Yapi Production Facility and Administrative Building Project. Constructed with 2 floors of waffle slab flooring, 21,000 sqm building area, and 600 tons of structural steel. Successfully completed in 2024.',
    description_ar: 'مشروع مبنى إداري ومصنع إنتاج Akis Yapi. تم تنفيذ المشروع بمساحة بناء تبلغ 21,000 متر مربع على طابقين من الأسقف المفرغة (Waffle Slab)، وباستخدام 600 طن من الهياكل الفولاذية. اكتمل بنجاح في عام 2024.',
    imageUrl: '/akis_yapi.mp4',
    imageGallery: [
      '/akis_yapi.mp4',
      '/akis_yapi_1.jpg',
      '/akis_yapi_2.jpg',
      '/akis_yapi_3.png',
      '/akis_yapi_4.png',
      '/akis_yapi_5.jpg',
      '/akis_yapi_6.jpg',
      '/akis_yapi_7.jpg',
      '/akis_yapi_8.png'
    ]
  },
  {
    slug: 'turkcell-izmir',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - İzmir',
    name_en: '2025 Turkcell White Concept Store Conversion - Izmir',
    name_ar: 'مشروع تحويل موزع تركسل المفهوم الأبيض 2025 - إزمير',
    location: 'İZMİR',
    location_en: 'IZMIR',
    location_ar: 'إزمير',
    category: 'Mağaza Konsept Tasarımı',
    category_en: 'Retail Store Concept Design',
    category_ar: 'تصميم مفهوم متاجر التجزئة',
    description: 'İzmir ilindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    description_en: 'We developed a modern and technological store concept for Turkcell stores in Izmir. With a design centering on customer experience, we created functional and inviting spaces reflecting the brand identity.',
    description_ar: 'لقد طورنا مفهوماً حديثاً وتقنياً لمتاجر تركسل في مقاطعة إزمير. من خلال تصميمنا المرتكز على تجربة العملاء، أنشأنا مساحات عملية وجذابة تعكس هوية العلامة التجارية.',
    imageUrl: '/turkcell/1.jpeg',
    imageGallery: [
      '/turkcell/1.jpeg', '/turkcell/2.jpeg', '/turkcell/3.jpeg',
      '/turkcell_ekip/1.jpg', '/turkcell_ekip/2.jpg'
    ]
  },
  {
    slug: 'turkcell-aydin',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Aydın',
    name_en: '2025 Turkcell White Concept Store Conversion - Aydin',
    name_ar: 'مشروع تحويل موزع تركسل المفهوم الأبيض 2025 - أيدين',
    location: 'AYDIN',
    location_en: 'AYDIN',
    location_ar: 'أيدين',
    category: 'Mağaza Konsept Tasarımı',
    category_en: 'Retail Store Concept Design',
    category_ar: 'تصميم مفهوم متاجر التجزئة',
    description: 'Aydın genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    description_en: 'We developed a modern and technological store concept for Turkcell stores in Aydin. With a design centering on customer experience, we created functional and inviting spaces reflecting the brand identity.',
    description_ar: 'لقد طورنا مفهوماً حديثاً وتقنياً لمتاجر تركسل في مقاطعة أيدين. من خلال تصميمنا المرتكز على تجربة العملاء، أنشأنا مساحات عملية وجذابة تعكس هوية العلامة التجارية.',
    imageUrl: '/turkcell/4.jpeg',
    imageGallery: [
      '/turkcell/4.jpeg', '/turkcell/5.jpeg', '/turkcell/6.jpeg',
      '/turkcell_ekip/3.jpg'
    ]
  },
  {
    slug: 'turkcell-manisa',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Manisa',
    name_en: '2025 Turkcell White Concept Store Conversion - Manisa',
    name_ar: 'مشروع تحويل موزع تركسل المفهوم الأبيض 2025 - مانيسا',
    location: 'MANİSA',
    location_en: 'MANISA',
    location_ar: 'مانيسا',
    category: 'Mağaza Konsept Tasarımı',
    category_en: 'Retail Store Concept Design',
    category_ar: 'تصميم مفهوم متاجر التجزئة',
    description: 'Manisa genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    description_en: 'We developed a modern and technological store concept for Turkcell stores in Manisa. With a design centering on customer experience, we created functional and inviting spaces reflecting the brand identity.',
    description_ar: 'لقد طورنا مفهوماً حديثاً وتقنياً لمتاجر تركسل في مقاطعة مانيسا. من خلال تصميمنا المرتكز على تجربة العملاء، أنشأنا مساحات عملية وجذابة تعكس هوية العلامة التجارية.',
    imageUrl: '/turkcell/7.jpeg',
    imageGallery: [
      '/turkcell/7.jpeg', '/turkcell/8.jpeg', '/turkcell/9.jpeg',
      '/turkcell_ekip/4.jpg'
    ]
  },
  {
    slug: 'turkcell-denizli',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Denizli',
    name_en: '2025 Turkcell White Concept Store Conversion - Denizli',
    name_ar: 'مشروع تحويل موزع تركسل المفهوم الأبيض 2025 - دنيزلي',
    location: 'DENİZLİ',
    location_en: 'DENIZLI',
    location_ar: 'دنيزلي',
    category: 'Mağaza Konsept Tasarımı',
    category_en: 'Retail Store Concept Design',
    category_ar: 'تصميم مفهوم متاجر التجزئة',
    description: 'Denizli genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    description_en: 'We developed a modern and technological store concept for Turkcell stores in Denizli. With a design centering on customer experience, we created functional and inviting spaces reflecting the brand identity.',
    description_ar: 'لقد طورنا مفهوماً حديثاً وتقنياً لمتاجر تركسل في مقاطعة دنيزلي. من خلال تصميمنا المرتكز على تجربة العملاء، أنشأنا مساحات عملية وجذابة تعكس هوية العلامة التجارية.',
    imageUrl: '/turkcell/11.jpeg',
    imageGallery: [
      '/turkcell/10.jpeg', '/turkcell/11.jpeg',
      '/turkcell_ekip/5.jpg'
    ]
  },
  {
    slug: 'turkcell-balikesir',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Balıkesir',
    name_en: '2025 Turkcell White Concept Store Conversion - Balikesir',
    name_ar: 'مشروع تحويل موزع تركسل المفهوم الأبيض 2025 - باليكسير',
    location: 'BALIKESİR',
    location_en: 'BALIKESIR',
    location_ar: 'باليكسير',
    category: 'Mağaza Konsept Tasarımı',
    category_en: 'Retail Store Concept Design',
    category_ar: 'تصميم مفهوم متاجر التجزئة',
    description: 'Balıkesir genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    description_en: 'We developed a modern and technological store concept for Turkcell stores in Balikesir. With a design centering on customer experience, we created functional and inviting spaces reflecting the brand identity.',
    description_ar: 'لقد طورنا مفهوماً حديثاً وتقنياً لمتاجر تركسل في مقاطعة باليكسير. من خلال تصميمنا المرتكز على تجربة العملاء، أنشأنا مساحات عملية وجذابة تعكس هوية العلامة التجارية.',
    imageUrl: '/turkcell/12.jpeg',
    imageGallery: [
      '/turkcell/12.jpeg', '/turkcell/13.jpeg'
    ]
  },
  {
    slug: 'turkcell-mugla',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Muğla',
    name_en: '2025 Turkcell White Concept Store Conversion - Mugla',
    name_ar: 'مشروع تحويل موزع تركسل المفهوم الأبيض 2025 - موغلا',
    location: 'MUĞLA',
    location_en: 'MUGLA',
    location_ar: 'موغلا',
    category: 'Mağaza Konsept Tasarımı',
    category_en: 'Retail Store Concept Design',
    category_ar: 'تصميم مفهوم متاجر التجزئة',
    description: 'Muğla genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    description_en: 'We developed a modern and technological store concept for Turkcell stores in Mugla. With a design centering on customer experience, we created functional and inviting spaces reflecting the brand identity.',
    description_ar: 'لقد طورنا مفهوماً حديثاً وتقنياً لمتاجر تركسل في مقاطعة موغلا. من خلال تصميمنا المرتكز على تجربة العملاء، أنشأنا مساحات عملية وجذابة تعكس هوية العلامة التجارية.',
    imageUrl: '/turkcell/14.jpeg',
    imageGallery: [
      '/turkcell/14.jpeg', '/turkcell/15.jpeg'
    ]
  },
  {
    slug: 'turkcell-burdur',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Burdur',
    name_en: '2025 Turkcell White Concept Store Conversion - Burdur',
    name_ar: 'مشروع تحويل موزع تركسل المفهوم الأبيض 2025 - بوردر',
    location: 'BURDUR',
    location_en: 'BURDUR',
    location_ar: 'بوردر',
    category: 'Mağaza Konsept Tasarımı',
    category_en: 'Retail Store Concept Design',
    category_ar: 'تصميم مفهوم متاجر التجزئة',
    description: 'Burdur genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    description_en: 'We developed a modern and technological store concept for Turkcell stores in Burdur. With a design centering on customer experience, we created functional and inviting spaces reflecting the brand identity.',
    description_ar: 'لقد طورنا مفهوماً حديثاً وتقنياً لمتاجر تركسل في مقاطعة بوردر. من خلال تصميمنا المرتكز على تجربة العملاء، أنشأنا مساحات عملية وجذابة تعكس هوية العلامة التجارية.',
    imageUrl: '/turkcell/16.jpeg',
    imageGallery: [
      '/turkcell/16.jpeg'
    ]
  },
  {
    slug: 'ekmas-egem',
    name: 'Ekmas Egem',
    name_en: 'Ekmas Egem Office & Showroom',
    name_ar: 'مكتب وصالة عرض إيكماس إيجيم',
    location: 'MANİSA',
    location_en: 'MANISA',
    location_ar: 'مانيسا',
    category: 'Ofis ve Showroom',
    category_en: 'Office & Showroom',
    category_ar: 'مكاتب وصالات عرض',
    description: 'Ekmas Group için Manisa\'da hayata geçirdiğimiz ofis ve showroom projesi. Kurumsal kimliği yansıtan, çalışan verimliliğini artıran ve müşteriler için etkileyici bir karşılama alanı sunan modern bir yapı inşa ettik.',
    description_en: 'An office and showroom project in Manisa built for Ekmas Group. We designed a modern structure reflecting the corporate identity, improving employee productivity, and offering an impressive welcoming space for clients.',
    description_ar: 'مشروع مكتب وصالة عرض في مانيسا تم تنفيذه لمجموعة إيكماس. لقد أنشأنا هيكلاً حديثاً يعكس الهوية المؤسسية، ويزيد من إنتاجية الموظفين، ويقدم مساحة استقبال رائعة للعملاء.',
    imageUrl: '/egem_ekmas/1.jpeg',
    imageGallery: [
      '/egem_ekmas/1.jpeg', '/egem_ekmas/2.jpeg', '/egem_ekmas/3.jpeg', '/egem_ekmas/4.jpeg',
      '/egem_ekmas/5.jpeg', '/egem_ekmas/6.jpeg', '/egem_ekmas/7.jpeg', '/egem_ekmas/8.jpeg',
      '/egem_ekmas/9.jpeg', '/egem_ekmas/10.jpeg', '/egem_ekmas/11.jpeg', '/egem_ekmas/12.jpeg',
      '/egem_ekmas/13.jpeg', '/egem_ekmas/14.jpeg', '/egem_ekmas/15.jpeg', '/egem_ekmas/16.jpeg',
      '/egem_ekmas/17.jpeg'
    ]
  },
  {
    slug: 'sunexpress-apron',
    name: 'SunExpress Apron Ekbina',
    name_en: 'SunExpress Apron Extension Building',
    name_ar: 'المبنى الملحق لساحة طائرات SunExpress',
    location: 'İZMİR',
    location_en: 'IZMIR',
    location_ar: 'إزمير',
    category: 'Endüstriyel Tesis',
    category_en: 'Industrial Facility',
    category_ar: 'منشأة صناعية',
    description: 'SunExpress Havayolları için İzmir Adnan Menderes Havalimanı\'nda inşa ettiğimiz apron ek binası. Operasyonel verimliliği artırmaya yönelik, yüksek güvenlik standartlarına sahip, fonksiyonel bir endüstriyel tesisi başarıyla tamamladık.',
    description_en: 'Apron extension building constructed for SunExpress Airlines at Izmir Adnan Menderes Airport. Successfully completed a functional industrial facility focused on operational efficiency with high security standards.',
    description_ar: 'مبنى ملحق بساحة الطائرات تم بناؤه لصالح شركة طيران SunExpress في مطار إزمير عدنان مندريس. لقد نجحنا في إكمال منشأة صناعية عملية ذات معايير أمنية عالية لزيادة الكفاءة التشغيلية.',
    imageUrl: '/3.jpg',
    imageGallery: [
      '/3.jpg',
      'https://pbs.twimg.com/media/F8f-J9rXEAACi-F.jpg',
      'https://www.airporthaber.com/wk-uploads/news/sunexpress1_15.jpg',
    ]
  },
  {
    slug: 'yfs-modern',
    name: 'YFS Modern',
    name_en: 'YFS Modern Housing Project',
    name_ar: 'مشروع YFS Modern السكني',
    location: 'AYDIN',
    location_en: 'AYDIN',
    location_ar: 'أيدين',
    category: 'Konut Projesi',
    category_en: 'Residential Project',
    category_ar: 'مشروع سكني',
    description: 'Aydın\'da geliştirdiğimiz YFS Modern konut projesi. Çağdaş mimari, konforlu yaşam alanları ve sosyal donatıları bir araya getirerek, bölgeye değer katan, modern bir yaşam merkezi oluşturduk.',
    description_en: 'YFS Modern residential housing project developed in Aydin. Combining contemporary architecture, comfortable living spaces, and social amenities, we created a modern living center that adds value to the region.',
    description_ar: 'مشروع YFS Modern السكني الذي قمنا بتطويره في أيدين. من خلال الجمع بين العمارة المعاصرة والمساحات السكنية المريحة والمرافق الاجتماعية، أنشأنا مركز حياة حديث يضيف قيمة للمنطقة.',
    imageUrl: '/yfs_modern_thumbnail.jpg',
    imageGallery: [
      '/yfs_modern_thumbnail.jpg',
      '/yfs_modern/1.jpeg', '/yfs_modern/2.jpeg', '/yfs_modern/3.jpeg', '/yfs_modern/4.jpeg',
      '/yfs_modern/5.jpeg', '/yfs_modern/6.jpeg', '/yfs_modern/7.jpeg', '/yfs_modern/8.jpeg',
      '/yfs_modern/9.jpeg', '/yfs_modern/10.jpeg', '/yfs_modern/11.jpeg', '/yfs_modern/12.jpeg',
      '/yfs_modern/13.jpeg', '/yfs_modern/14.jpeg', '/yfs_modern/15.jpeg', '/yfs_modern/16.jpeg',
      '/yfs_modern/17.jpeg', '/yfs_modern/18.jpeg', '/yfs_modern/19.jpeg', '/yfs_modern/20.jpeg'
    ]
  },
  {
    slug: 'kagithane-metro',
    name: 'Kağıthane Metro İnşaatı İnce İşler',
    name_en: 'Kağıthane Metro Station Interior Finishing',
    name_ar: 'تشطيبات محطة مترو كاجيثانه',
    location: 'İSTANBUL',
    location_en: 'ISTANBUL',
    location_ar: 'إسطنبول',
    category: 'Altyapı & Metro İnşaatı',
    category_en: 'Infrastructure & Metro Construction',
    category_ar: 'البنية التحتية وإنشاء المترو',
    description: 'İstanbul Kağıthane Metro İstasyonu projesinin ince işçilik, tavan, duvar ve dekoratif detay çalışmalarını kapsayan proje yönetim ve uygulama işidir.',
    description_en: 'Project management and implementation work covering interior finishing, ceiling, wall, and decorative details of the Istanbul Kagithane Metro Station project.',
    description_ar: 'أعمال إدارة المشاريع والتنفيذ التي تغطي التشطيبات الداخلية، والأسقف، والجدران، والتفاصيل الزخرفية لمشروع محطة مترو كاجيثانه في إسطنبول.',
    imageUrl: '/kagithane_metro/main.jpg',
    imageGallery: [
      '/kagithane_metro/main.jpg'
    ]
  },
  {
    slug: 'cesme-boyalik-kumsal',
    name: 'Çeşme Boyalık Kumsal Projesi',
    name_en: 'Cesme Boyalik Beach Landscaping Project',
    name_ar: 'مشروع لاندسكيب شاطئ بوياليك في شيشمي',
    location: 'ÇEŞME / İZMİR',
    location_en: 'CESME / IZMIR',
    location_ar: 'شيشمي / إزمير',
    category: 'Peyzaj & Çevre Düzenleme',
    category_en: 'Landscaping & Environmental Design',
    category_ar: 'تنسيق الحدائق والتصميم البيئي',
    description: 'Çeşme Boyalık Kumsal bölgesinde kıyı ve sahil alanlarının doğal dokusuna uygun peyzaj, plaj düzenlemesi ve rekreasyon alanı tasarımı projesidir.',
    description_en: 'Landscape design, beach arrangement, and recreation area project matching the natural texture of coastal and beach areas in the Cesme Boyalik beach region.',
    description_ar: 'مشروع تصميم لاندسكيب وترتيب شاطئ ومنطقة ترفيهية تناسب النسيج الطبيعي للمناطق الساحلية في منطقة شاطئ بوياليك في شيشمي.',
    imageUrl: '/sw1.jpg',
    imageGallery: [
      '/sw1.jpg',
      '/sw2.jpg',
      '/Swissotel-Resort---Spa-Cesme-Genel-390458.jpg',
      '/Swissotel-Resort---Spa-Cesme-Genel-390459.jpg'
    ]
  }
];
