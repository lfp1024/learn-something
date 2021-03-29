// 检测是否为一个函数
var isFunction = function isFunction(obj) {
    // 处理低版本浏览器兼容的 
    // typeof obj.nodeType !== "number"
    return typeof obj === "function" && typeof obj.nodeType !== "number";
};

console.log("isFunction = ", isFunction(function () { })) // true
console.log("isFunction = ", isFunction([])) // false

// 检测是否为window
var isWindow = function isWindow(obj) {
    // 浏览器机制 window.window=window
    return obj != null && obj === obj.window;
};
console.log("isWindow = ", isWindow({})) // false

// 检测数据类型
var class2type = {}
// 获取 Object原型上的 toString，用来检测数据类型
var toString = class2type.toString;
// 建立映射表
["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol"].forEach(
    function (name, _i) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    }
);

function toType(obj) {
    // 处理 null 和 undefined
    if (obj == null) {
        return obj + ""
    }
    // 如果是引用类型，基于 toString.call 检测，如果是基本数据类型，基于 typeof 检测
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj
}

console.log("new Number(1) = ", typeof new Number(1)) // 'object'
console.log("toType = ", toType(new Number(1))) // 'number'


/* 
对于通过构造函数创建的基本数据类型内置类的实例
typeof new Number(1) 
"object"
// 我们想要是 number，因此 toType 映射表中有 "[object Number]" : number 这一项，可用来实现我们的需求
var res = toType(new Number(1))
console.log(res)
number

var res = toType(null)
console.log(res)
null

var res = toType(undefined)
console.log(res)
undefined
*/


// 检测是否为数组或类数组
function isArrayLike(obj) {
    // 先确保是个对象类型，否则下面的 in 操作符会报错
    if (obj == null || typeof obj !== "object") return false

    // 1. 将obj转换为布尔类型，判断是否存在 （0 、NaN、null、undefined、空字符串）转换为布尔类型后是 false
    // 2. 判断是否具有 length 属性
    // 3. 最终length=false 或 length属性值
    var length = !!obj && "length" in obj && obj.length,
        type = toType(obj)
    if (isFunction(obj) || isWindow(obj)) {
        return false
    }
    // type === "array" 是数组
    // length === 0 是空的类数组 {length:0}
    // typeof length === "number" && length > 0 && (length - 1) in obj 
    //   有length属性 且 有数字索引 且 索引是递增的（检测 length - 1最大索引是否在 obj 中来验证是否是递增的）
    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && (length - 1) in obj
}

console.log("isArrayLike = ", isArrayLike(new Set([1, 3, 1]))) // false Set结构是 size 属性

// 检测是否为纯粹对象
/* 
纯粹对象 `obj.__proto__===Object.prototype`
获取当前实例的原型`Object.getPrototypeOf([val])`
*/

function isPlainObject(obj) {
    var proto, ctor
    // obj 不存在或者数据类型不是 object 则返回false
    if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") {
        return false
    }
    // 获取当前实例原型
    proto = Object.getPrototypeOf(obj)
    // 针对 Object.create(null) 创建的实例没有原型链
    if (!proto) return true
    // 获取实例原型的 constructor
    ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor
    return typeof ctor === "function" && Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
}
console.log("isPlianObject = ", isPlainObject(Object.create(null))) // true

// 检测是否为空对象
function isEmptyObject(obj) {
    // 保证必须是个对象，如果不是对象不会进入for-in循环（将返回true）
    if (obj == null || /^\[object ([a-z]+)\]$/i.exec(({}).toString.call(obj))[1].toLowerCase() !== "object") {
        return false;
    }
    for (var key in obj) {
        // 添加对私有属性的判断
        // if (!obj.hasOwnProperty(key)) break
        if (!Object.prototype.hasOwnProperty.call(obj, key)) break;
        return false;
    }
    return true;
}
console.log("isEmptyObject = ", isEmptyObject({})) // true
console.log("isEmptyObject = ", isEmptyObject(1)) // false
console.log("isEmptyObject = ", isEmptyObject(undefined)) // false

// 检测是否为一个Number类型
function isNumeric(obj) {
    var type = toType(obj)
    // 用自己 减去 转换为数字格式的自己。如果不是 NaN 则是一个有效数字，例如 "11" 检测结果为 true
    return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj))
}
console.log("isNumeric = ", isNumeric("21")) // true
