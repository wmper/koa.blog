const route = require('koa-router')()
const { getPagerData } = require('../utils/common')
const { getSite, getHomeDocs, getCategoryTree } = require('../service/index')

route.get('/', async (ctx) => {
    let pageIndex = parseInt(ctx.query.p || 1)
    let sort = parseInt(ctx.query.s || 0)

    let site = await getSite()
    let data = await getHomeDocs(pageIndex, sort)
    let node = await getCategoryTree()

    await ctx.render('home', { site: site, model: data, pager: getPagerData(data), node: node })
})

route.get('/about', async (ctx) => {
    let site = await getSite()
    let node = await getCategoryTree()

    await ctx.render('about', { site: site, node: node })
})

route.get('/help', async (ctx) => {
    let site = await getSite()
    let node = await getCategoryTree()

    await ctx.render('help', { site: site, node: node })
})

route.get('/ad', async (ctx) => {
    let site = await getSite()
    let node = await getCategoryTree()

    await ctx.render('ad', { site: site, node: node })
})

route.get('/faq', async (ctx) => {
    let site = await getSite()
    let node = await getCategoryTree()

    await ctx.render('faq', { site: site, node: node })
})

route.get('/tools', async (ctx) => {
    let site = await getSite()
    let node = await getCategoryTree()

    await ctx.render('tools', { site: site, node: node })
})

module.exports = route
