// express validator
const { body, check, validationResult } = require('express-validator')
const checkDuplicate = require('./checkDuplicate')

// PRODUCT
    // RULES
    const rulesProduct = [
        check('title')
            .notEmpty().withMessage('The title of product cannot empty')
            .trim()
            .escape(),

        // check('img')
        //     .notEmpty().withMessage('The image of product cannot empty')
        //     .trim()
        //     .escape(),

        check('category')
            .notEmpty().withMessage('The category of product cannot empty')
            .trim()
            .escape(),

        check('price')
            .notEmpty().withMessage('The price of product cannot empty')
            .isNumeric().withMessage('The price of product must be a numeric')
            .trim()
            .escape(),
    ]
    // RESPONSE AND CONDITION
    const product = [
        //Rules
        rulesProduct,

        //Response
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()[0].msg })
            }
            next();
        }
    ]

// PRODUCT DETAIL/ORDER
    // RULES
    const rulesOrder = [
        check('title')
            .notEmpty().withMessage('The title of product cannot empty')
            .trim()
            .escape(),

        check('price')
            .notEmpty().withMessage('The price of product cannot empty')
            .isNumeric().withMessage('The price of product must be a numeric')
            .trim()
            .escape(),

        check('img')
            .notEmpty().withMessage('The image of product cannot empty')
            .trim()
            .escape(),

        check('category')
            .notEmpty().withMessage('The category of product cannot empty')
            .trim()
            .escape(),

        check('size')
            .notEmpty().withMessage('The size of product cannot empty')
            .trim()
            .escape(),

        check('quantity')
            .notEmpty().withMessage('The quantity of product cannot empty')
            .trim()
            .escape(),

        check('delivery')
            .notEmpty().withMessage('The delivery of product cannot empty')
            .trim()
            .escape(),

        check('time')
            .notEmpty().withMessage('The time of product cannot empty')
            .trim()
            .escape(),
    ]
    // RESPONSE AND CONDITION
    const order = [
        //Rules
        rulesOrder,

        //Response
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()[0].msg })
            }
            next();
        }
    ]

// USERS
    // RULES
    const rulesUsers = [
        check('email')
            .notEmpty().withMessage('email cannot empty')
            .trim()
            .escape(),

        body('email').custom(async value => {
            const duplicateName = await checkDuplicate(value)
            if (duplicateName) {
                throw new Error('email already registered!')
            }
            return true
        }),

        check('password')
            .notEmpty().withMessage('password cannot empty')
            .trim()
            .escape(),

        check('phone')
            .notEmpty().withMessage('mobile number cannot empty')
            .isNumeric().withMessage('mobile number must be a numeric')
            .trim()
            .escape(),

        check('full_name')
            .notEmpty().withMessage('name cannot empty')
            .trim()
            .escape(),
    ]
    // RESPONSE AND CONDITION
    const users = [
        //Rules
        rulesUsers,

        //Response
        (req, res, next) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()[0].msg })
            }
            next();
        }
    ]

    // const filesPayloadExists = (req, res, next) => {
    //     if (!req.files) return res.status(400).json({ status: 'error', message: 'Missing files!' })
    //     next()
    // } 

module.exports = { product, order, users }


