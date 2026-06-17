import { on } from './events.js';

export function setupAlerts() {
  const container = document.querySelector('#alerts');

  on('alert', ({ type, message }) => {
    const el = document.createElement('div');
    el.className = `alert ${type}`;
    el.textContent = message;

    container.appendChild(el);

    setTimeout(() => {
      el.classList.add('fade-out');
      setTimeout(() => el.remove(), 300);
    }, 3000);
  });
}