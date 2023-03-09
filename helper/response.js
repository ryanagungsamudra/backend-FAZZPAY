const formResponse = (status, message, result, res) => {
    res.status(status).send({
        message: message,
        result: result,
    })
}

// const formResponse = (message, result, status) => {
//     return res.status(status).send({
//         data: result,
//         message: result.message,
//         status: status
//     })
// }

module.exports = formResponse