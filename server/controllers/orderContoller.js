const {Orders, Details} = require('../models/models');
const ApiError = require('../error/apiError')


class OrderController {
    async create(req, res, next) {
        try {
            let {address, comment, recipient, details} = req.body
            const order = await Orders.create({address, comment, recipient})
            if (details) {
                details = JSON.parse(details)
                details.forEach(detail =>
                    Details.create({
                        category: detail.category,
                        full_name: detail.full_name,
                        color: detail.color,
                        size: detail.size,
                        amount: detail.amount,
                        link: detail.link,
                        comment: detail.comment,
                        term: detail.term,
                        priority: detail.priority,
                        status: detail.status,
                        status_comment: detail.status_comment,
                        orderId: order.id
                    })
                )
            }
            return res.json(order)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {

    }

    async getOne(req, res) {
        const {id} = req.params
        const order = await Orders.findOne(
            {
                where: {id},
                include: [{model: Details, as: 'details'}]
            },
        )
        return res.json(order)
    }


    async putOne(req, res) {

    }

    async removeOne(req, res) {

    }
};


module.exports = new OrderController();