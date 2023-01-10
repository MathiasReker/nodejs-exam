import '@fontsource/chivo/400.css';
import '@fontsource/playfair-display/700.css';
import './scss/global.scss';

import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
