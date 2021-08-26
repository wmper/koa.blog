const uuid = require('node-uuid')
const crypto = require('crypto')

/**
 * 获取UUId
 * @returns
 */
function getUUId() {
    return uuid.v1().replace(/-/g, '')
}

/**
 * md5编码
 * @param {*} source
 * @returns
 */
function getMD5(source) {
    return crypto.createHash('md5').update(source).digest('hex')
}

/**
 * 数组转tree节点
 * @param {*} list
 * @returns
 */
function listToTree(list) {
    var map = {},
        node,
        root = [],
        i

    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i // initialize the map
        list[i].children = [] // initialize the children
    }

    for (i = 0; i < list.length; i += 1) {
        node = list[i]
        if (node.parent_id !== 0) {
            // if you have dangling branches check that map[node.pid] exists
            list[map[node.parent_id]].children.push(node)
        } else {
            root.push(node)
        }
    }
    return root
}

/**
 * 封装分页数据
 * @param {*} param0
 * @returns
 */
function getPagerData({ pageIndex = 1, pageSize = 30, total = 0 }) {
    let rs = { pageIndex: pageIndex, pageSize: pageSize, pageCount: 0, prePage: 0, nextPage: 0, total: total, items: [] }

    rs.pageCount = parseInt(rs.total / pageSize)
    if (rs.total % pageSize > 0) {
        rs.pageCount += 1
    }

    if (pageIndex > 1) {
        rs.prePage = pageIndex - 1
    }
    if (pageIndex < rs.pageCount) {
        rs.nextPage = pageIndex + 1
    }

    //总页数小于 5
    if (rs.pageCount <= 5) {
        for (let i = 1; i <= rs.pageCount; i++) rs.items.push(i)
    }

    //总页数大于 5
    if (rs.pageCount > 5) {
        if (pageIndex <= 4) {
            for (let i = 1; i <= 5; i++) rs.items.push(i)
        } else if (pageIndex > rs.pageCount - 4) {
            //当前页大于等于 总页数-4
            for (let i = rs.pageCount - 4; i <= rs.pageCount; i++) rs.items.push(i)
        } else {
            for (let i = pageIndex - 2; i <= pageIndex + 2; i++) rs.items.push(i)
        }
    }
    return rs
}

module.exports = { listToTree, getUUId, getMD5, getPagerData }
