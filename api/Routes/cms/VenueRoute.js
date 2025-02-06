const express = require('express')
const VenueController = require('../../Controller/VenueController')
const { uploadImage } = require('../../Lib/index')

const router = express.Router()

router.route('/')
    .get(VenueController.index)
    .post(uploadImage().single('file'), VenueController.store)

router.route('/:id')
    .get(VenueController.show)
    .put(uploadImage().single('file'), VenueController.update)
    .patch(uploadImage().single('file'), VenueController.update)
    .delete(uploadImage().single('file'),VenueController.destroy)

module.exports = router