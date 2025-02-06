const express = require('express')
const CustomerController = require('../../Controller/CustomerController.js')

const router = express.Router()

router.route('/')  
    .get(CustomerController.index)
    .post(CustomerController.store)

router.route('/:id')
    .get(CustomerController.show)
    .put(CustomerController.update)
    .patch(CustomerController.update)
    .delete(CustomerController.destroy)

module.exports = router

 
