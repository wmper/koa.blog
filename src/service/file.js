const { query, single, getPaged, excute } = require('../utils/mysql')

/**
 * 保存上传文件记录
 * @param {*} data
 * @returns
 */
async function saveFileLog(data) {
    await excute('insert into file set ?', data)
}

/**
 * 获取文件记录
 * @param {*} param
 * @returns
 */
async function getFiles({ pageIndex = 1, pageSize = 20 }) {
    return await getPaged('select * from file order by id desc', [], { pageIndex: pageIndex, pageSize: pageSize })
}

/**
 * 删除文件记录
 * @param {*} id
 * @returns
 */
async function deleteFileLog(id) {
    return await excute('delete from file where id = ?', [ctx.params.id])
}

module.exports = { saveFileLog, getFiles, deleteFileLog }
