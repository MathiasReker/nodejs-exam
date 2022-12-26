import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './scss/global.scss';

import App from './App.svelte';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
