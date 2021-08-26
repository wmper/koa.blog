const route = require('koa-router')()
const fs = require('fs')
const Busboy = require('busboy')
const path = require('path')
const uuid = require('node-uuid')

route.get('/error', async (ctx) => {
    await ctx.render('404')
})

route.post('/api/upload', async (ctx) => {
    let result = { success: 0, url: null, size: 0, message: '上传失败' }
    let busboy = new Busboy({ headers: ctx.req.headers })
    let dir = path.join('./upload/images/')

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }

    let task = new Promise((resolve, reject) => {
        busboy.on('file', function (_fieldname, file, filename, _encoding, _mimetype) {
            let temps = filename.split('.')
            var suffix = temps[temps.length - 1]

            let name = uuid.v1().replace(/-/g, '') + '.' + suffix
            result.url = '/images/' + name

            file.pipe(fs.createWriteStream(dir + name))

            file.on('data', function (data) {
                result.size = data.length
            })

            file.on('end', function () {
                result.success = 1
                result.message = '上传成功'
            })
        })

        busboy.on('field', function (fieldname, val, _fieldnameTruncated, _valTruncated, _encoding, _mimetype) {
            let form = {}
            form[fieldname] = val

            result.formData = form
        })

        busboy.on('finish', function () {
            resolve(result)
        })

        busboy.on('error', function (err) {
            result.message = err.message
            reject(result)
        })

        ctx.req.pipe(busboy)
    })

    ctx.body = await task
})

module.exports = route
