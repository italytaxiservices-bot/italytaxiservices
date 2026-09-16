import EventEmitter from 'events'

export async function register() {
  // Increase default max listeners to prevent warning spam from concurrent
  // compressed responses in dev mode (Gzip drain listeners).
  EventEmitter.defaultMaxListeners = 30
}
