const authModel = require("../model/auth.model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const { JWT_PRIVATE_KEY } = process.env

const authController = {
    login: (req, res) => {
        return authModel.login(req.body)
            .then((result) => {
                jwt.sign({ id: result.id }, JWT_PRIVATE_KEY, (err, token) => {
                    return res.status(200).send({message: "success", data: {
                            token,
                            user: {
                                id: result.id,
                                email: result.email,
                                full_name: result.full_name,
                                phone: result.phone
                            },
                        }
                    })
                })
            }).catch((error) => {
                return res.status(500).send({ message: error })
            })
    },
    signup: (req, res) => {
        //PR: bikin validasi keseluruhan endpoint
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).send({ message: err.message })
            } else {
                const request = {
                    email: req.body.email,
                    password: hash,
                    full_name: req.body.full_name,
                    phone: req.body.phone
                }
                return authModel.signup(request)
                    .then((result) => {
                        return res.status(201).send({ message: "succes", data: result })
                    }).catch((error) => {
                        return res.status(500).send({ message: error })
                    })
            }
        })
    },
}

module.exports = authController