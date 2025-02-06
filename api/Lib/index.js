const jwt = require('jsonwebtoken')
const Admin  = require('../Model/AdminSchema')
const Customer  = require('../Model/CustomerSchema')
const multer = require('multer')


const showError = (error, next) => {

            next({
                message: 'Problem while processing request.',
                status: 400
            })
}


const auth = async (req, res, next) => {
    // console.log(req.headers.authroization);
    if('authorization' in req.headers) {
        const token = req.headers.authorization.split(" ").pop()

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)

            const admin = await Admin.findById(payload.id)

            if(admin) {
                    req.admin = admin
                    next()
            } else {
                next({
                    message: 'Invalid token.',
                    status: 401
                })
            }
        } catch(err) {
            next({
                message: 'Invalid token.',
                status: 401
            })
        }
    } else {
        next({
            message: 'Token missing.',
            status: 401
        })
    }
}


const auth0 = async (req, res, next) => {
    if('authorization' in req.headers) {
        const token = req.headers.authorization.split(" ").pop()
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)

            const customer = await Customer.findById(payload.id)

            if(customer) {
                req.customer = customer
                next()
            } else {
                // console.log("The upper error !");
                next({
                    message: 'Invalid token.',
                    status: 401
                })
            }
        } catch(err) {
            // console.log("HEREEE IS THE ERROR PART");
            next({
                message: 'Invalid token.',
                status: 401
            })
        }
    } else {
        next({
            message: 'Token missing.',
            status: 401
        })
    }
}


const uploadImage = () => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'images/'),
        filename: (req, file, cb) => {
            const ext = file.originalname.split('.').pop()
            
            cb(null, `img${Date.now()}.${ext}`)
        }
    })

})


module.exports = { showError, uploadImage, auth, auth0 }