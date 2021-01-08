const iconv = require('iconv-lite');
const fs = require('fs');

// 写
// const str = '国庆节万岁'
// let b = iconv.encode(str, 'GBK') // b是一个buffer，存储的是str的GB2312编码的二进制
// console.log('b = ', b);
// fs.writeFile('./xx.txt', b, () => { }) // 将str的GB2312编码数据写入到文件中

// 读
let data = fs.readFileSync('./test.txt') // 假设txt是GB2312编码的，data是一个buffer，存储GB2312编码的字符串数据
console.log('data = ', data);
let s = iconv.decode(data, 'GBK') // 将buffer解码为string
console.log('s = ', s);
// // 拿到一个buffer欲将它转为string，必须先知道它的编码类型
