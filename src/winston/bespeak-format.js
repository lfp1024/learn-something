const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => { // 定制化format
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const ignorePrivate = format((info, opts) => { // 自定义 format
    if (info.private) { return false; }
    return info;
});

const logger = createLogger({
    format: combine(
        label({ label: 'right meow!' }),
        timestamp(),
        format.colorize(),
        myFormat,
        ignorePrivate()
    ),
    transports: [new transports.Console()]
});

// ***************
// Allows for JSON logging
// ***************

logger.log({
    level: 'info',
    message: { name: 'winston', version: 3 }, // 自动序列化，在文件中才正常，console中还是 [object Object]
    additional: 'properties',
    are: 'passed along',
    // private: true // 过滤该条信息
});

logger.info({
    message: 'Use a helper method if you want', // ？
    additional: 'properties',
    are: 'passed along'
});

// ***************
// Allows for parameter-based logging
// ***************

logger.log('info', 'Pass a message and this works', {
    additional: 'properties',
    are: 'passed along'
});

logger.info('Use a helper method if you want', {
    additional: 'properties',
    are: 'passed along'
});

// ***************
// Allows for string interpolation
// ***************

// info: test message my string {}
logger.log('info', 'test message %s', 'my string');

// info: test message my 123 {}
logger.log('info', 'test message %d', 123);

// info: test message first second {number: 123}
logger.log('info', 'test message %s, %s', 'first', 'second', { number: 123 });

// prints "Found error at %s"
logger.info('Found %s at %s', 'error', new Date());
logger.info('Found %s at %s', 'error', new Error('chill winston'));
logger.info('Found %s at %s', 'error', /WUT/);
logger.info('Found %s at %s', 'error', true);
logger.info('Found %s at %s', 'error', 100.00);
logger.info('Found %s at %s', 'error', ['1, 2, 3']);

// ***************
// Allows for logging Error instances
// ***************

logger.warn(new Error('Error passed as info'));
logger.log('error', new Error('Error passed as message')); // 日志等级，可以通过 logger[level] 方法或传递 level 参数

logger.warn('Maybe important error: ', new Error('Error passed as meta'));
logger.log('error', 'Important error: ', new Error('Error passed as meta'));

logger.error(new Error('Error as info'));
