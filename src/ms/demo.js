
'use strict'

const ms = require('ms');


(() => {
    console.log('ms= ', ms('1h')); // ms =  3600000
    console.log('ms2 = ', ms(1000)); // ms2 =  1s
    console.log('ms3 = ', ms(2000, { long: true })); // ms3 =  2 seconds
})()