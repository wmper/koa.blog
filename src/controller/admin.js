const route = require('koa-router')()
const { query } = require('../utils/mysql')

route.get('/admin', async (ctx) => {
    await ctx.render('admin/main')
})

route.get('/admin/info', async (ctx) => {
    await ctx.render('admin/info')
})

route.get('/admin/console', async (ctx) => {
    await ctx.render('admin/console')
})

route.get('/admin/user', async (ctx) => {
    await ctx.render('admin/user')
})

route.get('/admin/menu', async (ctx) => {
    await ctx.render('admin/menu')
})

route.get('/admin/category', async (ctx) => {
    await ctx.render('admin/category')
})

route.get('/admin/document', async (ctx) => {
    await ctx.render('admin/document/list')
})

route.get('/admin/document/:id', async (ctx) => {
    await ctx.render('admin/document/detail')
})

module.exports = route
