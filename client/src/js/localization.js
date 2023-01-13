import { derived, get, writable } from 'svelte/store';
import translations from './translations';
import { user } from './stores';

export const locale = writable(
  get(user) ? get(user).settings.language : 'en',  // TODO default browser language
);
// TODO rename translate to localization?
export const locales = [
  {
    iso: 'en',
    img: '🇬🇧',
    language: 'English', // TODO translate
  },
  {
    iso: 'da',
    img: '🇩🇰',
    language: 'Danish',  // TODO translate
  },
];

function translate(locale, key, vars) {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.
  if (!key) throw new Error('no key provided to $t()');
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // Grab the translation from the translations object.
  let text = translations[locale][key];

  if (!text) throw new Error(`no translation found for ${locale}.${key}`);

  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, 'g');
    text = text.replace(regex, vars[k]);
  });

  return text;
}

export const t = derived(locale, ($locale) => (key, vars = {}) => translate($locale, key, vars));
