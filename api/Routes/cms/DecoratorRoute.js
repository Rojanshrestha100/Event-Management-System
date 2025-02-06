const express = require('express')
const DecoratorController = require('../../Controller/DecoratorController')
const { uploadImage } = require('../../Lib/index')

const router = express.Router()

router.route('/')
    .get(DecoratorController.index)
    .post(uploadImage().single('file'), DecoratorController.store)

router.route('/:id')
    .get(DecoratorController.show)
    .put(uploadImage().single('file'), DecoratorController.update)
    .patch(uploadImage().single('file'), DecoratorController.update)
    .delete(uploadImage().single('file'),DecoratorController.destroy)

module.exports = router