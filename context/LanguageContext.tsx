import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'tr' | 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => string;
  isRtl: boolean;
}

export const translations: { [lang in Language]: { [key: string]: string } } = {
  tr: {
    // Header
    nav_services: 'Hizmetlerimiz',
    nav_projects: 'Projelerimiz',
    nav_testimonials: 'Referanslar',
    nav_contact: 'İletişim',
    btn_quote: 'Teklif Alın',
    
    // Hero
    hero_title: 'Geleceği Bugün İnşa Edin',
    hero_desc: 'Kurumsal mekanlarınızı modern, fonksiyonel ve prestijli alanlara dönüştürüyoruz. YFS İnşaat olarak, vizyonunuzu hassasiyetle hayata geçiriyoruz.',
    hero_scroll: 'Aşağı Kaydır',

    // Features
    features_title: 'Neden YFS İnşaat?',
    features_desc: 'Deneyim, kalite ve güveni bir araya getirerek kurumsal projelerinize değer katıyoruz.',
    feature_1_title: 'Zamanında Teslimat',
    feature_1_desc: 'Proje takvimlerinize sadık kalarak, işlerinizin aksamadan devam etmesini sağlıyoruz ve projelerinizi zamanında tamamlıyoruz.',
    feature_2_title: 'Yüksek Kalite Standartları',
    feature_2_desc: 'En kaliteli malzemeler ve usta işçilikle, mekanlarınıza uzun ömürlü ve estetik çözümler sunuyoruz.',
    feature_3_title: 'Müşteri Odaklı Yaklaşım',
    feature_3_desc: 'Sürecin her aşamasında sizinle şeffaf bir iletişim kurarak, ihtiyaçlarınıza en uygun çözümleri üretiyoruz.',
    feature_4_title: 'Uzman Ekip',
    feature_4_desc: 'Deneyimli uzmanlarımızla, her projede en iyi sonuçları garanti ediyoruz.',

    // Services
    services_title: 'Hizmetlerimiz',
    services_desc: 'Kurumsal ihtiyaçlarınıza yönelik sunduğumuz profesyonel çözümlerle projelerinize değer katıyoruz.',
    service_1_title: 'Mühendislik & Danışmanlık',
    service_1_desc: 'Projenizin her aşamasında, fizibiliteden tasarıma, en verimli ve yenilikçi mühendislik çözümleri sunuyoruz.',
    service_2_title: 'Proje Yönetimi',
    service_2_desc: 'Bütçe, zaman ve kalite hedeflerinize sadık kalarak projelerinizi baştan sona profesyonel bir şekilde yönetiyoruz.',
    service_3_title: 'Kurumsal Tadilat',
    service_3_desc: 'Ofis, mağaza ve diğer ticari alanlarınızı, marka kimliğinize uygun, modern ve fonksiyonel mekanlara dönüştürüyoruz.',
    service_4_title: 'Anahtar Teslim Projeler',
    service_4_desc: 'Fikirden uygulamaya, tüm süreci üstlenerek size sadece anahtarı teslim almanın konforunu yaşatıyoruz.',

    // Showcase
    showcase_title: 'Projelerimiz',
    showcase_desc: 'Seçkin kurumsal projelerimizden bazılarını keşfedin.',
    showcase_all: 'Tümünü Gör',
    showcase_header: 'Fikirden Gerçeğe',
    showcase_desc_body: 'Stratejik planlamadan kusursuz uygulamaya kadar, vizyonunuzu somut, etkili ve başarılı projelere dönüştürüyoruz. Sürecin her adımında sizinle birlikte çalışarak beklentilerinizi aşan sonuçlar elde ediyoruz.',
    showcase_li_1: 'Detaylı analiz ve mekana özel tasarım.',
    showcase_li_2: 'Profesyonel proje yönetimi ve şeffaf raporlama.',
    showcase_li_3: 'Anahtar teslim projeler ve satış sonrası destek.',
    showcase_img_alt: 'Modern İç Mekan Projesi',

    // Turkcell
    tc_partnership: 'Kurumsal Ortaklık',
    tc_collection: '2025 Koleksiyonu',
    tc_desc: 'Beyaz Konsept Bayi Dönüşüm Projesi kapsamında Ege ve Akdeniz bölgelerinde 7 şehirde, bölgeye özel estetik ve fonksiyonel mağaza tasarımları.',
    tc_stat_regions: 'Bölge / İl',
    tc_stat_year: 'Proje Yılı',
    tc_stat_retailers: 'İlçe Bayi',
    tc_points_suffix: 'bölge noktası →',
    tc_project_title: 'Turkcell Projesi',
    tc_project_desc: 'Modern ve minimalist tasarım anlayışıyla {city} ilindeki tüm bayi noktalarının konsept dönüşümünü başarıyla gerçekleştirdik.',
    tc_completed_districts: 'Tamamlanan Bölgeler',
    tc_btn_close: 'Kapat',
    tc_btn_detail: 'Proje Detayına Git',

    // Testimonials
    testimonials_title: 'Referanslarımız',
    testimonials_desc: 'YFS İnşaat ile çalışan kurumsal ortaklarımızın görüşleri.',

    // CTA
    cta_title: 'Projenizi Birlikte Hayata Geçirelim',
    cta_desc: 'Kurumsal mekan dönüşümünüz için hazır mısınız? Hemen bizimle iletişime geçin ve uzman ekibimizden teklif alın.',

    // Contact
    contact_title: 'İletişim',
    contact_desc: 'Kurumsal projeniz hakkında konuşmak veya teklif almak için bizimle iletişime geçin.',
    contact_name: 'Adınız ve Soyadınız',
    contact_email: 'E-posta Adresiniz',
    contact_phone: 'Telefon Numaranız',
    contact_subject: 'Konu',
    contact_message: 'Mesajınız',
    contact_btn_send: 'Gönder',
    contact_success: 'Mesajınız başarıyla gönderildi!',
    contact_address_label: 'Adres',
    contact_phone_label: 'Telefon',
    contact_email_label: 'Email',
    contact_map_title: 'YFS İnşaat Harita Konumu',
    
    // Popover / Form Dialog
    dialog_title: 'Teklif Formu',
    dialog_desc: 'Kurumsal projeniz için bilgilerinizi bırakın, uzman ekibimiz en kısa sürede size dönüş yapsın.',
    dialog_btn_submit: 'Teklif Talebi Gönder',
    dialog_contact_title: 'Bize Ulaşın',
    dialog_contact_desc: 'Size en uygun iletişim yolunu seçin.',
    contact_option_whatsapp: 'WhatsApp',
    contact_option_phone: 'Telefon',
    contact_option_email: 'E-posta',
    contact_option_location: 'Konum',
    close: 'Kapat',

    // Footer
    footer_desc: 'YFS İnşaat olarak, kurumsal mekanlarınızı geleceğe hazırlıyoruz.',
    footer_quick_links: 'Hızlı Linkler',
    footer_contact_info: 'İletişim Bilgileri',
    footer_rights: 'Tüm Hakları Saklıdır.',
    footer_logo_desc: 'Mekanlarınıza değer katan, modern ve kaliteli inşaat çözümleri.',
    footer_cat_company: 'Şirket',
    footer_cat_support: 'Destek',
    footer_link_office: 'Ofis Tasarımı',
    footer_link_store: 'Mağaza Renovasyonu',
    footer_link_careers: 'Kariyer',
    footer_link_faq: 'S.S.S.',
    footer_link_privacy: 'Gizlilik Politikası',
    footer_link_terms: 'Kullanım Şartları',

    // Projects Page & Detail Page Additional
    project_completed: 'Tamamlandı',
    project_concept_conversion: 'Konsept Dönüşüm',
    project_view_details: 'İncele',
    project_view_project: 'Projeyi İncele',
    projects_page_turkcell_title: '2025 Turkcell Beyaz Konsept Bayi Dönüşüm Projesi',
    projects_page_turkcell_location: 'EGE BÖLGESİ',
    project_back_btn: 'Geri Dön',
    project_gallery_title: 'Proje Galerisi',
    
    // Detail Page specifications
    project_not_found: 'Proje Bulunamadı',
    project_not_found_desc: 'Aradığınız proje mevcut değil veya kaldırılmış olabilir.',
    project_back_home: 'Ana Sayfaya Dön',
    project_about: 'Proje Hakkında',
    project_spec: 'Proje Künyesi',
    project_spec_client: 'Müşteri',
    project_spec_location: 'Lokasyon',
    project_spec_category: 'Kategori',
    project_other_projects: 'Diğer Projeler',

    // About Page additional
    about_title: 'Hakkımızda',
    about_desc: 'Yenilikçi vizyon, sağlam mühendislik ve sarsılmaz dürüstlükle geleceği inşa ediyoruz.',
    about_story_title: 'Bizim Hikayemiz',
    about_story_p1: 'YFS İnşaat, kurucusu İnşaat Yüksek Mühendisi Yiğit Fırat Sekitmez\'in adının baş harflerinden doğmuştur. Bu isim, sadece bir kısaltma değil, aynı zamanda temel değerlerimizi de simgeler: Yenilikçi yaklaşımlar, Fonksiyonel çözümler ve Sağlam yapılar.',
    about_story_p2: 'Sektördeki uzun yıllara dayanan tecrübemizi, genç ve dinamik bir bakış açısıyla birleştirerek, her projeye özel, butik ve sonuç odaklı çözümler üretiyoruz. Kurumsal tadilattan anahtar teslim projelere kadar geniş bir yelpazede, müşterilerimizin hayallerini somut gerçeklere dönüştürmek için çalışıyoruz. Bizim için her proje, altına imzamızı atmaktan gurur duyduğumuz bir eserdir.',
    about_vision_title: 'Vizyonumuz',
    about_vision_desc: 'İnşaat sektöründe kalite, güven ve estetiği bir araya getiren, yenilikçi çözümleriyle bölgesel bir lider olmak ve sürdürülebilir yapılarla geleceğe kalıcı değerler bırakmak.',
    about_mission_title: 'Misyonumuz',
    about_mission_desc: 'Müşteri memnuniyetini en üst düzeyde tutarak, modern mühendislik tekniklerini ve teknolojiyi kullanarak, her projeyi zamanında, bütçesinde ve beklenen kalitenin üzerinde tamamlamak.',
    about_team_title: 'Ekibimizle Tanışın',
    about_team_desc: 'Projelerinizin arkasındaki deneyimli ve tutkulu gücümüz.'
  },
  en: {
    // Header
    nav_services: 'Services',
    nav_projects: 'Projects',
    nav_testimonials: 'References',
    nav_contact: 'Contact',
    btn_quote: 'Get a Quote',
    
    // Hero
    hero_title: 'Build the Future Today',
    hero_desc: 'We transform your corporate spaces into modern, functional, and prestigious environments. As YFS Construction, we deliver your vision with precision.',
    hero_scroll: 'Scroll Down',

    // Features
    features_title: 'Why YFS Construction?',
    features_desc: 'We add value to your corporate projects by combining experience, quality, and trust.',
    feature_1_title: 'On-Time Delivery',
    feature_1_desc: 'Adhering strictly to project timelines, we ensure your business continues uninterrupted and projects are completed on schedule.',
    feature_2_title: 'High Quality Standards',
    feature_2_desc: 'With premium materials and skilled craftsmanship, we offer durable and aesthetic solutions for your spaces.',
    feature_3_title: 'Customer-Centric Approach',
    feature_3_desc: 'By establishing transparent communication at every stage, we produce the most appropriate solutions for your needs.',
    feature_4_title: 'Expert Team',
    feature_4_desc: 'With our experienced specialists, we guarantee the best results in every project.',

    // Services
    services_title: 'Our Services',
    services_desc: 'We add value to your projects with professional solutions tailored to your corporate needs.',
    service_1_title: 'Engineering & Consultancy',
    service_1_desc: 'We offer the most efficient and innovative engineering solutions at every stage of your project, from feasibility to design.',
    service_2_title: 'Project Management',
    service_2_desc: 'We manage your projects professionally from start to finish, adhering to your budget, time, and quality goals.',
    service_3_title: 'Corporate Renovation',
    service_3_desc: 'We transform your offices, stores, and other commercial spaces into modern and functional environments matching your brand identity.',
    service_4_title: 'Turnkey Projects',
    service_4_desc: 'By taking care of the entire process from concept to completion, we offer you the comfort of simply receiving the key.',

    // Showcase
    showcase_title: 'Our Projects',
    showcase_desc: 'Explore some of our featured corporate projects.',
    showcase_all: 'View All',
    showcase_header: 'From Idea to Reality',
    showcase_desc_body: 'From strategic planning to flawless execution, we transform your vision into tangible, impactful, and successful projects. We work with you at every step of the process to deliver results that exceed expectations.',
    showcase_li_1: 'Detailed analysis and custom space design.',
    showcase_li_2: 'Professional project management and transparent reporting.',
    showcase_li_3: 'Turnkey projects and after-sales support.',
    showcase_img_alt: 'Modern Interior Project',

    // Turkcell
    tc_partnership: 'Corporate Partnership',
    tc_collection: '2025 Collection',
    tc_desc: 'Custom aesthetic and functional retail store designs in 7 cities across Aegean and Mediterranean regions within the White Concept Dealer Conversion Project.',
    tc_stat_regions: 'Regions / Cities',
    tc_stat_year: 'Project Year',
    tc_stat_retailers: 'District Dealers',
    tc_points_suffix: 'regional locations →',
    tc_project_title: 'Turkcell Project',
    tc_project_desc: 'We have successfully completed the concept transformation of all dealer locations in {city} with a modern and minimalist design approach.',
    tc_completed_districts: 'Completed Districts',
    tc_btn_close: 'Close',
    tc_btn_detail: 'Go to Project Details',

    // Testimonials
    testimonials_title: 'References',
    testimonials_desc: 'What our corporate partners who work with YFS Construction say about us.',

    // CTA
    cta_title: 'Let’s Bring Your Project to Life Together',
    cta_desc: 'Are you ready for your corporate space transformation? Contact us now and get a quote from our expert team.',

    // Contact
    contact_title: 'Contact',
    contact_desc: 'Get in touch with us and let’s plan your corporate project.',
    contact_name: 'Your Full Name',
    contact_email: 'Email Address',
    contact_phone: 'Phone Number',
    contact_subject: 'Subject',
    contact_message: 'Your Message',
    contact_btn_send: 'Send',
    contact_success: 'Your message has been sent successfully!',
    contact_address_label: 'Address',
    contact_phone_label: 'Phone',
    contact_email_label: 'Email',
    contact_map_title: 'YFS Construction Map Location',

    // Popover / Form Dialog
    dialog_title: 'Request a Quote',
    dialog_desc: 'Leave your details for your corporate project, and our expert team will contact you as soon as possible.',
    dialog_btn_submit: 'Send Request',
    dialog_contact_title: 'Get in Touch',
    dialog_contact_desc: 'Choose the most convenient way to reach us.',
    contact_option_whatsapp: 'WhatsApp',
    contact_option_phone: 'Phone',
    contact_option_email: 'Email',
    contact_option_location: 'Location',
    close: 'Close',

    // Footer
    footer_desc: 'As YFS Construction, we prepare your corporate spaces for the future.',
    footer_quick_links: 'Quick Links',
    footer_contact_info: 'Contact Info',
    footer_rights: 'All Rights Reserved.',
    footer_logo_desc: 'Modern and high-quality construction solutions adding value to your spaces.',
    footer_cat_company: 'Company',
    footer_cat_support: 'Support',
    footer_link_office: 'Office Design',
    footer_link_store: 'Store Renovation',
    footer_link_careers: 'Careers',
    footer_link_faq: 'FAQ',
    footer_link_privacy: 'Privacy Policy',
    footer_link_terms: 'Terms of Use',

    // Projects Page & Detail Page Additional
    project_completed: 'Completed',
    project_concept_conversion: 'Concept Conversion',
    project_view_details: 'View Details',
    project_view_project: 'View Project',
    projects_page_turkcell_title: '2025 Turkcell White Concept Dealer Conversion Project',
    projects_page_turkcell_location: 'AEGEAN REGION',
    project_back_btn: 'Back',
    project_gallery_title: 'Project Gallery',
    
    // Detail Page specifications
    project_not_found: 'Project Not Found',
    project_not_found_desc: 'The project you are looking for does not exist or may have been removed.',
    project_back_home: 'Back to Home',
    project_about: 'About the Project',
    project_spec: 'Project Specifications',
    project_spec_client: 'Client',
    project_spec_location: 'Location',
    project_spec_category: 'Category',
    project_other_projects: 'Other Projects',

    // About Page additional
    about_title: 'About Us',
    about_desc: 'We build the future with innovative vision, solid engineering, and unwavering integrity.',
    about_story_title: 'Our Story',
    about_story_p1: 'YFS Construction was born from the initials of its founder, Civil Engineer M.Sc. Yiğit Fırat Sekitmez. This name is not just an abbreviation, but also represents our core values: Innovative approaches, Functional solutions, and Solid structures.',
    about_story_p2: 'By combining our long-standing experience in the sector with a young and dynamic perspective, we produce bespoke, boutique, and result-oriented solutions for each project. Working across a wide spectrum from corporate renovation to turnkey projects, we strive to transform our clients\' dreams into tangible realities. For us, every project is a masterpiece we are proud to sign.',
    about_vision_title: 'Our Vision',
    about_vision_desc: 'To become a regional leader with innovative solutions that bring quality, trust, and aesthetics together in the construction sector, leaving lasting value for the future with sustainable structures.',
    about_mission_title: 'Our Mission',
    about_mission_desc: 'Keeping customer satisfaction at the highest level, using modern engineering techniques and technology to complete every project on time, within budget, and beyond expected quality.',
    about_team_title: 'Meet Our Team',
    about_team_desc: 'Our experienced and passionate force behind your projects.'
  },
  ar: {
    // Header
    nav_services: 'خدماتنا',
    nav_projects: 'مشاريعنا',
    nav_testimonials: 'مراجعنا',
    nav_contact: 'اتصل بنا',
    btn_quote: 'احصل على عرض سعر',
    
    // Hero
    hero_title: 'نبني المستقبل اليوم',
    hero_desc: 'نحن نحول مساحاتكم المؤسسية إلى بيئات حديثة وعملية ومرموقة. بصفتنا YFS للإنشاءات، ننفذ رؤيتكم بدقة متناهية.',
    hero_scroll: 'انزل لأسفل',

    // Features
    features_title: 'لماذا YFS للإنشاءات؟',
    features_desc: 'نضيف قيمة إلى مشاريعكم المؤسسية من خلال الجمع بين الخبرة والجودة والثقة.',
    feature_1_title: 'التسليم في الوقت المحدد',
    feature_1_desc: 'من خلال الالتزام الصارم بالجداول الزمنية للمشروع، نضمن استمرار عملك دون انقطاع واكتمال المشاريع في الوقت المحدد.',
    feature_2_title: 'معايير الجودة العالية',
    feature_2_desc: 'نقدم حلولاً متينة وجمالية لمساحاتكم باستخدام مواد ممتازة وحرفية عالية.',
    feature_3_title: 'التركيز على العملاء',
    feature_3_desc: 'من خلال تأسيس تواصل شفاف في كل مرحلة، نقدم أفضل الحلول التي تناسب احتياجاتكم.',
    feature_4_title: 'فريق من الخبراء',
    feature_4_desc: 'مع خبرائنا المتخصصين، نضمن تقديم أفضل النتائج في كل مشروع.',

    // Services
    services_title: 'خدماتنا',
    services_desc: 'نضيف قيمة إلى مشاريعكم من خلال الحلول المهنية المصممة لتلبية احتياجاتكم المؤسسية.',
    service_1_title: 'الهندسة والاستشارات',
    service_1_desc: 'نقدم الحلول الهندسية الأكثر كفاءة وابتكاراً في كل مرحلة من مراحل مشروعكم، من دراسة الجدوى إلى التصميم.',
    service_2_title: 'إدارة المشاريع',
    service_2_desc: 'ندير مشاريعكم باحترافية من البداية إلى النهاية، مع الالتزام بميزانيتكم وجدولكم الزمني وأهداف الجودة الخاصة بكم.',
    service_3_title: 'التجديد المؤسسي',
    service_3_desc: 'نحن نحول مكاتبكم ومتاجركم والمساحات التجارية الأخرى إلى بيئات حديثة وعملية تتناسب مع هوية علامتكم التجارية.',
    service_4_title: 'مشاريع تسليم المفتاح',
    service_4_desc: 'من خلال تولي العملية بأكملها من الفكرة إلى التنفيذ، نقدم لكم راحة تسلم المفتاح ببساطة.',

    // Showcase
    showcase_title: 'مشاريعنا المميزة',
    showcase_desc: 'اكتشف بعضاً من مشاريعنا المؤسسية البارزة.',
    showcase_all: 'عرض الكل',
    showcase_header: 'من الفكرة إلى الواقع',
    showcase_desc_body: 'من التخطيط الاستراتيجي إلى التنفيذ الخالي من العيوب، نقوم بتحويل رؤيتكم إلى مشاريع ملموسة وفعالة وناجحة. نحن نعمل معكم في كل خطوة من العملية لتقديم نتائج تفوق توقعاتكم.',
    showcase_li_1: 'تحليل مفصل وتصميم مخصص للمساحة.',
    showcase_li_2: 'إدارة مهنية للمشروع وتقارير شفافة.',
    showcase_li_3: 'مشاريع تسليم المفتاح ودعم ما بعد البيع.',
    showcase_img_alt: 'مشروع داخلي حديث',

    // Turkcell
    tc_partnership: 'الشراكة المؤسسية',
    tc_collection: 'مجموعة 2025',
    tc_desc: 'تصاميم متاجر تجزئة جمالية وعملية في 7 مدن في منطقتي بحر إيجة والبحر الأبيض المتوسط ضمن مشروع تحويل مفهوم موزع تركسل الأبيض.',
    tc_stat_regions: 'المناطق / المدن',
    tc_stat_year: 'عام المشروع',
    tc_stat_retailers: 'الموزعين المحليين',
    tc_points_suffix: 'مواقع إقليمية ←',
    tc_project_title: 'مشروع تركسل',
    tc_project_desc: 'لقد أكملنا بنجاح تحويل المفهوم لجميع مواقع الموزعين في {city} بأسلوب تصميم حديث ومبسط.',
    tc_completed_districts: 'المناطق المكتملة',
    tc_btn_close: 'إغلاق',
    tc_btn_detail: 'انتقل إلى تفاصيل المشروع',

    // Testimonials
    testimonials_title: 'آراء عملائنا',
    testimonials_desc: 'ماذا يقول شركاؤنا من الشركات الذين يعملون مع YFS للإنشاءات عنا.',

    // CTA
    cta_title: 'دعنا ننجز مشروعك معاً',
    cta_desc: 'هل أنت مستعد لتحويل مساحتك المؤسسية؟ اتصل بنا الآن واحصل على عرض سعر من فريق خبرائنا.',

    // Contact
    contact_title: 'اتصل بنا',
    contact_desc: 'تواصل معنا ودعنا نخطط لمشروعك المؤسسي.',
    contact_name: 'الاسم الكامل',
    contact_email: 'البريد الإلكتروني',
    contact_phone: 'رقم الهاتف',
    contact_subject: 'الموضوع',
    contact_message: 'رسالتك',
    contact_btn_send: 'إرسال',
    contact_success: 'تم إرسال رسالتك بنجاح!',
    contact_address_label: 'العنوان',
    contact_phone_label: 'الهاتف',
    contact_email_label: 'البريد الإلكتروني',
    contact_map_title: 'موقع خريطة YFS للإنشاءات',

    // Popover / Form Dialog
    dialog_title: 'نموذج طلب عرض السعر',
    dialog_desc: 'اترك بياناتك لمشروعك المؤسسي، وسيتصل بك فريق الخبراء لدينا في أقرب وقت ممكن.',
    dialog_btn_submit: 'إرسال الطلب',
    dialog_contact_title: 'اتصل بنا',
    dialog_contact_desc: 'اختر الطريقة الأكثر ملاءمة للتواصل معنا.',
    contact_option_whatsapp: 'واتساب',
    contact_option_phone: 'الهاتف',
    contact_option_email: 'البريد الإلكتروني',
    contact_option_location: 'الموقع',
    close: 'إغلاق',

    // Footer
    footer_desc: 'بصفتنا YFS للإنشاءات، نجهز مساحاتكم المؤسسية للمستقبل.',
    footer_quick_links: 'روابط سريعة',
    footer_contact_info: 'معلومات الاتصال',
    footer_rights: 'جميع الحقوق محفوظة.',
    footer_logo_desc: 'حلول بناء حديثة وعالية الجودة تضيف قيمة إلى مساحاتكم.',
    footer_cat_company: 'الشركة',
    footer_cat_support: 'الدعم',
    footer_link_office: 'تصميم المكاتب',
    footer_link_store: 'تجديد المتاجر',
    footer_link_careers: 'الوظائف',
    footer_link_faq: 'الأسئلة الشائعة',
    footer_link_privacy: 'سياسة الخصوصية',
    footer_link_terms: 'شروط الاستخدام',

    // Projects Page & Detail Page Additional
    project_completed: 'مكتمل',
    project_concept_conversion: 'تحويل المفهوم',
    project_view_details: 'التفاصيل',
    project_view_project: 'عرض المشروع',
    projects_page_turkcell_title: 'مشروع تحويل مفهوم موزع تركسل الأبيض 2025',
    projects_page_turkcell_location: 'منطقة بحر إيجة',
    project_back_btn: 'رجوع',
    project_gallery_title: 'معرض المشروع',
    
    // Detail Page specifications
    project_not_found: 'لم يتم العثور على المشروع',
    project_not_found_desc: 'المشروع الذي تبحث عنه غير موجود أو ربما تم حذفه.',
    project_back_home: 'العودة إلى الصفحة الرئيسية',
    project_about: 'عن المشروع',
    project_spec: 'مواصفات المشروع',
    project_spec_client: 'العميل',
    project_spec_location: 'الموقع',
    project_spec_category: 'الفئة',
    project_other_projects: 'مشاريع أخرى',

    // About Page additional
    about_title: 'من نحن',
    about_desc: 'نبني المستقبل برؤية مبتكرة وهندسة صلبة ونزاهة لا تتزعزع.',
    about_story_title: 'قصتنا',
    about_story_p1: 'ولدت شركة YFS للإنشاءات من الأحرف الأولى لاسم مؤسسها، مهندس الإنشاءات الحاصل على ماجستير العلوم يغيت فرات سيكيتيميز. هذا الاسم ليس مجرد اختصار، بل يمثل أيضاً قيمنا الأساسية: الأساليب المبتكرة، والحلول العملية، والهياكل الصلبة.',
    about_story_p2: 'من خلال الجمع بين خبرتنا الطويلة في هذا القطاع ومنظورنا الشاب والديناميكي، نقدم حلولاً مخصصة وموجهة نحو النتائج لكل مشروع. نعمل عبر طيف واسع من التجديد المؤسسي إلى مشاريع تسليم المفتاح، ونسعى جاهدين لتحويل أحلام عملائنا إلى حقائق ملموسة. بالنسبة لنا، كل مشروع هو عمل فني نفخر بالتوقيع عليه.',
    about_vision_title: 'رؤيتنا',
    about_vision_desc: 'أن نكون شركة رائدة إقليمياً بحلولها المبتكرة التي تجمع بين الجودة والثقة والجمال في قطاع البناء، تاركين قيماً دائمة للمستقبل بهياكل مستدامة.',
    about_mission_title: 'رسالتنا',
    about_mission_desc: 'الحفاظ على رضا العملاء في أعلى مستوى، باستخدام التقنيات الهندسية الحديثة والتكنولوجيا لإكمال كل مشروع في الوقت المحدد، وضمن الميزانية، وبأعلى من الجودة المتوقعة.',
    about_team_title: 'تعرف على فريقنا',
    about_team_desc: 'قوتنا المجرّبة والشغوفة وراء مشاريعكم.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('yfs_lang');
    return (saved as Language) || 'tr';
  });

  const changeLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('yfs_lang', lang);
  };

  const isRtl = language === 'ar';

  useEffect(() => {
    // Set html lang and dir attribute for RTL support (Arabic)
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    
    if (isRtl) {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  }, [language, isRtl]);

  const t = (key: string, replacements?: { [key: string]: string | number }): string => {
    const langTrans = translations[language] || translations['tr'];
    let val = langTrans[key] || translations['tr'][key] || key;
    
    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        val = val.replace(`{${k}}`, String(v));
      });
    }
    return val;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
