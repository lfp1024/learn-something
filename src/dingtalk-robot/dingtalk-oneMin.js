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

const centerExceptionRobot = 'https://oapi.dingtalk.com/robot/send?access_token=lfpd218affec50df80ab1f6e379361c0ed3dc2024967e5c97f4f9c9dd29ebcb1106';
const keyWords = '测试'

const centerExceptionRobot = 'https://oapi.dingtalk.com/robot/send?access_token=lfp4b53a04bcb0e16ed68322088c94ce5fa8bdb2bc4d751b38b9f8270d39cc512d6';
const keyWords = '测试2';

/**
 * 如果第一次启动，发送了20条消息，马上重启，会出现警告（被警告的消息会丢失），注意重启
 */

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
        console.log('msg timestamp list =', this.#msgTimeStampList);
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
            console.log('发送时差 =', timeDiff);
            if (this.#msgTimeStampList.length === MAX_TIMES_PER_MIN && timeDiff < LT_ONE_MIN) { // 第21条发送时间在1分以内
                console.log('一分钟内超过20条，等待 %s 秒', (GT_ONE_MIN - timeDiff) / 1000);
                await sleep(GT_ONE_MIN - timeDiff);
            }
            this.addMsgTimeStamp(Date.now());
            const data = this.priorityQueue.leave();
            const res = await this.robot.text(data.content, data.at);
            if (res.data.errcode && res.data.errcode === DING_TALK_WARN_CODE) {
                console.warn(`DING TALK MESSAGE SEND WARNING, wait 1 mins. RESPONSE: ${JSON.stringify(res.data)}`)
                await sleep(ONE_MIN);
            } else if (res.data.status === DING_TALK_LIMIT_CODE) {
                console.warn(`DING TALK MESSAGE SEND TOO FAST, wait ${res.data.wait} mins. RESPONSE: ${JSON.stringify(res.data)}`)
                await sleep(res.data.wait * ONE_MIN)
            }
        }
    }
}

const dingTalkRobot = new DingTalkRobot();

module.exports = dingTalkRobot;
