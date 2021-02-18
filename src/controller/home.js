const route = require('koa-router')()
const { query } = require('../utils/mysql')

route.get('/', async (ctx) => {
    let rs = await query('select * from user limit 1', [])

    await ctx.render('home', { title: rs[0].Account })
})

module.exports = route
