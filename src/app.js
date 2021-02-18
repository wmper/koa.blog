const Koa = require('koa')
const { join } = require('path')
const statics = require('koa-static')
const views = require('koa-views')

let app = new Koa()

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = 500
        ctx.body = 'Internal server error, please try again.'
    }
})

app.use(statics(join(__dirname, './public')))
app.use(
    views(join(__dirname, './views'), {
        extension: 'ejs'
    })
)

require('./router/index')(app)

app.listen(3000, () => {
    console.log('Server start at http://localhost:3000')
})
