const express = require('express')
const OrderController = require('../../Controller/OrderController')

const router = express.Router()

router.route('/')
    .get(OrderController.index)
    .post(OrderController.store)

router.route('/:id')
    .get(OrderController.show)
    .put(OrderController.update)
    .patch(OrderController.update)
    .delete(OrderController.destroy)

module.exports = router