import { get, writable } from 'svelte/store';
import cookies from 'js-cookie';

export const user = writable(
  localStorage.user ? JSON.parse(localStorage.getItem('user')) : null,
);

export const cookieConsent = writable(
  cookies.get('cookieConsent') ? JSON.parse(cookies.get('cookieConsent')) : {
    necessary: true, statistics: false, marketing: false, personalization: false,
  },
);

export const lang = writable(
  get(user) ? get(user).settings.language : 'en',
);
