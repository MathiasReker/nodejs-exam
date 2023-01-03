import { writable } from 'svelte/store';

export const user = writable(
  localStorage.user ? JSON.parse(localStorage.getItem('user')) : null,
);

export const apiBaseUrl = writable('http://localhost:3000'); // TODO move to env?
