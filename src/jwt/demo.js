const jwt = require('jsonwebtoken');

const secret = 'com.lfo.www';
const payload = { name: 'lfp' }

function genToken(payload, options) {
    return jwt.sign(payload, secret, options)
}

function verifyToken(token) {
    try {
        return decode = jwt.verify(token, secret);
    } catch (error) {
        console.log('verify token error', error.message); // verify token error jwt expired
    }
}

// const token = genToken(payload, { expiresIn: '1s' });
// console.log('token = ', token);

async function testExp() {
    console.log(Math.floor(Date.now()/1000) + 100);
    const token = genToken(payload, { expiresIn: '100s' });
    console.log('22222', token);
    setTimeout(() => {
        console.log('33333');
        const decode = verifyToken(token) // verify token error jwt expired
        console.log('44444', decode);
    }, 2000);
    console.log(Math.floor(Date.now()/1000) + 100);
}
testExp();

function testDecode() {
    const decode = verifyToken(genToken({ name: 'lfp' }))
    console.log('decode = ', decode); // decode =  { name: 'lfp', iat: 1607764663 }
    console.log('name = ', decode.name);
}
// testDecode();