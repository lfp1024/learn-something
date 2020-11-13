'use strict';

const ChatBot = require('dingtalk-robot-sender');

const robot = new ChatBot({
    webhook: 'https://oapi.dingtalk.com/robot/send?access_token=60513e23eaf284b07118731d76c636e9cea21f3c1c656aded8b56b21518b4921',
});
const mobiles = {
    lfp: '17603056467',
};
const MAX_SEND_NUM = 15;
const ONE_MIN = 1000 * 60;
const DING_TALK_ERR_CODE = 1111;

const sleep = (time) => new Promise(res => {
    setTimeout(() => {
        res();
    }, time);
})

class DingTalkRobot {
    #msgSum = {};
    #oldMinFlag = '';
    #lock = false;
    #waitTimeInMsec = 1000;
    #waitTimeIntervalInMsec = 500;

    async sendText(content, ...atList) {
        if (this.#lock) {
            console.log('等待时间', this.#waitTimeInMsec)
            this.#waitTimeInMsec += this.#waitTimeIntervalInMsec;
            await sleep(this.#waitTimeInMsec);
            return this.sendText(content, atList);
        }
        this.#lock = true;
        const t = new Date();
        t.setMinutes(new Date().getMinutes());
        t.setSeconds('00')
        const minFlag = t.toLocaleString();
        console.log('=====msgSum==1=====', this.#msgSum)
        if (this.#msgSum[minFlag]) {
            if (this.#msgSum[minFlag] > MAX_SEND_NUM) {
                console.log('==============================发送频率太快');
                const t2 = new Date();
                t2.setMinutes(new Date().getMinutes() + 1);
                t2.setSeconds('00');
                console.log('t2 = =',t2.toLocaleString())
                const waitTimeInMsec = t2.getTime() - Date.now();
                await sleep(waitTimeInMsec)
                return;
            }
        } else {
            delete this.#msgSum[this.#oldMinFlag];
            this.#msgSum[minFlag] = 0;
            this.#oldMinFlag = minFlag;
        }
        console.log('=====msgSum===2====', this.#msgSum)
        const at = {
            atMobiles: atList.map(ele => mobiles[ele]),
            isAtAll: false,
        };
        const res = await robot.text(content, at);
        if (res.data.status === DING_TALK_ERR_CODE) {
            console.log(`send too fast, wait ${res.data.wait} mins`)
            const waitTime = res.data.wait * ONE_MIN
            this.#waitTimeInMsec = waitTime;
            await sleep(waitTime)
        }
        this.#msgSum[minFlag] += 1;
        console.log('=====msgSum===3====', this.#msgSum)
        this.#lock = false;
    }
}

const dingTalkRobot = new DingTalkRobot();

module.exports = dingTalkRobot;
