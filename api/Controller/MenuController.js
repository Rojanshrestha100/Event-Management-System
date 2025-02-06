const Menu  = require('../Model/MenuSchema')
const { showError } = require('../Lib/index')
 
class MenusController {
    index = async (req, res, next) => {
        try {
            const menus = await Menu.aggregate([
                {$lookup: {from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category'}}
            ]).exec()

            res.json(menus)
        } catch(err) {
            showError(err, next)
        }
    }
  
    store = async (req, res, next) => {
        try {

            const { menuitems,categoryId}=req.body;

            const menu = await Menu.create({
                menuitems, 
                categoryId
            })
            if(menu){
                res.status(201).json({
                success: 'Menu created.'
            })
            }
        
            
        } catch(err) {
            showError(err, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const menu = await Menu.findById(req.params.id)

            res.json(menu)
        } catch(err) {
            showError(err, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { menuitems, categoryId } = req.body
            
            await Menu.findByIdAndUpdate(req.params.id, {
                menuitems, categoryId
            })

            res.json({
                success: 'Menu updated.'
            })
        } catch (err) {
            showError(err, next)
        }
    }
    
    destroy = async (req, res, next) => {
        try {

            await Menu.findByIdAndDelete(req.params.id)

            res.json({
                success: 'Menu removed.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
}

module.exports = new MenusController