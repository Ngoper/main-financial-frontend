# Translation System Usage

## How to Use in Components

### Basic Usage

```jsx
import { useTranslation } from '../i18n/TranslationContext';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('auth.login.title')}</h1>
      <button>{t('common.submit')}</button>
    </div>
  );
};
```

### Language Switcher Component

```jsx
import { useTranslation } from '../i18n/TranslationContext';

const LanguageSwitcher = () => {
  const { language, setLanguage, availableLanguages } = useTranslation();
  
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {availableLanguages.map(lang => (
        <option key={lang} value={lang}>
          {lang === 'en' ? 'English' : 'Bahasa Indonesia'}
        </option>
      ))}
    </select>
  );
};
```

## Adding New Translations

1. Add the key-value pair to both `en.json` and `id.json`
2. Use the key in your component with `t('your.new.key')`

Example:
```json
// en.json
{
  "profile": {
    "title": "Profile",
    "edit": "Edit Profile"
  }
}

// id.json
{
  "profile": {
    "title": "Profil",
    "edit": "Edit Profil"
  }
}
```

## Language Detection Priority

1. **localStorage** - Checks for saved language preference
2. **Browser Header** - Uses `navigator.language`
3. **Fallback** - Defaults to English ('en')

## Features

- ✅ Automatic language detection
- ✅ Persistent language preference (localStorage)
- ✅ Fallback to English for missing translations
- ✅ Nested key support (e.g., 'auth.login.title')
- ✅ Easy language switching
- ✅ TypeScript compatible
