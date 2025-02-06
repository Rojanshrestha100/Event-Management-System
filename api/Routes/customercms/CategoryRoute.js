const express = require('express')
const CategoryController = require('../../Controller/CategoryController.js')

const router = express.Router()

router.route('/')  
    .get(CategoryController.index)

router.route('/:id')
    .get(CategoryController.show)

module.exports = router

 
