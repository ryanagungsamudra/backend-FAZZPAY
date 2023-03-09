const { query } = require('express');
const db = require('../../helper/connection')
const { v4: uuidv4 } = require('uuid');

const transactionModel = {
    // CREATE
    create: ({ sender_id, receiver_id, amount = 0, status, time, note, sender_name, receiver_name }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO transaction 
                (id, sender_id, receiver_id, amount, status, time, note, sender_name, receiver_name) 
                VALUES 
                ('${uuidv4()}','${sender_id}','${receiver_id}','${amount}','${status}','${time}','${note}','${sender_name}','${receiver_name}')`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        db.query(
                            `UPDATE users SET 
                            balance = balance + $1,
                            income = $2
                            WHERE id = $3`,
                            [amount, amount, receiver_id],
                            (err, result) => {
                                if (err) {
                                    return reject(err.message)
                                } else {
                                    db.query(
                                        `UPDATE users SET
                                    balance = balance - $1,
                                    expense = $2
                                    WHERE id = $3`,
                                        [amount, amount, sender_id],
                                        (err, result) => {
                                            if (err) {
                                                return reject(err.message)
                                            } else {
                                                return resolve({ sender_id, receiver_id, amount, status, time, note, sender_name, receiver_name })
                                            }
                                        }
                                    )
                                }
                            }
                        )
                    }
                }
            )
        })
    },

    // READ
    query: (search, status, sortBy, limit, offset) => {
        let orderQuery = `ORDER BY status ${sortBy} LIMIT ${limit} OFFSET ${offset}`

        if (!search && !status) {
            return orderQuery
        } else if (search && status) {
            return `WHERE status ILIKE '%${search}%' AND status ILIKE '${status}%' ${orderQuery}`
        } else if (search || status) {
            return `WHERE status ILIKE '%${search}%' OR status ILIKE '${status}%' ${orderQuery}`
        } else {
            return orderQuery
        }
    },

    read: function (search, status, sortBy = 'ASC', limit = 25, offset = 0) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from transaction ${this.query(search, status, sortBy, limit, offset)}`,
                (err, result) => {
                    console.log(result);
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows)
                    }
                }
            )
        })
    },

    readDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                    p.id, p.full_name, p.balance, p.income, p.expense,
                    json_agg(row_to_json(pi)) history 
                FROM users p
                INNER JOIN transaction pi ON p.id = pi.sender_id 
                AND p.id='${id}'
                GROUP BY p.id`,
                // `SELECT * from transaction WHERE id='${id}'`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows[0])
                    }
                }
            );
        })
    },

    // UPDATE
    // update: ({ id, sender_id, receiver_id, amount, status, time, note }) => {
    //     return new Promise((resolve, reject) => {
    //         db.query(`SELECT * FROM transaction WHERE id='${id}'`, (err, result) => {
    //             // console.log(result);
    //             if (err) {
    //                 return reject(err.message);
    //             } else {
    //                 db.query(
    //                     `UPDATE transaction SET 
    //                         sender_id='${sender_id || result.rows[0].sender_id}', 
    //                         receiver_id='${receiver_id || result.rows[0].receiver_id}', 
    //                         amount='${amount || result.rows[0].amount}', 
    //                         status='${status || result.rows[0].status}', 
    //                         time='${time || result.rows[0].time}', 
    //                         note='${note || result.rows[0].note}'
    //                     WHERE id='${id}'`,
    //                     (err, result) => {
    //                         if (err) {
    //                             return reject(err.message)
    //                         } else {
    //                             return resolve({ id, sender_id, receiver_id, amount, status, time, note })
    //                         }
    //                     }
    //                 )
    //             }
    //         })
    //     })
    // },
    update: ({ id, amount }) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
                // console.log(result);
                if (err) {
                    return reject(err.message);
                } else {
                    db.query(
                        `UPDATE users SET
                        balance = balance + $1,
                        income = $2
                        WHERE id = $3`,
                        [amount, amount, id],
                        (err, result) => {
                            // console.log(result);
                            if (err) {
                                return reject(err.message)
                            } else {
                                return resolve({ id, amount })
                            }
                        }
                    )
                }
            })
        })
    },

    // DELETE
    // untuk remove tergantung paramnya saja, untuk kasus dibawah ini yaitu id.
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from transaction WHERE id='${id}'`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(`transaction ${id} has been deleted`)
                    }
                }
            )
        })
    }
}

module.exports = transactionModel