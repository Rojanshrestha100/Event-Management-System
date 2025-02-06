const express = require('express')
const OrderController = require('../../Controller/OrderController.js')

const router = express.Router()

router.route('/')  
    .get(OrderController.index)

router.route('/:id')
    .get(OrderController.show)
    .delete(OrderController.destroy)

module.exports = router

 
