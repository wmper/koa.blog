const jwt = require('koa-jwt')
const config = require('../config/index')
// 登录
const login = require('../controller/login')

const home = require('../controller/home')
const base = require('../controller/base')

const manage = require('../controller/admin')
const document = require('../controller/document')

const api_manage = require('../api/admin')

module.exports = (app) => {
    app.use(
        jwt({ secret: config.jwt_secret }).unless({
            path: ['/api/login', '/api/upload'],
            custom: (ctx) => {
                return ctx.path.startsWith('/api/') == true ? false : true
            }
        })
    )

    app.use(base.routes()).use(base.allowedMethods())

    // 登录
    app.use(login.routes()).use(login.allowedMethods())

    app.use(home.routes()).use(home.allowedMethods())
    app.use(document.routes()).use(document.allowedMethods())

    // 界面
    app.use(manage.routes()).use(manage.allowedMethods())
    // api
    app.use(api_manage.routes()).use(api_manage.allowedMethods())
}
