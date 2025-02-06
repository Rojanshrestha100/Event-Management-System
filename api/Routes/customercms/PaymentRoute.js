const express = require('express')
const PaymentController = require('../../Controller/PaymentController')

const router = express.Router()

router.post('/payment', PaymentController.createPayment)

module.exports = router