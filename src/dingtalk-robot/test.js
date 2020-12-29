const dingTalkRobot = require('./dingtalk-oneMin');

(async () => {
    try {
        const res = 0 / a
        console.log(res)
    } catch (error) {
        console.log('error', error)
        console.log('error', error.stack)
        console.log('error', JSON.stringify(error))
        new Array(100).fill(null).forEach(async (ele, index) => {
            // const s = Math.floor(Math.random() * 10)
            const s = 1;
            await dingTalkRobot.sendText(`${index} ,p=${s}：\n${error.stack}`, s, 'lfp')
            console.log('index = ', index)
        })
    }
})()