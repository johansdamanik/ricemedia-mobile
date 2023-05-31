const Redis = require('ioredis')

const redis = new Redis(process.env.REDIS_SERVER);

module.exports = redis