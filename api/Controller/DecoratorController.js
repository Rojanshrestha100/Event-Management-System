const Decorator = require('../Model/DecoratorSchema')
const { showError } = require('../Lib/index')
const { unlinkSync } = require('node:fs')
 
class DecoratorsController {
    index = async (req, res, next) => {
        try{
            const decorators = await Decorator.find()
  
            res.json(decorators)
          }
          catch(err){
              showError(err, next)
          }
      }
    
    store = async (req, res, next) => {
        try {
            const { dcontactinfo, content } = req.body
            const dimg = req.file ? req.file.filename : ''

            const pg = await Decorator.findOne({ dcontactinfo });
            const regex = /^98\d{8}$/;
            const ext = req.file ? req.file.filename.split('.')[1] : '';
    
            if (pg) {
                throw new Error("Decorator already exists.");
            }
    
            if (!(regex.test(dcontactinfo) && ['jpg', 'jpeg', 'png', 'webp'].includes(ext))) {
                throw new Error('Invalid contact or image format! Cannot save in the database!');
            }

            await Decorator.create({
                dcontactinfo, content, dimg
            })

            res.status(201).json({
                success: 'Decorator created.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const decorator = await Decorator.findById(req.params.id)

            res.json(decorator)
        } catch(err) {
            showError(err, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { dcontactinfo, content } = req.body;
            const decorator = await Decorator.findById(req.params.id);
            
            if (!decorator) {
                return res.status(404).json({ error: 'Decorator not found for the provided ID.' });
            }
            
            let dimg = req.file ? req.file.filename : decorator.dimg; 
            const regex = /^98\d{8}$/;
            let ext;

            if (req.file) {
                ext = req.file ? req.file.filename.split('.')[1] : '';
                dimg = req.file.filename;
                if (decorator.dimg && decorator.dimg.length > 0) {
                    unlinkSync(`images/${decorator.dimg}`);
                }

                dimg = req.file.filename;

            } else {
                dimg = decorator.dimg;
                ext = decorator.dimg.split(".")[1];
            }

            if (!(regex.test(dcontactinfo) && ['jpg', 'jpeg', 'png', 'webp'].includes(ext))) {
                throw new Error('Invalid contact or image format! Cannot update in the database!');
            }

            await Decorator.findByIdAndUpdate(req.params.id, {
                dcontactinfo,
                content,
                dimg 
            });
            res.json({
                success: 'Decorator updated.'
            });
        } catch (err) {
            console.error('Error updating decorator:', err);
            return res.status(500).json({ error: 'An error occurred while updating decorator.' });
        }
    };
    
    destroy = async (req, res, next) => {
        try {
            const {id} = req.params
            const decorator = await Decorator.findById(req.params.id)

            if (decorator && decorator.dimg && decorator.dimg.length) {
                try{
                unlinkSync(`images/${decorator.dimg}`)
                }
                catch(err){
                    console.log(err)
                }
            }

            await Decorator.findByIdAndDelete(id)

            res.json({
                success: 'Decorator removed.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
}

module.exports = new DecoratorsController