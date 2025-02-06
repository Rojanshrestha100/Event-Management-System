const express = require('express')
const MusicController = require('../../Controller/MusicController')
const { uploadImage } = require('../../Lib/index')

const router = express.Router()

router.route('/')
    .get(MusicController.index)
    .post(uploadImage().single('file'), MusicController.store)

router.route('/:id')
    .get(MusicController.show)
    .put(uploadImage().single('file'), MusicController.update)
    .patch(uploadImage().single('file'), MusicController.update)
    .delete(uploadImage().single('file'),MusicController.destroy)

module.exports = router