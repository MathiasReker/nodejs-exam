import { get } from 'svelte/store';
import { navigate } from 'svelte-navigator';
import { user } from './stores';

const openEndpoints = [
  '/reset-password',
  '/contact',
  '/about',
];

const authNavigator = () => {
  if (!get(user)) {
    if (!openEndpoints.includes(window.location.pathname)) {
      navigate('/signin', { replace: true });
    }
  }
};

export default authNavigator;
