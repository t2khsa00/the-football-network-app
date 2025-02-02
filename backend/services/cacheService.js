const cache = new Map();

export const setCache = (key, value) => {
  cache.set(key, { value, timestamp: Date.now() });
};

export const getCache = (key) => {
  const cached = cache.get(key);
  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > 3600000; // 1 hour
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return cached.value;
};