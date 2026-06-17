// Eventhandler
const listeners = {};

export function on(event, handler) {
  listeners[event] = listeners[event] || [];
  listeners[event].push(handler);
}

export function emit(event, payload) {
  (listeners[event] || []).forEach(h => h(payload));
}