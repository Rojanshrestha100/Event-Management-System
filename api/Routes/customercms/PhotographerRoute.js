const express = require('express')
const PhotographerController = require('../../Controller/PhotographerController')
const { uploadImage } = require('../../Lib/index')

const router = express.Router()

router.route('/')
    .get(PhotographerController.index)

router.route('/:id')
    .get(PhotographerController.show)

module.exports = router