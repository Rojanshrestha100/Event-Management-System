const express = require('express')
const DecoratorController = require('../../Controller/DecoratorController')

const router = express.Router()

router.route('/')
    .get(DecoratorController.index)

router.route('/:id')
    .get(DecoratorController.show)

module.exports = router