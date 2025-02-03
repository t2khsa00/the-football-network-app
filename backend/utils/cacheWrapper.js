// utils/cacheWrapper.js
import cache from '../services/cache.js';

/**
 * withCacheAndSocket - A reusable helper to fetch data with caching and emit updates via WebSockets.
 *
 * @param {string} cacheKey - A unique key to store/retrieve the data from the cache.
 * @param {function} fetchFunction - A function that returns a Promise resolving to the fresh data.
 * @param {object} req - The Express request object (needed to access app.locals.io for Socket.io).
 * @param {string} [socketEvent] - (Optional) The name of the Socket.io event to emit when fresh data is fetched.
 *
 * @returns {Promise<any>} - The cached or freshly fetched data.
 */
export const withCacheAndSocket = async (cacheKey, fetchFunction, req, socketEvent) => {
  // Check if the data is in cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`Serving from cache for key: ${cacheKey}`);
    return cachedData;
  }

  // If not cached, fetch fresh data
  const data = await fetchFunction();

  // Store data in cache
  cache.set(cacheKey, data);
  console.log(`Data cached for key: ${cacheKey}`);

  // Emit the data via WebSocket if an event name is provided and the Socket.io instance is available
  if (socketEvent && req.app && req.app.locals && req.app.locals.io) {
    req.app.locals.io.emit(socketEvent, data);
    console.log(`Emitted socket event "${socketEvent}" for key: ${cacheKey}`);
  }

  return data;
};
