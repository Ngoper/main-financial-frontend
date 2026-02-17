import enTranslations from './en.json';
import idTranslations from './id.json';

const translations = {
  en: enTranslations,
  id: idTranslations
};

const STORAGE_KEY = 'app_language';

// Detect language: localStorage → browser header → fallback to 'en'
const detectLanguage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && translations[stored]) return stored;
  
  const browserLang = navigator.language.split('-')[0];
  return translations[browserLang] ? browserLang : 'en';
};

let currentLanguage = detectLanguage();

// Get nested translation by key (e.g., 'auth.login.title')
export const t = (key) => {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  
  for (const k of keys) {
    value = value?.[k];
    if (!value) break;
  }
  
  // Fallback to English if translation missing
  if (!value && currentLanguage !== 'en') {
    value = translations.en;
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
  }
  
  return value || key;
};

// Switch language and persist to localStorage
export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    return true;
  }
  return false;
};

// Get current language
export const getLanguage = () => currentLanguage;

// Get available languages
export const getAvailableLanguages = () => Object.keys(translations);
