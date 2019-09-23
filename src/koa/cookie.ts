import koa from "koa"

const app = new koa()

app.use(async ctx => {
    if (ctx.url === '/index') {
        ctx.cookies.set(
            "cid",
            "hello cookie",
            {
                domain: "localhost",
                path: "/index",
                maxAge: 10 * 60 * 1000, // 有 maxAge expires 就失效了，用一个就行
                expires: new Date('2019-10-24'),
                httpOnly: false,
                overwrite: false
            }
        )
        ctx.body = "cookie is ok"
    } else {
        ctx.body = "hello cookie"
    }
})

app.listen(3000, () => console.log('listening on port 3000'))

/**
 * 网页访问 localhost:3000/index
 * F12 在 Application->Cookies->http://localhost:3000 查看
 */