'use strict';

const ChatBot = require('dingtalk-robot-sender');
// 直接使用 webhook
const robot = new ChatBot({
    webhook: 'https://oapi.dingtalk.com/robot/send?access_token=60513e23eaf284b06aded8b56b21518b4921'
});

let content = '分异：abcd112';
let at = {
    "atMobiles": [
        "177",
    ],
    "isAtAll": false
};
// 快速发送文本消息
(async () => {
    let i = 1
    new Array(1).fill(null).forEach(async () => {
        const res = await robot.text(`分发异常：${i}`, at);
        console.log('res= ', i++, res.data, res.status);

        // { errcode: 0, errmsg: 'ok' }

        // {
        //     errcode: 310000,
        //     errmsg: 'keywords not in content, more: [https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq]'
        // }

        // {
        //     status: 1111,
        //     wait: 5,
        //     source: 'x5',
        //     punish: 'deny',
        //     uuid: '24ce64f68ff5dc054dca012fc3931165'
        // }

        // {
        //     errcode: 130101,
        //     errmsg: 'send too fast, exceed 20 times per minute'
        // }
    })
})();


let link = {
    "text": "分发异常，这个即将发布的新版本，创始人陈航（花名“无招”）称它为“红树林”。而在此之前，每当面临重大升级，产品经理们都会取一个应景的代号，这一次，为什么是“红树林”？",
    "title": "时代的火车向前开",
    "picUrl": "",
    "messageUrl": "https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI"
};
// robot.link(link);

let title = '杭州天气';
let text = "#### 分发异常 @156xxxx8827\n" +
    "> 9度，西北风1级，空气良89，相对温度73%\n\n" +
    "> ![screenshot](http://image.jpg)\n" +
    "> ###### 10点20分发布 [天气](http://www.thinkpage.cn/) \n";
let at2 = {
    "atMobiles": [
        "156xxxx8827",
        "189xxxx8325"
    ],
    "isAtAll": false
};
// robot.markdown(title, text, at2);

let card = {
    "title": "乔布斯 20 年前想打造一间苹果咖啡厅，而它正是 Apple Store 的前身",
    "text": `分发异常![screenshot](@lADOpwk3K80C0M0FoA) 
                  ### 乔布斯 20 年前想打造的苹果咖啡厅 
                  Apple Store 的设计正从原来满满的科技感走向生活化，而其生活化的走向其实可以追溯到 20 年前苹果一个建立咖啡馆的计划`,
    "hideAvatar": "0",
    "btnOrientation": "0",
    "btns": [
        {
            "title": "内容不错",
            "actionURL": "https://www.dingtalk.com/"
        },
        {
            "title": "不感兴趣",
            "actionURL": "https://www.dingtalk.com/"
        }
    ]
};
// robot.actionCard(card);


let links = [
    {
        "title": "分发异常 时代的火车向前开",
        "messageURL": "https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI",
        "picURL": "https://www.dingtalk.com/"
    },
    {
        "title": "时代的火车向前开2",
        "messageURL": "https://mp.weixin.qq.com/s?__biz=MzA4NjMwMTA2Ng==&mid=2650316842&idx=1&sn=60da3ea2b29f1dcc43a7c8e4a7c97a16&scene=2&srcid=09189AnRJEdIiWVaKltFzNTw&from=timeline&isappinstalled=0&key=&ascene=2&uin=&devicetype=android-23&version=26031933&nettype=WIFI",
        "picURL": "https://www.dingtalk.com/"
    }
]
// robot.feedCard(links);