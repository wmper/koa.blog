let mysql = require('mysql')
let config = require('./mysql.config')

let pool = mysql.createPool(config)

function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, function (error, results, _fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

function querySameConn(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, function (error, results, _fields) {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(results)
                    }

                    connection.release()
                })
            }
        })
    })
}

module.exports = { pool, query, querySameConn }
