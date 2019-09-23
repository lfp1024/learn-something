async function getPromise() {
    return 5
}

let r: Promise<any> | null = null
async function t() {
    // 通过r给方法加锁，同时只有一分代码在执行
    if (r === null) {
        // 自执行方法，r = Promise <pending>
        r = (async () => {
            await getPromise()
            r = null
        })()
        console.log("r1 = ", r)
        await r
        console.log("r2 = ", r)
    }
    console.log("end")
}

async function call() {
    for (let i = 0; i < 2; i++) {
        console.log("第", i)
        t()
    }
}


call()

// 第 0
// r1 =  Promise { <pending> }
// 第 1
// end
// r2 =  null
// end