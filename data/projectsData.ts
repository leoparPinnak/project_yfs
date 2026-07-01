export interface Project {
  slug: string;
  name: string;
  location: string;
  category: string;
  description: string;
  imageUrl: string;
  imageGallery: string[];
}

export const projectsData: Project[] = [
  {
    slug: 'swiss-otel-cesme',
    name: 'Swiss Otel Resorts',
    location: 'ÇEŞME',
    category: 'Otel Renovasyonu',
    description: 'Çeşme\'nin en prestijli otellerinden biri olan Swiss Otel için gerçekleştirdiğimiz kapsamlı renovasyon projesi. Modern tasarım anlayışını lüks ve konforla birleştirdik, misafir deneyimini en üst seviyeye çıkaran detaylarla mekanı yeniden yarattık. Proje, zamanında ve bütçesinde tamamlanarak teslim edilmiştir.',
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
    location: 'KOCAELİ / GEBZE OSB',
    category: 'Endüstriyel Tesis',
    description: 'Akış Yapı Üretim Tesisi Ve İdari Bina Projesi. Proje 2 Kat Kaset Döşeme 21.000 m2 inşaat alanı, 600 ton yapısal çelik olarak yapılmıştır. Proje 2024 yılında başarıyla tamamlanmıştır.',
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
    location: 'İZMİR',
    category: 'Mağaza Konsept Tasarımı',
    description: 'İzmir ilindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    imageUrl: '/turkcell/1.jpeg',
    imageGallery: [
      '/turkcell/1.jpeg', '/turkcell/2.jpeg', '/turkcell/3.jpeg',
      '/turkcell_ekip/1.jpg', '/turkcell_ekip/2.jpg'
    ]
  },
  {
    slug: 'turkcell-aydin',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Aydın',
    location: 'AYDIN',
    category: 'Mağaza Konsept Tasarımı',
    description: 'Aydın genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    imageUrl: '/turkcell/4.jpeg',
    imageGallery: [
      '/turkcell/4.jpeg', '/turkcell/5.jpeg', '/turkcell/6.jpeg',
      '/turkcell_ekip/3.jpg'
    ]
  },
  {
    slug: 'turkcell-manisa',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Manisa',
    location: 'MANİSA',
    category: 'Mağaza Konsept Tasarımı',
    description: 'Manisa genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    imageUrl: '/turkcell/7.jpeg',
    imageGallery: [
      '/turkcell/7.jpeg', '/turkcell/8.jpeg', '/turkcell/9.jpeg',
      '/turkcell_ekip/4.jpg'
    ]
  },
  {
    slug: 'turkcell-denizli',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Denizli',
    location: 'DENİZLİ',
    category: 'Mağaza Konsept Tasarımı',
    description: 'Denizli genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    imageUrl: '/turkcell/11.jpeg',
    imageGallery: [
      '/turkcell/10.jpeg', '/turkcell/11.jpeg',
      '/turkcell_ekip/5.jpg'
    ]
  },
  {
    slug: 'turkcell-balikesir',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Balıkesir',
    location: 'BALIKESİR',
    category: 'Mağaza Konsept Tasarımı',
    description: 'Balıkesir genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    imageUrl: '/turkcell/12.jpeg',
    imageGallery: [
      '/turkcell/12.jpeg', '/turkcell/13.jpeg'
    ]
  },
  {
    slug: 'turkcell-mugla',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Muğla',
    location: 'MUĞLA',
    category: 'Mağaza Konsept Tasarımı',
    description: 'Muğla genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    imageUrl: '/turkcell/14.jpeg',
    imageGallery: [
      '/turkcell/14.jpeg', '/turkcell/15.jpeg'
    ]
  },
  {
    slug: 'turkcell-burdur',
    name: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi - Burdur',
    location: 'BURDUR',
    category: 'Mağaza Konsept Tasarımı',
    description: 'Burdur genelindeki Turkcell bayileri için modern ve teknolojik bir mağaza konsepti geliştirdik. Müşteri deneyimini odak noktasına alan tasarımımızla, marka kimliğini yansıtan, fonksiyonel ve davetkar alanlar oluşturduk.',
    imageUrl: '/turkcell/16.jpeg',
    imageGallery: [
      '/turkcell/16.jpeg'
    ]
  },
  {
    slug: 'ekmas-egem',
    name: 'Ekmas Egem',
    location: 'MANİSA',
    category: 'Ofis ve Showroom',
    description: 'Ekmas Group için Manisa\'da hayata geçirdiğimiz ofis ve showroom projesi. Kurumsal kimliği yansıtan, çalışan verimliliğini artıran ve müşteriler için etkileyici bir karşılama alanı sunan modern bir yapı inşa ettik.',
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
    location: 'İZMİR',
    category: 'Endüstriyel Tesis',
    description: 'SunExpress Havayolları için İzmir Adnan Menderes Havalimanı\'nda inşa ettiğimiz apron ek binası. Operasyonel verimliliği artırmaya yönelik, yüksek güvenlik standartlarına sahip, fonksiyonel bir endüstriyel tesisi başarıyla tamamladık.',
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
    location: 'AYDIN',
    category: 'Konut Projesi',
    description: 'Aydın\'da geliştirdiğimiz YFS Modern konut projesi. Çağdaş mimari, konforlu yaşam alanları ve sosyal donatıları bir araya getirerek, bölgeye değer katan, modern bir yaşam merkezi oluşturduk.',
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
    location: 'İSTANBUL',
    category: 'Altyapı & Metro İnşaatı',
    description: 'İstanbul Kağıthane Metro İstasyonu projesinin ince işçilik, tavan, duvar ve dekoratif detay çalışmalarını kapsayan proje yönetim ve uygulama işidir.',
    imageUrl: '/kagithane_metro/main.jpg',
    imageGallery: [
      '/kagithane_metro/main.jpg'
    ]
  },
  {
    slug: 'cesme-boyalik-kumsal',
    name: 'Çeşme Boyalık Kumsal Projesi',
    location: 'ÇEŞME / İZMİR',
    category: 'Peyzaj & Çevre Düzenleme',
    description: 'Çeşme Boyalık Kumsal bölgesinde kıyı ve sahil alanlarının doğal dokusuna uygun peyzaj, plaj düzenlemesi ve rekreasyon alanı tasarımı projesidir.',
    imageUrl: '/sw1.jpg',
    imageGallery: [
      '/sw1.jpg',
      '/sw2.jpg',
      '/Swissotel-Resort---Spa-Cesme-Genel-390458.jpg',
      '/Swissotel-Resort---Spa-Cesme-Genel-390459.jpg'
    ]
  }
];
