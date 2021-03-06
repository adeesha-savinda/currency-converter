const redis = require('redis');
const config = require('config');

module.exports = {
    init() {
        const redisClient = redis.createClient({
            host: config.redis.host,
            port: config.redis.port
        });

        redisClient.on('error', err => {
            console.log('Redis connection error', err);
        });

        redisClient.on('connect', () => {
            console.log('***** Connected to Redis *****');
        });

        return redisClient;
    }
};