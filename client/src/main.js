import '@fontsource/chivo/400.css';
import '@fontsource/playfair-display/700.css';
import './scss/global.scss';
// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap';

import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
