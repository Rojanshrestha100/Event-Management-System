const express = require('express')
const MusicController = require('../../Controller/MusicController')

const router = express.Router()

router.route('/')
    .get(MusicController.index)

router.route('/:id')
    .get(MusicController.show)

module.exports = router