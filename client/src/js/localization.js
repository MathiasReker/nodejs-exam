import { derived, get, writable } from 'svelte/store';
import translations from './translations';
import { user } from './stores';

export const locales = [
  {
    iso: 'en',
    img: '🇬🇧',
    language: 'English',
  },
  {
    iso: 'da',
    img: '🇩🇰',
    language: 'Dansk',
  },
];

const supportedLanguages = ['en', 'da'];

const browserLanguage = window.navigator.language.split('-')[0];

const defaultLanguage = supportedLanguages.includes(browserLanguage)
  ? browserLanguage
  : locales[0].iso;

export const locale = writable(
  get(user)
    ? get(user).settings.language
    : defaultLanguage,
);

const translate = (locale, key, variables) => {
  if (!key) throw new Error('No key provided to $t()');
  if (!locale) throw new Error(`No translation for key "${key}"`);

  // Grab the translation from the translations object.
  let text = translations[locale][key];

  if (!text) throw new Error(`No translation found for ${locale}.${key}`);

  // Replace any passed in variables in the translation string.
  Object.keys(variables).map((variable) => {
    const regex = new RegExp(`{{${variable}}}`, 'g');
    text = text.replace(regex, variables[variable]);
  });

  return text;
};

export const t = derived(locale, ($locale) => (key, vars = {}) => translate($locale, key, vars));
