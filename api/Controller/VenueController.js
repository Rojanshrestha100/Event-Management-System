const Venue = require('../Model/VenueSchema')
const { showError } = require('../Lib/index')
const { unlinkSync } = require('node:fs')
 
class VenuesController {
    index = async (req, res, next) => {
        try{
            const venues = await Venue.find()
  
            res.json(venues)
          }
          catch(err){
              showError(err, next)
          }
      }
    
    store = async (req, res, next) => {
        try {
            const { vname, content } = req.body

            const vimg = req.file ? req.file.filename : ''

            const ext = req.file.filename.split('.')[1] // extension name
            
            if (ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "webp") {
                const data = await Venue.create({
                    vname, content, vimg
                })
    
                res.status(201).json({
                    success: 'Venue created.'
                })
            } else {
                throw Error('Invalid image format! Cannot save in the database!');
            }
            
        } catch(err) {
            showError(err, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const venue = await Venue.findById(req.params.id)

            res.json(venue)
        } catch(err) {
            showError(err, next)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { vname, content } = req.body;
            const venue = await Venue.findById(req.params.id);
            
            if (!venue) {
                return res.status(404).json({ error: 'Venue not found for the provided ID.' });
            }
            
            let vimg = req.file ? req.file.filename : venue.vimg; 
            let ext;

            if (req.file) {
                ext = req.file ? req.file.filename.split('.')[1] : '';
                vimg = req.file.filename;
                if (venue.vimg && venue.vimg.length > 0) {
                    unlinkSync(`images/${venue.vimg}`);
                }

                vimg = req.file.filename;

            } else {
                vimg = venue.vimg;
                ext = venue.vimg.split(".")[1];
            }

            if (!['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
                throw new Error('Invalid image format! Cannot update in the database!');
            }

            await Venue.findByIdAndUpdate(req.params.id, {
                vname,
                content,
                vimg 
            });
            res.json({
                success: 'Venue updated.'
            });
        } catch (err) {
            console.error('Error updating venue:', err);
            return res.status(500).json({ error: 'An error occurred while updating venue.' });
        }
    };
    
    destroy = async (req, res, next) => {
        try {
            const {id} = req.params
            const venue = await Venue.findById(req.params.id)

            if (venue && venue.vimg && venue.vimg.length) {
                try{
                unlinkSync(`images/${venue.vimg}`)
                }
                catch(err){
                    console.log(err)
                }
            }

            await Venue.findByIdAndDelete(id)

            res.json({
                success: 'Venue removed.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
}

module.exports = new VenuesController