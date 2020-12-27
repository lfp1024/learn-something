'use strict';

const ChatBot = require('dingtalk-robot-sender');
const PriorityQueue = require('./priority-queue');

const mobiles = {
    default: '1xxxxx',
};
const MAX_TIMES_PER_MIN = 20;
const LT_ONE_MIN = 1000 * 58;
const GT_ONE_MIN = 1000 * 62;
const ONE_MIN = 1000 * 60;
const DING_TALK_LIMIT_CODE = 1111;
const DING_TALK_WARN_CODE = 130101;
const WHILE_LOOP_SLEEP = 500;

const sleep = (time) => new Promise(res => setTimeout(res, time));

const centerExceptionRobot = 'https://oapi.dingtalk.com/robot/send?access_token=afa5ee1021e4b3f516395c5';
const keyWords = '中常'
const accountExceptionRobot = 'https://oapi.dingtalk.com/robot/send?access_token=60513ed8b56b21518b4921';
const keyWords2 = '分常'

class DingTalkRobot {

    #msgTimeStampList = [];

    constructor() {
        this.priorityQueue = new PriorityQueue();
        this.robot = new ChatBot({
            webhook: centerExceptionRobot,
        });
        this.send();
    }

    addMsgTimeStamp(timeStamp) {
        if (!timeStamp) return;
        this.#msgTimeStampList.push(timeStamp);
        if (this.#msgTimeStampList.length > MAX_TIMES_PER_MIN) this.#msgTimeStampList.shift();
    }

    async sendText(content, priority = 0, ...atList) {
        atList.push('default');
        const at = {
            atMobiles: atList.map(ele => mobiles[ele]),
            isAtAll: false,
        };
        const data = {
            content: keyWords + ':' + content,
            at,
        }
        this.priorityQueue.enter(data, priority)
    }

    async send() {
        while (true) {
            if (this.priorityQueue.size() === 0) {
                await sleep(WHILE_LOOP_SLEEP);
                continue;
            }
            const firstMsgTimeStamp = this.#msgTimeStampList[0] ? this.#msgTimeStampList[0] : 0;
            const timeDiff = Date.now() - firstMsgTimeStamp;
            if (this.#msgTimeStampList.length === MAX_TIMES_PER_MIN && timeDiff < LT_ONE_MIN) { // 第21条发送时间在1分以内
                await sleep(GT_ONE_MIN - timeDiff);
            }
            this.addMsgTimeStamp(Date.now());
            const data = this.priorityQueue.leave();
            const res = await this.robot.text(data.content, data.at);
            if (res.data.errcode && res.data.errcode !== 0) {
                console.warn(`DING TALK MESSAGE SEND WARNING, wait 1 mins. RESPONSE: ${JSON.stringify(res.data)}`)
                await sleep(ONE_MIN);
            }
            if (res.data.status === DING_TALK_LIMIT_CODE) {
                console.warn(`DING TALK MESSAGE SEND TOO FAST, wait ${res.data.wait} mins. RESPONSE: ${JSON.stringify(res.data)}`)
                await sleep(res.data.wait * ONE_MIN)
            }
        }
    }
}

const dingTalkRobot = new DingTalkRobot();

module.exports = dingTalkRobot;
