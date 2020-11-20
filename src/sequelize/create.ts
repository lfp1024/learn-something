import { Student, sequelize } from './init'

async function createUser() {
    let user = {
        name: 'wst',
        age: 19,
        isAdult: true
    }
    return await Student.create(user)
}


// 1. 字段值设置为 undefined，不报错。值为undefined的字段，不会出现在sql语句中
async function upsertUser() {
    let user = {
        name: 'xh',
        age: 12,
        isAdult: undefined
    }
    return await Student.create(user)
}

(async (fn) => {
    fn()
        .then(data => { console.log('create user:', data) })
        .finally(() => { sequelize.close() })
})(upsertUser)