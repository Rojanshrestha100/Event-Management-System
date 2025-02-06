const Catreen = require('../Model/CatreenSchema')
const { showError } = require('../Lib/index')
const { unlinkSync } = require('node:fs')
 
class CatreensController {
    index = async (req, res, next) => {
        try{
            const catreens = await Catreen.find()
  
            res.json(catreens)
          }
          catch(err){
              showError(err, next)
          }
      }
    
    store = async (req, res, next) => {
        try {
            const { ccontactinfo, content } = req.body
            const cimg = req.file ? req.file.filename : ''

            const pg = await Catreen.findOne({ ccontactinfo });
            const regex = /^98\d{8}$/;
            const ext = req.file ? req.file.filename.split('.')[1] : '';
    
            if (pg) {
                throw new Error("Catreen already exists.");
            }
    
            if (!(regex.test(ccontactinfo) && ['jpg', 'jpeg', 'png', 'webp'].includes(ext))) {
                throw new Error('Invalid contact or image format! Cannot save in the database!');
            }

            await Catreen.create({
                ccontactinfo, content, cimg
            })

            res.status(201).json({
                success: 'Catreen created.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const catreen = await Catreen.findById(req.params.id)

            res.json(catreen)
        } catch(err) {
            showError(err, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { ccontactinfo, content } = req.body;
            const catreen = await Catreen.findById(req.params.id);
            
            if (!catreen) {
                return res.status(404).json({ error: 'Catreen not found for the provided ID.' });
            }
            
            let cimg = req.file ? req.file.filename : catreen.cimg; 
            const regex = /^98\d{8}$/;
            let ext;

            if (req.file) {
                ext = req.file ? req.file.filename.split('.')[1] : '';
                cimg = req.file.filename;
                if (catreen.cimg && catreen.cimg.length > 0) {
                    unlinkSync(`images/${catreen.cimg}`);
                }

                cimg = req.file.filename;

            } else {
                cimg = catreen.cimg;
                ext = catreen.cimg.split(".")[1];
            }

            if (!(regex.test(ccontactinfo) && ['jpg', 'jpeg', 'png', 'webp'].includes(ext))) {
                throw new Error('Invalid contact or image format! Cannot update in the database!');
            }

            await Catreen.findByIdAndUpdate(req.params.id, {
                ccontactinfo,
                content,
                cimg 
            });
            res.json({
                success: 'Catreen updated.'
            });
        } catch (err) {
            console.error('Error updating catreen:', err);
            return res.status(500).json({ error: 'An error occurred while updating catreen.' });
        }
    };
    
    destroy = async (req, res, next) => {
        try {
            const {id} = req.params
            const catreen = await Catreen.findById(req.params.id)

            if (catreen && catreen.cimg && catreen.cimg.length) {
                try{
                unlinkSync(`images/${catreen.cimg}`)
                }
                catch(err){
                    console.log(err)
                }
            }

            await Catreen.findByIdAndDelete(id)

            res.json({
                success: 'Catreen removed.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
}

module.exports = new CatreensController