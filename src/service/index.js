const { query, single, getPaged, excute } = require('../utils/mysql')
const { getUser } = require('./user')
const { getCategoryTree } = require('./category')
const { saveFileLog, getFiles, deleteFileLog } = require('./file')

/**
 * 获取站点信息
 * @returns
 */
async function getSite() {
    return await single('select * from site order by id desc limit 0,1', [])
}

/**
 * 获取文档详情
 * @param {*} id
 * @returns
 */
async function getDoc(id) {
    return await single('select a.*,b.name as category_name from document a left join category b on a.category_id = b.id where a.id = ?', [id])
}

/**
 * 获取首页文档
 * @param {*} pageIndex
 * @param {*} sort
 * @returns
 */
async function getHomeDocs(pageIndex, sort) {
    let str = 'a.id'
    let pageSize = 20
    if (sort == 1) str = 'a.views'

    return await getPaged('select a.*,b.name as category_name from document a left join category b on a.category_id = b.id order by ' + str + ' desc', [], { pageIndex: pageIndex, pageSize: pageSize })
}

module.exports = {
    getSite,
    getDoc,
    getHomeDocs,
    getUser,
    getCategoryTree,
    saveFileLog,
    getFiles,
    deleteFileLog
}
