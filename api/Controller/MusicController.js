const Music = require('../Model/MusicSchema')
const { showError } = require('../Lib/index')
const { unlinkSync } = require('node:fs')
 
class MusicsController {
    index = async (req, res, next) => {
        try{
            const musics = await Music.find()
  
            res.json(musics)
          }
          catch(err){
              showError(err, next)
          }
      }
    
    store = async (req, res, next) => {
        try {
            const { mcontactinfo, content } = req.body
            const mimg = req.file ? req.file.filename : ''

            const pg = await Music.findOne({ mcontactinfo });
            const regex = /^98\d{8}$/;
            const ext = req.file ? req.file.filename.split('.')[1] : '';
    
            if (pg) {
                throw new Error("Music already exists.");
            }
    
            if (!(regex.test(mcontactinfo) && ['jpg', 'jpeg', 'png', 'webp'].includes(ext))) {
                throw new Error('Invalid contact or image format! Cannot save in the database!');
            }

            await Music.create({
                mcontactinfo, content, mimg
            })

            res.status(201).json({
                success: 'Music created.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const music = await Music.findById(req.params.id)

            res.json(music)
        } catch(err) {
            showError(err, next)
        }
    }
    
    
    update = async (req, res, next) => {
        try {
            const { mcontactinfo, content } = req.body;
            const music = await Music.findById(req.params.id);
            
            if (!music) {
                return res.status(404).json({ error: 'Music not found for the provided ID.' });
            }
            
            let mimg = req.file ? req.file.filename : music.mimg; 
            const regex = /^98\d{8}$/;
            let ext;

            if (req.file) {
                ext = req.file ? req.file.filename.split('.')[1] : '';
                mimg = req.file.filename;
                if (music.mimg && music.mimg.length > 0) {
                    unlinkSync(`images/${music.mimg}`);
                }

                mimg = req.file.filename;

            } else {
                mimg = music.mimg;
                ext = music.mimg.split(".")[1];
            }

            if (!(regex.test(mcontactinfo) && ['jpg', 'jpeg', 'png', 'webp'].includes(ext))) {
                throw new Error('Invalid contact or image format! Cannot update in the database!');
            }

            await Music.findByIdAndUpdate(req.params.id, {
                mcontactinfo,
                content,
                mimg 
            });
            res.json({
                success: 'Music updated.'
            });
        } catch (err) {
            console.error('Error updating music:', err);
            return res.status(500).json({ error: 'An error occurred while updating music.' });
        }
    };
    
    destroy = async (req, res, next) => {
        try {
            const {id} = req.params
            const music = await Music.findById(req.params.id)

            if (music && music.mimg && music.mimg.length) {
                try{
                unlinkSync(`images/${music.mimg}`)
                }
                catch(err){
                    console.log(err)
                }
            }

            await Music.findByIdAndDelete(id)

            res.json({
                success: 'Music removed.'
            })
        } catch(err) {
            showError(err, next)
        }
    }
}

module.exports = new MusicsController