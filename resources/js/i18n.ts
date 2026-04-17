import { createI18n } from 'vue-i18n';
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
