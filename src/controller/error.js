const route = require('koa-router')()

route.get('/error', async (ctx) => {
    ctx.body = 'error'
})

module.exports = route
