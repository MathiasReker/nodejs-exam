import { get } from 'svelte/store';
import { user } from './stores';

export const request = async (path, options = {}) => {
  const {
    headers,
    query = null,
    method = 'GET',
    body,
  } = options;

  const reqOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (get(user)) {
    reqOptions.headers['auth-token'] = get(user).token;
  }

  if (body) {
    reqOptions.body = typeof body === 'object' ? JSON.stringify(body) : body;
  }

  let queryString = '';

  // Convert to encoded string and prepend with ?
  if (query) {
    queryString = new URLSearchParams(query).toString();
    queryString = `?${queryString}`;
  }

  const fetchWrapper = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}${queryString}`, reqOptions);

  return fetchWrapper.json();
};
