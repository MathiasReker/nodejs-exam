import { get, writable } from 'svelte/store';

export const user = writable(
  localStorage.user ? JSON.parse(localStorage.getItem('user')) : null,
);

export const lang = writable(
  get(user) ? get(user).settings.language : 'en',
);

// TODO store webtoken in cookie, to be immune to xss
