const utils99 = require('node-utils99')
const dbConfig = require('../../config/db.js')
const db = new utils99.mysqlSync(dbConfig.mysql)

let _t = {
    async list(user_id) {
        const res = db.Query("SELECT * FROM `login_log` WHERE user_id=? ORDER BY id DESC LIMIT 0, 10", [user_id])
        return res
    },
}

module.exports = _t