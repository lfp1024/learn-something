/**
 * npm install node-xlsx
 */

const xlsx = require('node-xlsx');
const fs = require('fs');

const data = [
    ['id', 'account', 'bind_no', 'crawler_id', 'exception_time', 'exception_code', 'exception_msg', 'created_at', 'updated_at'],
    ['134418', '2_ebay_18', '2#ebay#all#18', '148', '2021-06-03 09:50:46', '000101', 'Error:waiting for target failed: timeout 30000ms exceeded', '2021-06-03 09:50:46', '2021-06-03 09:50:46'],
    ['134419', '2_ebay_10', '2#ebay#all#10', '148', '2021-06-03 09:50:54', '000100', '绑定失败', '2021-06-03 09:50:54', '2021-06-03 09:50:54']
]
const options = { '!cols': [{ wch: 8 }, { wch: 8 }, { wch: 13 }, { wch: 9 }, { wch: 18 }, { wch: 13 }, { wch: 20 }, { wch: 18 }, { wch: 18 }] }

const buffer = xlsx.build([{ name: 'xxx', data }], options);
fs.writeFileSync('./test.xlsx', buffer);