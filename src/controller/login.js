const route = require('koa-router')()
const jwt = require('jsonwebtoken')
const { getUser } = require('../service/index')
const { getMD5 } = require('../utils/common')
const config = require('../config/index')

route.get('/admin/login', async (ctx) => {
    await ctx.render('admin/login')
})

route.post('/api/login', async (ctx) => {
    let form = ctx.request.body
    let admin = await getUser(form.username)
    if (!admin) {
        ctx.body = { code: 1, msg: '用户名不存在' }
        return
    }

    let pwd = getMD5(form.password + admin.salt)
    if (pwd != admin.password) {
        ctx.body = { code: 1, msg: '密码错误' }
        return
    }

    ctx.body = {
        code: 0,
        msg: '登录成功',
        token: jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, data: { id: admin.id } }, config.jwt_secret)
    }
})

module.exports = route
