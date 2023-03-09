const jwt = require('jsonwebtoken')
const { JWT_PRIVATE_KEY } = process.env

const verifyToken = (req, res, next) => {

    const token = req.header('token')
    if (!req.header('token')) {
        return res.status(400).send({
            message: 'Token required!'
        })
    } else {
        jwt.verify(token,JWT_PRIVATE_KEY, function (err, decoded) {
            if (!err) {
                if (decoded.role === "admin") {
                    next()
                } else if (decoded.role === "user") {
                    return res.status(403).send({
                        message: 'Access denied!'
                    })
                } else {
                    return res.status(403).send({
                        message: 'Access denied!'
                    })
                }
            } else {
                console.log(err);
                return res.status(400).send({
                    message: 'Invalid token!'
                })
            }
        });
    }
}

module.exports = verifyToken