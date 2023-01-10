import { get, writable } from 'svelte/store';
import { getCookie } from './cookie';

export const user = writable(
  localStorage.user ? JSON.parse(localStorage.getItem('user')) : null,
);

export const cookieConsent = writable(
  getCookie('cookie') ?? {
    necessary: true, statistics: false, marketing: false, personalization: false,
  },
);

export const lang = writable(
  get(user) ? get(user).settings.language : 'en',
);

// TODO store webtoken in cookie, to be immune to xss
