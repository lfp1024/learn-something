'use strict';

const client = require('./client');

(async () => {
    const res = await client.hget('lfo', 'age');
    console.log('res = ', res, typeof res, res === null, 'a' === null);

    await client.hincrby('lfo', 'age', 2);
    const res2 = await client.hget('lfo', 'age');
    console.log('res = ', res2, typeof res2, res2 === null, 'a' === null);

    await client.hincrby('lfo', 'age', -1);
    const res3 = await client.hget('lfo', 'age');
    console.log('res = ', res3, typeof res3, res3 === null, 'a' === null);
})()