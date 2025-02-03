import NodeCache from 'node-cache';

// Create a cache instance with a TTL of 30 minutes (1800 seconds)
const cache = new NodeCache({ stdTTL: 1800 });
export default cache;
