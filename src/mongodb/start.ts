import { MongoClient } from "mongodb"


// 1. 构造一个client
const url = "mongodb://localhost"
const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// 2. 建立连接
// (async () => {
//     await mongoClient.connect()
//     console.log("succeed", mongoClient.isConnected())
// })()
mongoClient.connect(async (err, client) => {
    if (err) console.log("mongodb connect error ", err)
    // 3. 创建一个数据库
    const db = mongoClient.db("mydb")

    // 4. 创建一个集合
    const collection = db.collection("customers")

    // 5. insert
    const insertObj1 = { name: "lfp", age: 26, height: 168 }
    const insertObj2 = [
        { _id: 154, name: "wst", age: 25 },
        { _id: 155, name: "lfp", age: 26 }
    ]
    const r = await collection.insertOne(insertObj1)
    // const r = await collection.insertMany(insertObj2)
    console.log("insert many r = ", r)
    // r 的类型
    // export interface InsertOneWriteOpResult {
    //     insertedCount: number;               // 插入的行数
    //     ops: any[];                          // 本次插入的 记录 
                                                    // [ { name: 'lfp',
                                                    //    age: 26,
                                                    //    height: 168,
                                                    //    _id: 5d835115e6431521b29ac8b4 } ]
    //     insertedId: ObjectID;                // 本次操作的 Id
    //     connection: any;                     // 本次操作的连接对象
    //     result: { ok: number, n: number };   // ok 1表示操作成功，n 表示插入的行数
    // }
})


