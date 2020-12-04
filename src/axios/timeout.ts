import Axios from 'axios'

const axiosInstance = Axios.create({
    timeout: 3333
})

axiosInstance.interceptors.request.use(
    (data) => {
        console.log(data)
        return data
    }
)

async function testTimeoutPost() {
    const start = Date.now();
    await axiosInstance.post('http://www.google.com', {}, {
        // timeout: 3000,
        validateStatus: () => true
    }).catch(e => { console.log('e = ', e.stack); })
    console.log('===', Date.now() - start)
}

async function testTimeoutGet() {
    const start = Date.now();
    await axiosInstance.get('http://localhost:2999/test/').catch(e => { console.log('e = ', e.stack); })
    console.log('===', Date.now() - start)
}

testTimeoutGet()