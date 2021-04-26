/**
 * install: npm i dayjs
 * github: https://github.com/iamkun/dayjs
 * docs: https://dayjs.gitee.io/zh-CN/
 */

const dayjs = require('dayjs');

// console.log(dayjs()); // dayjs() 返回一个新的 Day.js 对象
// console.log(dayjs(new Date()));
// console.log(dayjs(undefined));
// d {
//     '$L': 'en',
//     '$d': 2021-04-15T09:40:10.320Z,
//     '$x': {},
//     '$y': 2021,
//     '$M': 3,
//     '$D': 15,
//     '$W': 4,
//     '$H': 17,
//     '$m': 40,
//     '$s': 10,
//     '$ms': 320
//   }

console.log('dayjs().format() = ', dayjs().format()); // 2021-04-15T17:14:07+08:00 默认使用用户本地时区来解析和展示时间

console.log('dayjs().add() = ', dayjs('1970-1-1').add(1, 'day').format());

function getContinualDate(startDate, interval, unit) {

    let n = 0;
    let _startDate = startDate;
    while (n < 10) {
        n += 1;
        const date = dayjs(_startDate).add(interval, unit).format();
        _startDate = date;
        console.log('date = ', typeof date, date);
    }
}

getContinualDate('1970-1-1', 1, 'day');