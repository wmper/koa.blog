const home = require('../controller/home')
const error = require('../controller/error')
const upload = require('../controller/upload')

module.exports = (app) => {
    app.use(home.routes()).use(home.allowedMethods())
    app.use(error.routes()).use(error.allowedMethods())
    app.use(upload.routes()).use(upload.allowedMethods())
}
