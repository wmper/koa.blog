const { query, single, getPaged, excute } = require('../utils/mysql')
const { listToTree } = require('../utils/common')

/**
 * 获取分类树
 * @param {*}
 * @returns
 */
async function getCategoryTree() {
    let rs = await query('select * from category order by sort desc,id asc', [])
    return listToTree(rs)
}

module.exports = { getCategoryTree }
