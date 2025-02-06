const express = require('express')
const cmsRoutes = require('./cms')
const customercmsRoutes = require('./customercms')
const { auth, auth0 } = require('../Lib/index')
const LoginCtrl = require('../Controller/LoginController');
const CustomerLoginCtrl = require('../Controller/CustomerLoginController');
const CustomerController = require('../Controller/CustomerController')

const router = express.Router()

router.use('/cms', auth, cmsRoutes)
router.post('/login', LoginCtrl.check)
router.use('/cuscms', auth0, customercmsRoutes)
router.post('/customerlogin', CustomerLoginCtrl.check)
router.post('/register',CustomerController.store)


router.get('/images/:filename', (req, res, next) => {
    res.sendFile(`images/${req.params.filename}`, { root: './' })
});

router.post('/images/:filename', (req, res, next) => {
    res.sendFile(`images/${req.params.filename}`, { root: './' })
});

router.patch('/images/:filename', (req, res, next) => {
    res.sendFile(`images/${req.params.filename}`, { root: './' })
});

module.exports = router 
