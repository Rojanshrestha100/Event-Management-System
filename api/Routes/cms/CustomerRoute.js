const express = require('express')
const CustomerController = require('../../Controller/CustomerController.js')

const router = express.Router()

router.route('/')  
    .get(CustomerController.index)

router.route('/:id')
    .get(CustomerController.show)
    .delete(CustomerController.destroy)



module.exports = router

 
