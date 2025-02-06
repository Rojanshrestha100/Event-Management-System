const { showError } = require('../Lib/index')
const Customer  = require('../Model/CustomerSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class CustomerLoginCtrl {

    check = async (req, res, next) => {
        try {
            const { username, password } = req.body

            const customer = await Customer.findOne({username})

            if(customer) {
                if(bcrypt.compareSync(password, customer.password)) {
                    const token = jwt.sign({
                        id: customer._id,
                        iat: Math.floor(Date.now()/1000),
                        exp: Math.floor(Date.now()/1000) + (5*60*60),
                    }, process.env.JWT_SECRET)

                    res.json({token, customer})
                } else {
                    next({
                        message: 'Invalid password.',
                        status: 422,
                    })
                }
            } else {
                next({
                    message: 'Invalid username.',
                    status: 422,
                })
            }
        } catch(err) {
            showError(err, next)
        }
    }

}


module.exports = new CustomerLoginCtrl