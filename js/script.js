import { initCommon } from './index.js';
import { initSlider } from './slider.js';
import { initForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  initCommon();
  initSlider();
  initForm();
});