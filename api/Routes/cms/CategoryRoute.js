const express = require('express')
const CategoryController = require('../../Controller/CategoryController.js')

const router = express.Router()

router.route('/')  
    .get(CategoryController.index)
    .post(CategoryController.store)

router.route('/:id')
    .get(CategoryController.show)
    .put(CategoryController.update)
    .patch(CategoryController.update)
    .delete(CategoryController.destroy)

module.exports = router

 
