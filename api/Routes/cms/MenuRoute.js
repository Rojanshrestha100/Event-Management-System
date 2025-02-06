const express = require('express')
const MenuController = require('../../Controller/MenuController.js')

const router = express.Router()

router.route('/')  
    .get(MenuController.index)
    .post(MenuController.store)

router.route('/:id')
    .get(MenuController.show)
    .post(MenuController.store)
    .put(MenuController.update)
    .patch(MenuController.update)
    .delete(MenuController.destroy)

module.exports = router

 
