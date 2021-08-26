const mysql = require('mysql')
const config = require('../config/mysql.config')

const pool = mysql.createPool(config)

/**
 * 查询单条数据
 * @param {*} sql
 * @param {*} args
 * @returns
 */
function single(sql, args) {
    return new Promise((resolve, reject) => {
        pool.query(sql, args, function (error, results, _fields) {
            if (error) {
                reject(error)
            } else {
                resolve(
                    results.map((result) => ({
                        ...result
                    }))[0]
                )
            }
        })
    })
}

/**
 * 查询列表数据
 * @param {*} sql
 * @param {*} args
 * @returns
 */
function query(sql, args) {
    return new Promise((resolve, reject) => {
        pool.query(sql, args, function (error, results, _fields) {
            if (error) {
                reject(error)
            } else {
                resolve(
                    results.map((result) => ({
                        ...result
                    }))
                )
            }
        })
    })
}

/**
 * 查询分页数据
 * @param {*} sql
 * @param {*} args
 * @param {*} param2
 * @returns
 */
function getPaged(sql, args, { pageIndex = 1, pageSize = 30 }) {
    return new Promise((resolve, reject) => {
        if (pageIndex < 1) pageIndex = 1
        if (pageSize < 0) pageSize = 30

        let temp = sql.replace(sql.substring(6, sql.indexOf('from')), ' count(*) as total ') + ';'

        pool.query(temp + sql + ' limit ' + (pageIndex - 1) * pageSize + ',' + pageSize + ';', args, function (error, results, _fields) {
            if (error) {
                reject(error)
            } else {
                let rs = { pageIndex: pageIndex, pageSize: pageSize, total: 0, list: [] }

                rs.total = results[0].map((result) => ({ ...result }))[0].total
                rs.list = results[1].map((result) => ({ ...result }))

                resolve(rs)
            }
        })
    })
}

function querySameConn(sql, args) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, args, function (error, results, _fields) {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(
                            results.map((result) => ({
                                ...result
                            }))
                        )
                    }

                    connection.release()
                })
            }
        })
    })
}

/**
 * 执行sql语句
 * @param {*} sql
 * @param {*} args
 * @returns
 */
function excute(sql, args) {
    return new Promise((resolve, reject) => {
        pool.query(sql, args, function (error, results, _fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = { pool, query, getPaged, querySameConn, excute, single }
