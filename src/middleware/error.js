const process = require('process')

function error() {
    return async function (ctx, next) {
        try {
            await next()
        } catch (err) {
            if (err.status == 401) {
                ctx.body = { code: 401, msg: 'Protected resource, use Authorization header to get access\n' }
            } else if (err.status == 404) {
                ctx.body = { code: 404, msg: 'Not Found' }
            } else {
                ctx.body = { code: 500, msg: 'Internal server error, please try again.' }

                if (process.env.NODE_ENV === 'development') {
                    console.error(err)
                }
            }
        }
    }
}

module.exports = error
