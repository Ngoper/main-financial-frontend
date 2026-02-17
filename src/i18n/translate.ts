import enTranslations from './en.json';
import idTranslations from './id.json';

type TranslationObject = Record<string, any>;

interface Translations {
  [key: string]: TranslationObject;
}

const translations: Translations = {
  en: enTranslations,
  id: idTranslations
};

const STORAGE_KEY = 'app_language';

const detectLanguage = (): string => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && translations[stored]) return stored;
  
  const browserLang = navigator.language.split('-')[0];
  return translations[browserLang] ? browserLang : 'en';
};

let currentLanguage = detectLanguage();

export const t = (key: string): string => {
  const keys = key.split('.');
  let value: any = translations[currentLanguage];
  
  for (const k of keys) {
    value = value?.[k];
    if (!value) break;
  }
  
  if (!value && currentLanguage !== 'en') {
    value = translations.en;
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
  }
  
  return value || key;
};

export const setLanguage = (lang: string): boolean => {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    return true;
  }
  return false;
};

export const getLanguage = (): string => currentLanguage;

export const getAvailableLanguages = (): string[] => Object.keys(translations);
