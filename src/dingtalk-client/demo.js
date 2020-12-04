'use strict';
const DingTalk = require('node-dingtalk');
const dingtalk = new DingTalk({
  corpid: 'dingf8',
  corpsecret: '',
});

const deparment = dingtalk.department.get('1');
console.log(deparment);