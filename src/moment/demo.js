const moment = require('moment');

(() => {
    const t = Date.now();
    console.log('t = ', t);
    const res = moment(t);
    console.log('res = ', res.())
})()