const express = require('express')
const PhotographerController = require('../../Controller/PhotographerController')
const { uploadImage } = require('../../Lib/index')

const router = express.Router()

router.route('/')
    .get(PhotographerController.index)
    .post(uploadImage().single('file'), PhotographerController.store)

router.route('/:id')
    .get(PhotographerController.show)
    .put(uploadImage().single('file'), PhotographerController.update)
    .patch(uploadImage().single('file'), PhotographerController.update)
    .delete(uploadImage().single('file'),PhotographerController.destroy)

module.exports = router