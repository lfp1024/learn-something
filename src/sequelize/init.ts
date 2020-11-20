import { DATE } from 'sequelize';
import { Sequelize } from 'sequelize';
import { config } from './config';

// 实例化 sequelize，连接数据库
const database = config.database;

const sequelize = new Sequelize(
    database.dbName,
    database.username,
    database.password,
    {
        host: 'localhost',
        port: 3306,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        timezone: '+08:00', //时区转换 东八区
        dialectOptions: {
            dateStrings: true,
            typeCast(field, next) {
                if (field.type === 'DATETIME') {
                    return field.string();
                }
                return next();
            },
        },
        logging: (sql) => console.log(sql),
    }
)
// 测试连接
sequelize.authenticate()
    // 必须是已经存在的数据库才能连接成功
    .then((data) => { console.log('连接成功，data:', data) })
    .catch((err) => { console.log('连接失败：error:', err) })

// 定义模型
let Student = sequelize.define('student', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    age: Sequelize.INTEGER,
    isAdult: Sequelize.BOOLEAN,
    class_id: Sequelize.INTEGER,
}, {
    timestamps: false
});

let Class = sequelize.define('class', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    student_num: Sequelize.INTEGER,
}, {
    timestamps: false
});

let Teacher = sequelize.define('teacher', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING(100),
    birthday: Sequelize.DATE,
    sex: Sequelize.INTEGER,
    desc: Sequelize.JSON,
});

// 同步数据模型，建立表
// Teacher.sync({
//     alter: true
// }).then((data) => { console.log(`${database.dbName} 表修改创建成功`) })


export = {
    sequelize,
    Student,
    Class,
    Teacher,
}