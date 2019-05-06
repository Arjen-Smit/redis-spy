const redis = require("redis");

const redisClient = redis.createClient('redis://redis');

redisClient.on("message", function (channel, message) {
    try {
        console.group(channel);
        console.log(JSON.parse(message));
        console.groupEnd();
    } catch (e) {
        console.error(e);
    }
});

process.argv.forEach(function (val, index, array) {
    if (index >= 2) {
        const channel = val;
        redisClient.subscribe(channel);
        console.log('listening on channel : ' + channel);
    }
});
