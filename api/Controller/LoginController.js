const { showError } = require('../Lib/index')
const Admin  = require('../Model/AdminSchema')
const Customer  = require('../Model/CustomerSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class LoginCtrl {

    check = async (req, res, next) => {
        try {
            const { adminname, password } = req.body

            const admin = await Admin.findOne({adminname})

            if(admin) {
                if(bcrypt.compareSync(password, admin.password)) {
                    const token = jwt.sign({
                        id: admin._id,
                        iat: Math.floor(Date.now()/1000),
                        exp: Math.floor(Date.now()/1000) + (1*60*60),
                    }, process.env.JWT_SECRET)

                    res.json({token, admin})
                } else {
                    next({
                        message: 'Invalid password.',
                        status: 422,
                    })
                }
            } else {
                next({
                    message: 'Invalid adminname.',
                    status: 422,
                })
            }
        } catch(err) {
            showError(err, next)
        }
    }

}


module.exports = new LoginCtrl