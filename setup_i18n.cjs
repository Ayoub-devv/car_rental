const fs = require('fs');
const path = require('path');

const localesDir = path.join(process.cwd(), 'resources/js/locales');
if (!fs.existsSync(localesDir)) fs.mkdirSync(localesDir, { recursive: true });

const en = {
  nav: {
    home: "Home", fleet: "Fleet", about: "About Us", contact: "Contact",
    login: "Sign In", register: "Sign Up", dashboard: "Dashboard", logout: "Log Out"
  },
  welcome: {
    corporate_standard: "The Corporate Standard",
    title_1: "Uncompromising",
    title_2: "Mobility Solutions.",
    subtitle: "Engineered for excellence. Experience the definitive class of executive and premium car rentals, tailored for individuals who demand perfection.",
    reserve_btn: "Reserve a Vehicle",
    corporate_btn: "Corporate Accounts",
    pillars: {
      immaculate_title: "Immaculate Fleet", immaculate_desc: "Every vehicle is rigorously inspected and detailed to absolute perfection prior to deployment.",
      punctual_title: "Punctual Delivery", punctual_desc: "Precision timing. We guarantee your vehicle will be ready and waiting precisely when scheduled.",
      global_title: "Global Network", global_desc: "Seamless pick-up and drop-off locations strategically positioned across major business hubs."
    },
    featured: {
      tag: "Premium Selection",
      title: "Our Featured Vehicles",
      view_all: "View Entire Fleet"
    },
    elegance: {
      tag: "Executive Class",
      title: "Designed for Leadership.",
      desc: "Real Rent provides more than just a car; we provide a statement. Our curated fleet of executive sedans, luxury SUVs, and high-performance vehicles ensures that you make the right impression, every time.",
      list_1: "Dedicated Account Management",
      list_2: "Chauffeur Services Available",
      list_3: "Flexible Corporate Leases",
      link: "Discover Our Standards"
    }
  },
  fleet: {
    title: "Our Premium Fleet",
    subtitle: "Find the perfect vehicle for your next journey",
    search: "Search vehicles by make or model...",
    all_transmissions: "All Transmissions",
    automatic: "Automatic",
    manual: "Manual",
    sort_by: "Sort By",
    sort_default: "Recommended",
    price_low_high: "Price: Low to High",
    price_high_low: "Price: High to Low",
    no_results: "No vehicles match your search criteria.",
    gps: "GPS included",
    insurance: "Insurance included",
    book_now: "Book Now",
    per_day: "per day"
  },
  about: {
    title: "About Real Rent Car",
    subtitle: "Your trusted partner in premium car rental services, providing reliable transportation solutions since 2015.",
    story_title: "Our Story",
    story_1: "Founded in 2015, Real Rent Car began with a simple mission: to provide reliable, affordable, and convenient car rental services to travelers and locals alike.",
    story_2: "We understand that every journey is important, whether it's a business trip, family vacation, or daily commute.",
    stats: { vehicles: "Vehicles", customers: "Happy Customers", locations: "Locations", experience: "Years Experience" },
    mission_title: "Our Mission & Values",
    mission_sub: "We're committed to providing exceptional car rental experiences while maintaining the highest standards of service and integrity.",
    values: {
      rel_title: "Reliability", rel_desc: "Every vehicle in our fleet is regularly maintained and inspected to ensure your safety and peace of mind.",
      trans_title: "Transparency", trans_desc: "No hidden fees, no surprises. We believe in clear, upfront pricing and honest communication.",
      exc_title: "Excellence", exc_desc: "We continuously strive to exceed expectations through superior service, quality vehicles, and innovative solutions."
    },
    choose_title: "Why Choose Real Rent Car?",
    choose: {
      fleet_t: "Premium Fleet", fleet_d: "Modern, well-maintained vehicles from top manufacturers",
      support_t: "24/7 Support", support_d: "Round-the-clock customer service and roadside assistance",
      booking_t: "Flexible Booking", booking_d: "Easy online booking with flexible pickup and return options",
      price_t: "Competitive Pricing", price_d: "Best rates in the market with no hidden fees",
      loc_t: "Multiple Locations", loc_d: "Convenient pickup points across the city",
      safety_t: "Safety First", safety_d: "All vehicles undergo rigorous safety inspections"
    },
    team_title: "Our Leadership Team",
    team_sub: "Meet the experienced professionals who drive our company forward.",
    ready_title: "Ready to Get Started?",
    ready_sub: "Experience the Real Rent Car difference today. Browse our fleet and book your perfect vehicle in just a few clicks."
  },
  contact: {
    title: "Contact Us",
    subtitle: "Have questions about our car rental services? We're here to help. Send us a message and we'll get back to you as soon as possible.",
    form_title: "Send us a Message",
    name: "Full Name", email: "Email Address", subject: "Subject", message: "Message", send: "Send Message",
    get_in_touch: "Get in Touch", phone: "Phone", address: "Address", hours: "Business Hours", quick_links: "Quick Links"
  },
  booking: {
    title: "Book",
    subtitle: "Complete your reservation in just a few steps",
    details: "Booking Details",
    period: "Rental Period",
    pickup_date: "Pickup Date *", return_date: "Return Date *",
    locations: "Pickup & Return Locations",
    pickup_loc: "Pickup Location *", return_loc: "Return Location *",
    select_pickup: "Select pickup location", select_return: "Select return location",
    summary: "Booking Summary",
    daily_rate: "Daily Rate",
    subtotal: "Subtotal",
    tax: "Tax (7%)",
    total: "Total",
    processing: "Processing...",
    login_to_book: "Login to Book",
    day: "day",
    days: "days"
  }
};

const fr = {
  nav: {
    home: "Accueil", fleet: "Flotte", about: "À Propos", contact: "Contact",
    login: "Connexion", register: "S'inscrire", dashboard: "Tableau de Bord", logout: "Déconnexion"
  },
  welcome: {
    corporate_standard: "Le Standard d'Entreprise",
    title_1: "Des Solutions de",
    title_2: "Mobilité Sans Compromis.",
    subtitle: "Conçu pour l'excellence. Découvrez la classe définitive des locations de voitures de luxe, conçue pour les individus qui exigent la perfection.",
    reserve_btn: "Réserver un Véhicule",
    corporate_btn: "Comptes d'Entreprise",
    pillars: {
      immaculate_title: "Flotte Immaculée", immaculate_desc: "Chaque véhicule est rigoureusement inspecté et détaillé à la perfection avant d'être déployé.",
      punctual_title: "Livraison Ponctuelle", punctual_desc: "Précision absolue. Nous garantissons que votre véhicule sera prêt exactement à l'heure prévue.",
      global_title: "Réseau Mondial", global_desc: "Emplacements de retrait et de retour idéalement situés dans les grands centres d'affaires."
    },
    featured: {
      tag: "Sélection Premium",
      title: "Nos Véhicules en Vedette",
      view_all: "Voir Toute la Flotte"
    },
    elegance: {
      tag: "Classe Exécutive",
      title: "Conçu pour le Leadership.",
      desc: "Real Rent ne vous offre pas seulement une voiture, mais une affirmation. Notre flotte soigneusement sélectionnée garantit que vous faites la bonne impression, à chaque fois.",
      list_1: "Gestion de Compte Dédiée",
      list_2: "Services de Chauffeur Disponibles",
      list_3: "Locations d'Entreprise Flexibles",
      link: "Découvrez Nos Standards"
    }
  },
  fleet: {
    title: "Notre Flotte Premium",
    subtitle: "Trouvez le véhicule parfait pour votre prochain voyage",
    search: "Rechercher par marque ou modèle...",
    all_transmissions: "Toutes les Transmissions",
    automatic: "Automatique",
    manual: "Manuelle",
    sort_by: "Trier Par",
    sort_default: "Recommandé",
    price_low_high: "Prix : Croissant",
    price_high_low: "Prix : Décroissant",
    no_results: "Aucun véhicule ne correspond à vos critères.",
    gps: "GPS inclus",
    insurance: "Assurance incluse",
    book_now: "Réserver",
    per_day: "par jour"
  },
  about: {
    title: "À Propos de Real Rent Car",
    subtitle: "Votre partenaire de confiance pour des services de location de voitures haut de gamme depuis 2015.",
    story_title: "Notre Histoire",
    story_1: "Fondée en 2015, Real Rent Car a commencé avec une mission simple : fournir des services de location de voitures fiables, abordables et pratiques.",
    story_2: "Nous comprenons que chaque voyage est important. C'est pourquoi nous avons bâti notre réputation sur la confiance, la qualité et un service client exceptionnel.",
    stats: { vehicles: "Véhicules", customers: "Clients Satisfaits", locations: "Emplacements", experience: "Années d'Expérience" },
    mission_title: "Notre Mission & Nos Valeurs",
    mission_sub: "Nous nous engageons à fournir des expériences de location exceptionnelles.",
    values: {
      rel_title: "Fiabilité", rel_desc: "Chaque véhicule est régulièrement entretenu et inspecté pour assurer votre sécurité.",
      trans_title: "Transparence", trans_desc: "Pas de frais cachés. Nous croyons en une tarification claire et une communication honnête.",
      exc_title: "Excellence", exc_desc: "Nous nous efforçons continuellement de dépasser les attentes par un service supérieur."
    },
    choose_title: "Pourquoi Choisir Real Rent Car ?",
    choose: {
      fleet_t: "Flotte Premium", fleet_d: "Véhicules modernes et bien entretenus des meilleurs constructeurs",
      support_t: "Support 24/7", support_d: "Service client et assistance routière disponibles 24h/24",
      booking_t: "Réservation Flexible", booking_d: "Réservation en ligne facile avec options flexibles",
      price_t: "Prix Compétitifs", price_d: "Les meilleurs tarifs du marché sans frais cachés",
      loc_t: "Emplacements Multiples", loc_d: "Points de retrait pratiques à travers la ville",
      safety_t: "La Sécurité Avant Tout", safety_d: "Tous les véhicules subissent des inspections rigoureuses"
    },
    team_title: "Notre Équipe de Direction",
    team_sub: "Rencontrez les professionnels expérimentés qui font avancer notre entreprise.",
    ready_title: "Prêt à Commencer ?",
    ready_sub: "Découvrez la différence Real Rent Car aujourd'hui. Parcourez notre flotte et réservez votre véhicule idéal."
  },
  contact: {
    title: "Contactez-Nous",
    subtitle: "Des questions sur nos services ? Nous sommes là pour vous aider. Envoyez-nous un message.",
    form_title: "Envoyez-nous un Message",
    name: "Nom Complet", email: "Adresse E-mail", subject: "Sujet", message: "Message", send: "Envoyer",
    get_in_touch: "Entrer en Contact", phone: "Téléphone", address: "Adresse", hours: "Heures d'Ouverture", quick_links: "Liens Rapides"
  },
  booking: {
    title: "Réserver",
    subtitle: "Complétez votre réservation en quelques étapes",
    details: "Détails de Réservation",
    period: "Période de Location",
    pickup_date: "Date de Retrait *", return_date: "Date de Retour *",
    locations: "Lieux de Retrait et de Retour",
    pickup_loc: "Lieu de Retrait *", return_loc: "Lieu de Retour *",
    select_pickup: "Sélectionnez le lieu de retrait", select_return: "Sélectionnez le lieu de retour",
    summary: "Résumé de la Réservation",
    daily_rate: "Tarif Journalier",
    subtotal: "Sous-total",
    tax: "Taxe (7%)",
    total: "Total",
    processing: "Traitement...",
    login_to_book: "Se Connecter",
    day: "jour",
    days: "jours"
  }
};

const ar = {
  nav: {
    home: "الرئيسية", fleet: "الأسطول", about: "من نحن", contact: "اتصل بنا",
    login: "تسجيل الدخول", register: "إنشاء حساب", dashboard: "لوحة التحكم", logout: "تسجيل الخروج"
  },
  welcome: {
    corporate_standard: "المعيار المؤسسي",
    title_1: "حلول تنقل",
    title_2: "لا تقبل المساومة.",
    subtitle: "مصممة للتميز. اختبر الفئة المثالية من تأجير السيارات الفاخرة، المصممة خصيصاً لمن يطلبون الكمال.",
    reserve_btn: "احجز سيارة",
    corporate_btn: "حسابات الشركات",
    pillars: {
      immaculate_title: "أسطول لا تشوبه شائبة", immaculate_desc: "يتم فحص كل سيارة وتجهيزها بدقة متناهية قبل تسليمها لك.",
      punctual_title: "التسليم في الموعد", punctual_desc: "دقة متناهية. نضمن أن تكون سيارتك جاهزة في الوقت المحدد بالضبط.",
      global_title: "شبكة عالمية", global_desc: "مواقع استلام وتسليم استراتيجية في أهم المراكز التجارية."
    },
    featured: {
      tag: "اختيار استثنائي",
      title: "سياراتنا المميزة",
      view_all: "عرض جميع السيارات"
    },
    elegance: {
      tag: "فئة رجال الأعمال",
      title: "مصممة للقيادة.",
      desc: "نحن لا نقدم لك مجرد سيارة، بل نقدم لك أسلوب حياة. يضمن لك أسطولنا المختار بعناية من سيارات السيدان الفاخرة أن تترك الانطباع الصحيح دائمًا.",
      list_1: "إدارة حسابات مخصصة",
      list_2: "خدمات سائق خاص متاحة",
      list_3: "تأجير مرن للشركات",
      link: "اكتشف معاييرنا"
    }
  },
  fleet: {
    title: "أسطولنا الفاخر",
    subtitle: "ابحث عن السيارة المثالية لرحلتك القادمة",
    search: "ابحث عن سيارة...",
    all_transmissions: "جميع نواقل الحركة",
    automatic: "أوتوماتيك",
    manual: "عادي",
    sort_by: "ترتيب حسب",
    sort_default: "موصى به",
    price_low_high: "السعر: من الأقل للأعلى",
    price_high_low: "السعر: من الأعلى للأقل",
    no_results: "لا توجد سيارات مطابقة لبحثك.",
    gps: "مزودة بنظام تحديد المواقع",
    insurance: "التأمين مشمول",
    book_now: "احجز الآن",
    per_day: "في اليوم"
  },
  about: {
    title: "عن شركة ريل رينت",
    subtitle: "شريكك الموثوق في خدمات تأجير السيارات الفاخرة منذ عام 2015.",
    story_title: "قصتنا",
    story_1: "تأسست الشركة في عام 2015 بمهمة بسيطة: توفير خدمات تأجير سيارات موثوقة وبأسعار معقولة.",
    story_2: "نحن ندرك أهمية كل رحلة، لذلك بنينا سمعتنا على الثقة والجودة وخدمة العملاء الاستثنائية.",
    stats: { vehicles: "سيارة", customers: "عميل سعيد", locations: "موقع", experience: "سنوات من الخبرة" },
    mission_title: "مهمتنا وقيمنا",
    mission_sub: "نلتزم بتقديم تجارب تأجير استثنائية مع الحفاظ على أعلى معايير الخدمة.",
    values: {
      rel_title: "الموثوقية", rel_desc: "يتم صيانة وفحص جميع سياراتنا بانتظام لضمان سلامتك وراحة بالك.",
      trans_title: "الشفافية", trans_desc: "لا توجد رسوم خفية. نؤمن بالتسعير الواضح والتواصل الصادق.",
      exc_title: "التميز", exc_desc: "نسعى دائمًا لتجاوز التوقعات من خلال خدمة فائقة وسيارات عالية الجودة."
    },
    choose_title: "لماذا تختارنا؟",
    choose: {
      fleet_t: "أسطول فاخر", fleet_d: "سيارات حديثة ومصانة جيدًا من أفضل الشركات المصنعة",
      support_t: "دعم على مدار الساعة", support_d: "خدمة عملاء ومساعدة على الطريق متوفرة 24/7",
      booking_t: "حجز مرن", booking_d: "حجز إلكتروني سهل مع خيارات استلام وتسليم مرنة",
      price_t: "أسعار تنافسية", price_d: "أفضل الأسعار في السوق بدون رسوم خفية",
      loc_t: "مواقع متعددة", loc_d: "نقاط استلام مريحة في جميع أنحاء المدينة",
      safety_t: "السلامة أولاً", safety_d: "تخضع جميع السيارات لفحوصات سلامة صارمة"
    },
    team_title: "فريق الإدارة",
    team_sub: "تعرف على المحترفين ذوي الخبرة الذين يقودون شركتنا.",
    ready_title: "هل أنت مستعد للبدء؟",
    ready_sub: "اختبر الفرق اليوم. تصفح أسطولنا واحجز سيارتك المثالية ببضع نقرات."
  },
  contact: {
    title: "اتصل بنا",
    subtitle: "هل لديك أسئلة؟ نحن هنا للمساعدة. أرسل لنا رسالة وسنرد عليك في أقرب وقت.",
    form_title: "أرسل رسالة",
    name: "الاسم الكامل", email: "البريد الإلكتروني", subject: "الموضوع", message: "الرسالة", send: "إرسال الرسالة",
    get_in_touch: "تواصل معنا", phone: "الهاتف", address: "العنوان", hours: "ساعات العمل", quick_links: "روابط سريعة"
  },
  booking: {
    title: "حجز",
    subtitle: "أكمل حجزك في خطوات قليلة",
    details: "تفاصيل الحجز",
    period: "فترة التأجير",
    pickup_date: "تاريخ الاستلام *", return_date: "تاريخ التسليم *",
    locations: "مواقع الاستلام والتسليم",
    pickup_loc: "موقع الاستلام *", return_loc: "موقع التسليم *",
    select_pickup: "اختر موقع الاستلام", select_return: "اختر موقع التسليم",
    summary: "ملخص الحجز",
    daily_rate: "السعر اليومي",
    subtotal: "المجموع الفرعي",
    tax: "الضريبة (7%)",
    total: "الإجمالي",
    processing: "جاري المعالجة...",
    login_to_book: "سجل الدخول للحجز",
    day: "يوم",
    days: "أيام"
  }
};

fs.writeFileSync(path.join(localesDir, 'en.json'), JSON.stringify(en, null, 2));
fs.writeFileSync(path.join(localesDir, 'fr.json'), JSON.stringify(fr, null, 2));
fs.writeFileSync(path.join(localesDir, 'ar.json'), JSON.stringify(ar, null, 2));

const i18nTs = `import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

const savedLocale = typeof window !== 'undefined' ? localStorage.getItem('locale') || 'en' : 'en';

const i18n = createI18n({
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
    ar
  },
  legacy: false
});

if (typeof window !== 'undefined') {
    document.documentElement.dir = savedLocale === 'ar' ? 'rtl' : 'ltr';
}

export default i18n;
`;
fs.writeFileSync(path.join(process.cwd(), 'resources/js/i18n.ts'), i18nTs);

let appTs = fs.readFileSync(path.join(process.cwd(), 'resources/js/app.ts'), 'utf8');
if (!appTs.includes('i18n')) {
    appTs = appTs.replace("import { createApp, h } from 'vue';", "import { createApp, h } from 'vue';\nimport i18n from './i18n';");
    appTs = appTs.replace(".use(plugin)", ".use(plugin)\n            .use(i18n)");
    fs.writeFileSync(path.join(process.cwd(), 'resources/js/app.ts'), appTs);
}

console.log('Setup finished');
