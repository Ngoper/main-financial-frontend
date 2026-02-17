import React from 'react';
import { useTranslation } from '../../i18n/TranslationContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-gray-900 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 hover:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
    >
      <option value="en">EN</option>
      <option value="id">ID</option>
    </select>
  );
};
