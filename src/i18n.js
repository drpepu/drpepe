import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationENGLISH from './locales/english/translation.json';
import translationCHINESE from './locales/chinese/translation.json'
import translationKOREAN from './locales/korean/translation.json';


const resources = {
  english: { translation: translationENGLISH },
  chinese: { translation: translationCHINESE },
  korean: { translation: translationKOREAN }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'english', // Default language
    fallbackLng: 'english', // Fallback language
    interpolation: {
      escapeValue: false // React already escapes by default
    }
  });

export default i18n;
