import Axios from 'axios'

const axiosInstance = Axios.create({
    timeout:1234
})

axiosInstance.interceptors.request.use(
    (data) => {
        console.log(data)
        return data
    }
)

async function testTimeout() {
    const start = Date.now();
    await axiosInstance.post('http://www.google.com', {}, {
        // timeout: 3000,
        validateStatus: () => true
    }).catch(e => { })
    console.log('===', Date.now() - start)
}

testTimeout()