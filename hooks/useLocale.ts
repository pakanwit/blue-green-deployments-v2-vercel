import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useLocale = (country: string) => {
  const { asPath, push, locale: routerLocale } = useRouter();
  const [locale, setLocale] = useState(typeof window !== 'undefined' ? localStorage.getItem('locale') || 'en' : 'en');

  useEffect(() => {
    const browserLanguage = navigator.language;
    let localeToSet = locale;

    if (typeof window !== 'undefined' && localStorage.getItem('locale')) {
      localeToSet = localStorage.getItem('locale')!;
    } else if (browserLanguage) {
      if (browserLanguage.startsWith('en')) {
        localeToSet = 'en';
      } else if (browserLanguage.startsWith('de')) {
        localeToSet = 'de';
      } else if (browserLanguage.startsWith('fr')) {
        localeToSet = 'fr';
      } else if (browserLanguage.startsWith('es')) {
        localeToSet = 'es';
      } else if (browserLanguage.startsWith('it')) {
        localeToSet = 'it';
      } else if (browserLanguage.startsWith('nl')) {
        localeToSet = 'nl';
      } else if (browserLanguage.startsWith('ja')) {
        localeToSet = 'ja';
      } else if (browserLanguage.startsWith('sv')) {
        localeToSet = 'sv';
      } else if (browserLanguage.startsWith('fi')) {
        localeToSet = 'fi';
      } else if (browserLanguage.startsWith('nb') || browserLanguage.startsWith('nn')) {
        localeToSet = 'no';
      } else if (browserLanguage.startsWith('da')) {
        localeToSet = 'da';
      } else {
        localeToSet = 'en';
      }
    } else if (country === 'DE' || country === 'AT' || country === 'LI') {
      localeToSet = 'de';
    } else if (country === 'FR' || country === 'MC' || country === 'LU') {
      localeToSet = 'fr';
    } else if (country === 'ES' || country === 'CL' || country === 'AR') {
      localeToSet = 'es';
    } else if (country === 'IT') {
      localeToSet = 'it';
    } else if (country === 'NL' || country === 'BE') {
      localeToSet = 'nl';
    } else if (country === 'JP') {
      localeToSet = 'ja';
    } else if (country === 'SE') {
      localeToSet = 'sv';
    } else if (country === 'FI') {
      localeToSet = 'fi';
    } else if (country === 'NO') {
      localeToSet = 'no';
    } else if (country === 'DK') {
      localeToSet = 'da';
    } else {
      localeToSet = 'en';
    }

    setLocale(localeToSet);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', localeToSet);
    }
    if (routerLocale !== localeToSet) {
      push(asPath, undefined, { locale: localeToSet });
    }
  }, [country, asPath, push, locale, routerLocale]);

  return locale;
};

export default useLocale;
