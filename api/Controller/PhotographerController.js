const Photographer = require('../Model/PhotographerSchema')
const { showError } = require('../Lib/index')
const { unlinkSync } = require('node:fs')
 
class PhotographersController {
    index = async (req, res, next) => {
        try{
            const photographers = await Photographer.find()
  
            res.json(photographers)
          }
          catch(err){
              showError(err, next)
          }
      }
    
      store = async (req, res, next) => {
        try {
            const { pcontactinfo, content } = req.body;
            const pimg = req.file ? req.file.filename : '';
    
            const pg = await Photographer.findOne({ pcontactinfo });
            const regex = /^98\d{8}$/;
            const ext = req.file ? req.file.filename.split('.')[1] : '';
    
            if (pg) {
                throw new Error("Photographer already exists.");
            }
    
            if (!(regex.test(pcontactinfo) && ['jpg', 'jpeg', 'png', 'webp'].includes(ext))) {
                throw new Error('Invalid contact or image format! Cannot save in the database!');
            }
    
            await Photographer.create({
                pcontactinfo, content, pimg
            });
    
            res.status(201).json({
                success: 'Photographer created.'
            });
        } catch (err) {
            showError(err, next);
        }
    }
    
    
    show = async (req, res, next) => {
        try {
            const photographer = await Photographer.findById(req.params.id)

            res.json(photographer)
        } catch(err) {
            showError(err, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { pcontactinfo, content } = req.body;
            const photographer = await Photographer.findById(req.params.id);
            
            if (!photographer) {
                return res.status(404).json({ error: 'Photographer not found for the provided ID.' });
            }
            
            let pimg = req.file ? req.file.filename : photographer.pimg; 
            const regex = /^98\d{8}$/;
            let ext;

            if (req.file) {
                ext = req.file ? req.file.filename.split('.')[1] : '';
                pimg = req.file.filename;
                if (photographer.pimg && photographer.pimg.length > 0) {
                    unlinkSync(`images/${photographer.pimg}`);
                }

                pimg = req.file.filename;

            } else {
                pimg = photographer.pimg;
                ext = photographer.pimg.split(".")[1];
            }

            if (!(regex.test(pcontactinfo) && ['jpg', 'jpeg', 'png', 'webp'].includes(ext))) {
                throw new Error('Invalid contact or image format! Cannot update in the database!');
            }

            await Photographer.findByIdAndUpdate(req.params.id, {
                pcontactinfo,
                content,
                pimg 
            });
            res.json({
                success: 'Photographer updated.'
            });
        } catch (err) {
            console.error('Error updating photographer:', err);
            return res.status(500).json({ error: 'An error occurred while updating photographer.' });
        }
    };
    
    
    
    destroy = async (req, res, next) => {
        try {
            const {id} = req.params
            const photographer = await Photographer.findById(req.params.id)

            if (photographer && photographer.pimg && photographer.pimg.length) {
                try{
                unlinkSync(`images/${photographer.pimg}`)
                }
                catch(err){
                    console.log(err)
                }
            }

            await Photographer.findByIdAndDelete(id)

            res.json({
                success: 'Photographer removed.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
}

module.exports = new PhotographersController