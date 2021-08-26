const route = require('koa-router')()
const { listToTree, getUUId, getMD5 } = require('../utils/common')
const { pool, query, getPaged, excute, single } = require('../utils/mysql')

// 菜单
route.get('/api/menu/tree', async (ctx) => {
    let rs = await query('select * from menu order by sort desc,id asc', [])

    ctx.body = { code: 0, data: listToTree(rs) }
})

route.post('/api/menu/save', async (ctx) => {
    let form = ctx.request.body
    let data = { parent_id: form.parent_id, name: form.name, path: form.path, icon: form.icon, sort: form.sort }

    if (form.id == 0) {
        let rs = await excute('insert into menu set ?', data)

        if (rs.affectedRows > 0) ctx.body = { code: 0, msg: '保存成功' }
    } else {
        let rs = await excute('update menu set ? where id = ?', [data, form.id])

        if (rs.affectedRows > 0) ctx.body = { code: 0, msg: '编辑成功' }
    }
})

route.delete('/api/menu/:id', async (ctx) => {
    let rs = await excute('delete from menu where id = ?', [ctx.params.id])
    if (rs.affectedRows > 0) ctx.body = { code: 0, msg: '删除成功' }
})

// 用户
route.post('/api/user/list', async (ctx) => {
    let body = ctx.request.body

    ctx.body = { code: 0, data: await getPaged('select * from user order by id desc', [], { page: body.pageIndex, size: body.pageSize }) }
})

route.post('/api/user/save', async (ctx) => {
    let form = ctx.request.body

    let data = { username: form.username }
    if (form.password != null && form.password.length > 0) {
        data.salt = getUUId()
        data.password = getMD5(form.password + data.salt)
    }

    if (form.id == 0) {
        let rs = await excute('insert into user set ?', data)

        if (rs.affectedRows > 0) ctx.body = { code: 0, msg: '保存成功' }
    } else {
        let rs = await excute('update user set ? where id = ?', [data, form.id])

        if (rs.affectedRows > 0) ctx.body = { code: 0, msg: '编辑成功' }
    }
})

route.delete('/api/user/:id', async (ctx) => {
    let rs = await excute('delete from user where id = ?', [ctx.params.id])
    if (rs.affectedRows > 0) ctx.body = { code: 0, msg: '删除成功' }
})

// 分类
route.get('/api/category/tree', async (ctx) => {
    let rs = await query('select * from category order by sort desc,id asc', [])

    ctx.body = { code: 0, data: listToTree(rs) }
})

route.post('/api/category/save', async (ctx) => {
    let form = ctx.request.body
    let data = { parent_id: form.parent_id, parent_path: '', name: form.name, sort: form.sort }

    if (form.id == 0) {
        let rs = await excute('insert into category set ?', data)

        if (rs.affectedRows > 0) {
            ctx.body = { code: 0, msg: '保存成功' }

            let path = rs.insertId
            if (form.parent_id > 0) {
                let temp = await single('select * from category where id = ?', [form.parent_id])
                path = temp.parent_path + ',' + path
            }

            await excute('update category set ? where id = ?', [{ parent_path: path }, rs.insertId])
        }
    } else {
        let rs = await excute('update category set ? where id = ?', [data, form.id])

        if (rs.affectedRows > 0) ctx.body = { code: 0, msg: '编辑成功' }
    }
})

route.delete('/api/category/:id', async (ctx) => {
    let rs = await excute('delete from category where id = ?', [ctx.params.id])
    if (rs.affectedRows > 0) ctx.body = { code: 0, msg: '删除成功' }
})

// 文档
route.post('/api/document/list', async (ctx) => {
    let body = ctx.request.body

    ctx.body = { code: 0, data: await getPaged('select a.*,b.name as category_name from document a left join category b on b.id = a.category_id order by a.id desc', [], { page: body.pageIndex, size: body.pageSize }) }
})

route.post('/api/document/save', async (ctx) => {
    let form = ctx.request.body

    let data = {
        category_id: form.category_id,
        title: form.title,
        keywords: form.keywords,
        description: form.description,
        tags: form.tags,
        markdown: form.markdown,
        contents: form.contents
    }

    if (form.id == 0) {
        let rs = await excute('insert into document set ?', data)

        if (rs.affectedRows > 0) ctx.body = { code: 0, msg: '保存成功' }
    } else {
        let rs = await excute('update document set ? where id = ?', [data, form.id])

        if (rs.affectedRows > 0) ctx.body = { code: 0, msg: '编辑成功' }
    }
})

route.delete('/api/document/:id', async (ctx) => {
    let rs = await excute('delete from document where id = ?', [ctx.params.id])
    if (rs.affectedRows > 0) ctx.body = { code: 0, msg: '删除成功' }
})

route.get('/api/document/:id', async (ctx) => {
    let data = await single('select * from document where id = ?', [ctx.params.id])
    ctx.body = { code: 0, data: data }
})
module.exports = route
