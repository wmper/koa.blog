const route = require('koa-router')()
const { getPagerData } = require('../utils/common')
const { getSite, getHomeDocs } = require('../service/index')

route.get('/', async (ctx) => {
    let pageIndex = parseInt(ctx.query.p || 1)
    let sort = parseInt(ctx.query.s || 0)

    let site = await getSite()
    let data = await getHomeDocs(pageIndex, sort)

    await ctx.render('home', { s: sort, site: site, model: data, pager: getPagerData(data) })
})

route.get('/about', async (ctx) => {
    let site = await getSite()

    await ctx.render('about', { site: site })
})

route.get('/help', async (ctx) => {
    let site = await getSite()

    await ctx.render('help', { site: site })
})

route.get('/ad', async (ctx) => {
    let site = await getSite()

    await ctx.render('ad', { site: site })
})

route.get('/faq', async (ctx) => {
    let site = await getSite()

    await ctx.render('faq', { site: site })
})

route.get('/tools', async (ctx) => {
    let site = await getSite()

    await ctx.render('tools', { site: site })
})

module.exports = route
