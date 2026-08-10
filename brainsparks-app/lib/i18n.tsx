import React, { useEffect, useState } from 'react';
import en from '../locales/en.json';
import id from '../locales/id.json';

type Locale = 'en' | 'id';
const resources: Record<Locale, Record<string, string>> = {
  en,
  id,
};

// global locale state to keep instances in sync
let globalLocale: Locale = (typeof window !== 'undefined' && (localStorage.getItem('locale') as Locale)) || 'en';

const setGlobalLocale = (loc: Locale) => {
  globalLocale = loc;
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', loc);
    window.dispatchEvent(new CustomEvent('localeChange', { detail: loc }));
  }
};

export const useI18n = () => {
  const [locale, setLocaleState] = useState<Locale>(() => globalLocale);

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<string>;
      const newLoc = (ev && (ev.detail as Locale)) || (localStorage.getItem('locale') as Locale) || 'en';
      setLocaleState(newLoc);
    };

    window.addEventListener('localeChange', handler as EventListener);
    return () => window.removeEventListener('localeChange', handler as EventListener);
  }, []);

  const setLocale = (loc: Locale) => {
    setGlobalLocale(loc);
    setLocaleState(loc);
  };

  const t = (key: string) => {
    return resources[locale]?.[key] ?? resources['en'][key] ?? key;
  };

  return { t, locale, setLocale } as const;
};

export const LanguageSwitcher: React.FC = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLocale('en')}
        className={`text-xs px-2 py-1 rounded ${locale === 'en' ? 'bg-white text-indigo-600' : 'text-slate-500'}`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale('id')}
        className={`text-xs px-2 py-1 rounded ${locale === 'id' ? 'bg-white text-indigo-600' : 'text-slate-500'}`}
      >
        ID
      </button>
    </div>
  );
};

export default useI18n;
