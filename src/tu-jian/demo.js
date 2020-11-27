'use strict'

const axios = require('axios').default;
const fsp = require('fs/promises');
const path = require('path');

const imageFile = './a.gif'
const username = 'xxxx';
const password = 'xxxx#';

const apiUrl = 'http://api.ttshitu.com/base64'; // 通用
// (async () => {
    // const buff = await fsp.readFile(path.join(__dirname, imageFile))
    // const base64Data = buff.toString('base64');
    // console.log('length = ',base64Data.length);
    // const res = await axios.post(apiUrl, {
    //     username,
    //     password,
    //     typeid: '4',
    //     image: base64Data,
    // });
    // console.log('res', JSON.stringify(res.data))
    // console.log('res2 = ', res.data.success)
    // console.log('res3 = ', res.data.message)
// })()
//=> {"success":true,"code":"0","message":"success","data":{"result":"5a83n2","id":"b2488c8070bb47ef86bd39c0a15503f0"}}

const errUrl = 'http://api.ttshitu.com/reporterror.json';
// (async () => {
//     const res = await axios.post(errUrl, {
//         id: 'a5676789cbd3415cb712ed40b398833a'
//     })
//     console.log('res = ', JSON.stringify(res.data))
// })()
// => res =  {"success":false,"code":"-1","message":"不存在的报错ID，或已经超过允许报错的时间范围","data":""}

const balanceUrl = `http://api.ttshitu.com/queryAccountInfo.json?username=${username}&password=${password}`;
// console.log('url = ', balanceUrl);
// (async () => {
//     const res = await axios.get(balanceUrl);
//     console.log('res = ', JSON.stringify(res.data))
// })()
// => res =  {"success":true,"code":"0","message":"success","data":{"balance":"83.798","consumed":"942.202","successNum":"669287","failNum":"0"}}