'use strict';

const bcrypt = require('bcrypt');

(async () => {
    const password = 'lfp111';
    const salt = await bcrypt.genSalt();
    console.log('salt = ', salt);
    const result = await bcrypt.hash(password, salt);
    console.log('result = ', result);
    const isRight = await bcrypt.compare('password', result);
    console.log('is right = ', isRight);
})()

// salt =  $2b$10$oz8T6/kWKJ5siYBCf9iX0.
// result =  $2b$10$oz8T6/kWKJ5siYBCf9iX0.rQuDuPUkltAEMkZNbqfjsg7jzu1d60W // 加密后的字符串包含 salt，可直接对密码进行校验
// is right =  false