var Imap = require('imap')
var MailParser = require("mailparser").MailParser
var fs = require("fs")
const cheerio = require('cheerio');

var imap = new Imap({
    user: 'moonchole@outlook.com', //你的邮箱账号
    password: 'sun45689', //你的邮箱密码
    host: 'outlook.office365.com', //邮箱服务器的主机地址
    port: 993, //邮箱服务器的端口地址
    tls: true, //使用安全传输协议
    tlsOptions: { rejectUnauthorized: false } //禁用对证书有效性的检查
});

async function getUrl() {

    return await new Promise(res => {

        imap.once('error', function (err) {
            console.log(err);
        });

        imap.once('end', function () {
            console.log('关闭邮箱');

        });

        imap.once('ready', function () {
            imap.openBox('INBOX', true, function (err, box) {

                console.log("打开邮箱")

                if (err) throw err;

                // ,['FROM','Amazon'] ,['FROM','PayPal']
                imap.search(['UNSEEN', ['SINCE', 'Dec 7 2020']], function (err, results) {//搜寻2017-05-20以后未读的邮件

                    if (err) throw err;
                    console.log('results = ', results);
                    // results =  [ 6711, 6719 ] 可能是邮件的uid,根据条件查到几个邮件，就有几个uid
                    if (results.length === 0) {
                        imap.end();
                        return
                    };
                    var f = imap.fetch(results, { bodies: '' });//抓取邮件（默认情况下邮件服务器的邮件是未读状态）

                    f.on('message', function (msg, seqno) {

                        var mailparser = new MailParser();

                        msg.on('body', function (stream, info) {

                            stream.pipe(mailparser);//将为解析的数据流pipe到mailparser

                            //邮件头内容
                            mailparser.on("headers", function (headers) {
                                console.log("邮件头信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                                console.log("subject: " + headers.get('subject'));
                                console.log("from: " + headers.get('from').text);
                                console.log("to: " + headers.get('to').text);
                                // Mon Dec 07 2020 16:53:26 GMT+0800 (中国标准时间) 2020-12-07T08:53:26.000Z
                                console.log("date: " + headers.get('date'), new Date(headers.get('date')).toISOString());
                                // console.log('received: ' + headers.get('received'));
                                // console.log('message-id: ' + headers.get('message-id'));
                            });

                            //邮件内容

                            mailparser.on("data", function (data) {
                                if (data.type === 'text') {//邮件正文
                                    console.log("邮件内容信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                                    // console.log("邮件内容: " + data.html);
                                    let $ = cheerio.load(data.html);
                                    const code = $('tbody tr')[10].children[1].children[1].children[7].children[0].data;
                                    console.log('code============ \n', code);
                                    res(code);
                                }
                                // if (data.type === 'attachment') {//附件
                                //     console.log("邮件附件信息>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
                                //     console.log("附件名称:" + data.filename);//打印附件的名称
                                //     data.content.pipe(fs.createWriteStream(data.filename));//保存附件到当前目录下
                                //     data.release();
                                // }
                            });

                        });
                        msg.once('end', function () {
                            console.log(seqno + '完成');
                        });
                    });
                    f.once('error', function (err) {
                        console.log('抓取出现错误: ' + err);
                    });
                    f.once('end', function () {
                        console.log('所有邮件抓取完成!');
                        imap.end();
                    });
                });
            });
        });
        imap.connect();
    })
};

getUrl().then(res => console.log('res = ', res));
