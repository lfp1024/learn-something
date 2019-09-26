import mysql from "mysql"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "mydb"
})

connection.connect()

connection.query('insert into stu(id, name, sex, cid) values(0,?,?,?)', ["李白", "男", "2"], (error, results, fields) => {
    console.log("results = ", results)
    console.log("fields = ", fields)
})

connection.query('select * from stu', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results);
})

connection.end();

// results =  OkPacket {
//     fieldCount: 0,
//     affectedRows: 1,
//     insertId: 3,
//     serverStatus: 2,
//     warningCount: 0,
//     message: '',
//     protocol41: true,
//     changedRows: 0 }
//   fields =  undefined
//   The solution is:  [ RowDataPacket { id: 1, name: '小明', sex: '男', cid: 1 },
//     RowDataPacket { id: 2, name: '李白', sex: '男', cid: 2 },
//     RowDataPacket { id: 3, name: '李白', sex: '男', cid: 2 } ]