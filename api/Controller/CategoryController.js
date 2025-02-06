const Category  = require('../Model/CategorySchema')
const { showError } = require('../Lib/index')

class CategorysCtrl {
    index = async(req, res, next) => {
        try{
          const categories = await Category.find()

          res.json(categories)
        }
        catch(err){
            showError(err, next)
        }
    }

    store = async(req, res, next) => {
        try{
            const { categoryname } = req.body

            await Category.create({
                categoryname
            })

            res.status(201).json({
                sucess: 'Category created.'
            })
        }
        catch(err){
            showError(err, next)
        }
    }

    show = async(req, res, next) => {
        try{
            const category = await Category.findById(req.params.id)

            res.json(category)
        }
        catch(err){
            showError(err, next)
        }
    }

    update = async(req, res, next) => {
        try{
            const { categoryname } = req.body

            await Category.findByIdAndUpdate(req.params.id, {
                categoryname
            })

            res.status(201).json({
                sucess: 'Category updated.'
            })
        }
        catch(err){
            showError(err, next)
        }
    }

    destroy = async(req, res, next) => {
        try{
            await Category.findByIdAndDelete(req.params.id)

            res.status(201).json({
                sucess: 'Category deleted.'
            })
        }
        catch(err){
            showError(err, next)
        }
    }
}

module.exports = new CategorysCtrl
