
const redis = require('ioredis');

const client = new redis({
    host: '127.0.0.1',
    port: 6379,
    password: '',
    db: 1,

});

module.exports = client;