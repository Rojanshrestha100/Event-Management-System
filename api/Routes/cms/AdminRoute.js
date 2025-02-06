const express = require('express')
const AdminController = require('../../Controller/AdminController.js')

const router = express.Router()

router.route('/')  
    .get(AdminController.index)
    .post(AdminController.store)

router.route('/:id')
    .get(AdminController.show)
    .put(AdminController.update)
    .patch(AdminController.update)
    .delete(AdminController.destroy)

module.exports = router

 
