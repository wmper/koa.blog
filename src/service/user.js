const { query, single, getPaged, excute } = require('../utils/mysql')

/**
 * 获取用户
 * @param {*} username
 * @returns
 */
async function getUser(username) {
    return await single('select * from user where username = ?', [username])
}

module.exports = { getUser }
