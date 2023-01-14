import { writable } from 'svelte/store';
import cookies from 'js-cookie';

export const cookieConsent = writable(
  cookies.get('cookieConsent')
    ? JSON.parse(cookies.get('cookieConsent'))
    : {
      necessary: true,
      statistics: false,
      marketing: false,
      personalization: false,
    },
);
