import { prefs } from './prefs.js';

document.documentElement.dataset.pointer = prefs.fine ? 'fine' : 'coarse';
