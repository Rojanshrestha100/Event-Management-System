const express = require('express')
const CatreenController = require('../../Controller/CatreenController')
const router = express.Router()

router.route('/')
    .get(CatreenController.index)

router.route('/:id')
    .get(CatreenController.show)

module.exports = router