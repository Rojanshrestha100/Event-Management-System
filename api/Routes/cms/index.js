const express = require('express')
const adminRoutes = require('../cms/AdminRoute')
const venueRoutes = require('../cms/VenueRoute')
const catreenRoutes = require('../cms/CatreenRoute')
const decoratorRoutes = require('../cms/DecoratorRoute')
const photographerRoutes = require('../cms/PhotographerRoute')
const musicRoutes = require('../cms/MusicRoute')
const categoryRoutes = require('../cms/CategoryRoute')
const menuRoutes = require('../cms/MenuRoute')
const orderRoutes = require('../cms/OrderRoute')
const customerRoutes = require('../cms/CustomerRoute')

const router = express.Router()

router.use('/admins', adminRoutes)
router.use('/venues', venueRoutes)
router.use('/catreens', catreenRoutes)
router.use('/decorators', decoratorRoutes)
router.use('/photographers', photographerRoutes)
router.use('/musics', musicRoutes)
router.use('/categories', categoryRoutes)
router.use('/menus', menuRoutes)
router.use('/orders', orderRoutes)
router.use('/customers', customerRoutes)

module.exports = router 
