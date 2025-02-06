const express = require('express')
const MenuController = require('../../Controller/MenuController.js')

const router = express.Router()

router.route('/')  
    .get(MenuController.index)

router.route('/:id')
    .get(MenuController.show)

module.exports = router

 
