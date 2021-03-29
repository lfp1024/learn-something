

// 整体代码架构跟 jQuery 相似
(function (global, factory) {
    // 不支持 CommanJS规范，支持 AMD 规范
    if (typeof define === 'function' && define.amd)
        define(function () { return factory(global) })
    else
        // 浏览器环境
        factory(global)

}(
    // 浏览器环境 this -> window
    this,
    // 浏览器环境 -> function (window){}
    function (window) {

        // 自执行函数执行
        var Zepto = (function () {
            // ...
        })()

        window.Zepto = Zepto
        window.$ === undefined && (window.$ = Zepto)

        return Zepto
    })
)