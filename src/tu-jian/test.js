'use strict'

const axios = require('axios').default;
const fsp = require('fs/promises');
const path = require('path');

const imageFile = './a.gif';

(async () => {
    const buff = await fsp.readFile(path.join(__dirname, imageFile))
    const base64Data = buff.toString('base64');
    console.log('length = ', base64Data.length);
    const res = await axios.post('http://localhost:8090/api/image-recognition', { imageType: 'gif', image: base64Data })
        .catch(err => console.log(err));
    console.log('res = ', JSON.stringify(res.data));
    await new Promise(res => setTimeout(res, 2000));
    const res2 = await axios.post('http://localhost:8090/api/image-error', { id: res.data.data.id })
        .catch(err => console.log(err));
    console.log('res2 = ', JSON.stringify(res2.data));
})();

// (async () => {
//     const res = await axios.post('http://localhost:8090/api/image-error', { id: "d142c195ba4d405d9a341a87448efb7c" })
//         .catch(err => console.log(err));
//     console.log('res = ', JSON.stringify(res.data));
// })();

// (async () => {
//     const res = await axios.get('http://localhost:8090/api/image-balance')
//         .catch(err => console.log(err));
//     console.log('res = ', JSON.stringify(res.data));
// })();