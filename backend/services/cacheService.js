import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

export const setCache = (key, value) => {
  cache.set(key, value);
};

export const getCache = (key) => {
  return cache.get(key);
};
