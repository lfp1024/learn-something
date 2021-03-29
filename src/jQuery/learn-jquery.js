/* 
 * 研究 JQ 源码，提高原生 JS 水平
 * 一个项目中可能引入多个版本
 * 现在基本不用了（JQ把JS带火的）
 * 源码路径 'jquery/dist/jquery.js'
 * 
 */


// 利用闭包的保护作用：自己编写的代码（类库或者插件）为了防止和外界的变量造成污染，需要放到闭包中
// jQuery 就是用闭包管理代码，防止被外部变量污染


// (function (global, factory) {)()   一个自执行函数执行
(function (global, factory) {

    // 采用JS严格模式(默认是非严格模式)
    "use strict";

    // 利用 暂时性死区 typeof 不报错
    if (typeof module === "object" && typeof module.exports === "object") {
        // NODE环境（CommonJS模块规范）
        // 通过 判断是否有 document 属性判断是 global 还是 module
        module.exports = global.document ?
            // factory( global, true )  <==> anonymous(global, true)
            // 将最后 return 的 jQuery 导出 
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };

    } else {
        // 浏览器环境  
        // factory(global) <==> anonymous(window, undefined)
        factory(global);
    }
})(
    // 第一个参数
    // 验证当前宿主环境
    //【浏览器环境】  window=window => global=window
    //【NODE环境下】 window=undefined => global=global/module
    typeof window !== "undefined" ? window : this,

    // 第二个参数
    // factory === anonymous 传一个匿名函数，在自执行函数体中执行
    // 最终都是执行这个函数，这个函数就是整个JQ的核心
    // 浏览器环境 执行 anonymous(window, undefined)
    // node环境  执行 anonymous(global, true)
    function anonymous(window, noGlobal) {


        var jQuery = function (selector, context) {
            // ...
        };

        // 多库共存，如果别的库也用 $，可以通过下面的方法转移 $ 的使用权
        jQuery.noConflict = function (deep) {
            if (window.$ === jQuery) {
                window.$ = _$;
            }

            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery;
            }

            return jQuery;
        };

        // 浏览器环境 向全局对象 window 挂载一个属性 jQuery 和 $
        // 把闭包中私有的东西暴露到全局上使用
        // $('#box') <==> jQuery('#box')  用的都是闭包中的jQuery方法
        if (typeof noGlobal === "undefined") {
            window.jQuery = window.$ = jQuery;
        }

        return jQuery;
    }
);


function fn(a, b) {
    return function (c) {
        return a + b + c
    }
}
