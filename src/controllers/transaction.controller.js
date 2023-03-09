const transactionModel = require("../model/transaction.model")
const { Pagination, formResponse } = require("../../helper")

const transactionController = {
    create: (req, res) => {
        return transactionModel.create(req.body)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    // create: async (req, res) => {
    //     const request = {
    //         ...req.body
    //     }
    //     try {
    //         const resultTransactionById = await transactionModel.update(request.id)
    //         console.log(resultTransactionById);
    //         if(resultTransactionById.balance < request.amount){
    //             return res.status(500).send({
    //                 message: 'Not enough money, please top up first'
    //             })
    //         }
    //         const result = await transactionModel.create(request)
    //         return res.status(201).send({ message: "Success", data: result })
            
    //     } catch (error){
    //         return res.status(500).send(error)
    //     }
    // },

    read: (req, res) => {
        let { search, status, sortBy, page, limit } = req.query
        let offset = Pagination.buildOffset(page, limit)
        return transactionModel.read(search, status, sortBy, limit, offset)
            .then((result) => {
                return res.status(200).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    readDetail: (req, res) => {
        return transactionModel.readDetail(req.params.id)
            .then((result) => {
                if (result != null) {
                    return res.status(200).send({ message: "Success", data: result })
                } else {
                    return res.status(404).send({ message: "Sorry data not found! Please check your input ID!" })
                }
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },
    update: (req, res) => {
        const request = {
            ...req.body,
            id: req.params.id
        }
        // console.log(request);
        return transactionModel.update(request)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },
    remove: (req, res) => {
        return transactionModel.remove(req.params.id)
            .then((result) => {
                return res.status(200).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    }
}

module.exports = transactionController