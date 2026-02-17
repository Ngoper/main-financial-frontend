import React, { createContext, useContext, useState, ReactNode } from 'react';
import { t as translate, setLanguage as changeLanguage, getLanguage, getAvailableLanguages } from './translate';

interface TranslationContextType {
  t: typeof translate;
  language: string;
  setLanguage: (lang: string) => void;
  availableLanguages: string[];
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState(getLanguage());

  const setLanguage = (lang: string) => {
    if (changeLanguage(lang)) {
      setLanguageState(lang);
      window.location.reload();
    }
  };

  return (
    <TranslationContext.Provider value={{ t: translate, language, setLanguage, availableLanguages: getAvailableLanguages() }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};
