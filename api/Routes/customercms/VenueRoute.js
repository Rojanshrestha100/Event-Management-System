const express = require('express')
const VenueController = require('../../Controller/VenueController')

const router = express.Router()

router.route('/')
    .get(VenueController.index)

router.route('/:id')
    .get(VenueController.show)

module.exports = router