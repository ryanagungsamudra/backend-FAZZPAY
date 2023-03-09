const Pagination = {
    buildOffset: (page, limit) => {
        let result = (page - 1) * limit
        return result ? result : 0
    }
}

module.exports = Pagination