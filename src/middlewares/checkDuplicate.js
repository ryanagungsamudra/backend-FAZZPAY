// Imports
const db = require("../../helper/connection"); // Database Connection

const checkDuplicate = (email) => {
    return new Promise((success, failed) => {
        db.query(`SELECT * FROM users WHERE email='${email}'`, (error, result) => {
            if (error) {
                return failed(error.message)
            } else if (result.rows.length != 0) {
                return success(result.rows)
            } else {
                return success()
            }
        }) 
    })
}

// Export
module.exports = checkDuplicate