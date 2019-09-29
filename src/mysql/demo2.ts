import mysql from "mysql"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "mydb"
})

connection.connect()

// connection.query('insert into stu(id, name, sex, cid) values(0,?,?,?)', ["李白", "男", "2"], (error, results, fields) => {
//     console.log("results = ", results)
//     console.log("fields = ", fields)
// })

type Data = {
    id: number,
    name: string,
    sex: string,
    cid: number
}

async function asyncWrap(): Promise<Data[]> {
    return new Promise((res, rej) => {
        connection.query('select * from stu', (error, results, fields) => {
            if (error) rej(error);
            // console.log('The solution is: ', results);
            res(results)
        })
    })
};

(async () => {
    const queryRes = await asyncWrap();
    console.log("res = ", queryRes[0].name)
})()

/**
 * res =  [ RowDataPacket { id: 1, name: '小明', sex: '男', cid: 1 },
  RowDataPacket { id: 2, name: '李白', sex: '男', cid: 2 },
  RowDataPacket { id: 3, name: '李白', sex: '男', cid: 2 },
  RowDataPacket { id: 4, name: '李白', sex: '男', cid: 2 },
  RowDataPacket { id: 5, name: '李白', sex: '男', cid: 2 },
  RowDataPacket { id: 6, name: '李白', sex: '男', cid: 2 } ]
 */

connection.end();

// 直接使用报错
// const selectRes = connection.query('select * from stu')
// console.log("select res = ", selectRes)

/**
 *  Error:
       at Protocol._enqueue (/xxx/node_modules/mysql/lib/protocol/Protocol.js:144:48)
       at Connection.query (/xxx/node_modules/mysql/lib/Connection.js:201:25)
       at Object.<anonymous> (/xxx/src/mysql/demo2.ts:17:30)
       at Module._compile (internal/modules/cjs/loader.js:688:30)
       at Module.m._compile (/usr/local/lib/node_modules/ts-node/src/index.ts:473:23)
       at Module._extensions..js (internal/modules/cjs/loader.js:699:10)
       at Object.require.extensions.(anonymous function) [as .ts] (/usr/local/lib/node_modules/ts-node/src/index.ts:476:12)
       at Module.load (internal/modules/cjs/loader.js:598:32)
       at tryModuleLoad (internal/modules/cjs/loader.js:537:12)
       at Function.Module._load (internal/modules/cjs/loader.js:529:3),
 */