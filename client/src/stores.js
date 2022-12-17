import { writable } from 'svelte/store';

export const user = writable(
  localStorage.user ? JSON.parse(localStorage.getItem('user')) : null,
);

export const baseUrl = writable('http://localhost:3000');
