'use strict';

const client = require('./client');

(async () => {
    const res = await client.get('lfoo');
    console.log('res = ', res, typeof res);
    await client.set('lfoo', 1);
    const res2 = await client.get('lfoo');
    console.log('res2 = ', res2, typeof res2);
})();

// res =  null object
// res2 =  1 string



