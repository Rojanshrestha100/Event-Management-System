const express = require('express')
const CatreenController = require('../../Controller/CatreenController')
const { uploadImage } = require('../../Lib/index')

const router = express.Router()

router.route('/')
    .get(CatreenController.index)
    .post(uploadImage().single('file'), CatreenController.store)

router.route('/:id')
    .get(CatreenController.show)
    .put(uploadImage().single('file'), CatreenController.update)
    .patch(uploadImage().single('file'), CatreenController.update)
    .delete(uploadImage().single('file'),CatreenController.destroy)

module.exports = router