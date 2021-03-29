const moment = require('moment');

(() => {
    const timezone = '+08:00'
    const _timezone = 8;
    // const timezone = '+00:00';
    // const _timezone = 0;


    let date = Date.now();
    console.log('date = ', new Date());

    const LTZ = -new Date().getTimezoneOffset() / 60
    console.log('本地时区 = ', LTZ);
    console.log('timezone = ', timezone);
    console.log('getTimezoneOffset = ', new Date().getTimezoneOffset());
    console.log('utcOffset = ', moment().utcOffset());
    console.log('moment = ',moment());
    date = moment(date).utcOffset(timezone);
    console.log('偏移 =', moment().utcOffset(timezone));

    console.log('date = ', date)
    console.log('date.format = ', date.format('YYYY-MM-DD HH:mm:ss'));
})()