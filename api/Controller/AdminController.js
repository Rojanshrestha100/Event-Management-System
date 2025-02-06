const Admin  = require('../Model/AdminSchema')
const { showError } = require('../Lib/index')
const bcrypt = require('bcryptjs')

class AdminsCtrl {
    index = async(req, res, next) => {
        try{
          const admins = await Admin.find()

          res.json(admins)
        }
        catch(err){
            showError(err, next)
        }
    }

    store = async(req, res, next) => {
        try{
            const { adminname, password } = req.body

            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

            await Admin.create({
                adminname, password: hash
            })

            res.status(201).json({
                sucess: 'Admin created.'
            })
        }
        catch(err){
            showError(err, next)
        }
    }

    show = async(req, res, next) => {
        try{
            const admin = await Admin.findById(req.params.id)

            res.json(admin)
        }
        catch(err){
            showError(err, next)
        }
    }

    update = async(req, res, next) => {
        try{
            const { adminname,password } = req.body

            const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

            await Admin.findByIdAndUpdate(req.params.id, {
                adminname, password: hash
            })

            res.status(201).json({
                sucess: 'Admin updated.'
            })
        }
        catch(err){
            showError(err, next)
        }
    }

    destroy = async(req, res, next) => {
        try{
            await Admin.findByIdAndDelete(req.params.id)

            res.status(201).json({
                sucess: 'Admin deleted.'
            })
        }
        catch(err){
            showError(err, next)
        }
    }
}

module.exports = new AdminsCtrl
