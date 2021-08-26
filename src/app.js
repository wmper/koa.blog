const Koa = require('koa')
const path = require('path')
const statics = require('koa-static')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const error = require('./middleware/error')

let app = new Koa()

app.use(error())
app.use(bodyParser())
app.use(statics(path.join(__dirname, './public')))
app.use(statics(path.join(__dirname, '../upload')))
app.use(views(path.join(__dirname, './views'), { map: { html: 'ejs' } }))

require('./router/index')(app)

app.listen(3000, () => {
    console.log('Server start at http://localhost:3000')
})
