import { initAddListener } from './modules/initListeners.js';
import { renderComments } from './modules/renderComments.js';

renderComments();
initAddListener(renderComments);