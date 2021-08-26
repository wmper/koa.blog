const route = require('koa-router')()
const { getPagerData } = require('../utils/common')
const { query, single, getPaged, excute } = require('../utils/mysql')
const { getSite, getDoc } = require('../service/index')

route.get('/categories/:id', async (ctx) => {
    let id = parseInt(ctx.params.id)
    let pageIndex = parseInt(ctx.query.p || 1)
    let pageSize = 2
    let data = await getPaged('select a.*,b.name as category_name from document a left join category b on a.category_id = b.id where a.category_id = ? order by a.id desc', [id, id], { pageIndex: pageIndex, pageSize: pageSize })
    let temp = await single('select * from category where id = ?', [id])
    await ctx.render('category', { model: temp, list: data.list, pager: getPagerData(data) })
})

route.get('/doc/:id', async (ctx) => {
    let id = ctx.params.id
    let data = { model: await getDoc(id), site: await getSite() }

    await excute('update document set views = views + 1 where id = ?', [id])

    await ctx.render('detail', data)
})

module.exports = route
