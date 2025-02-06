const mongoose= require("mongoose");
const MusicModel= new mongoose.Schema({
   mcontactinfo:{ 
    type:Number,
    required:true
   },
   content: {
      type: String,
      required: true,
  },
   mimg: {
      type: String
   }
})


const Music=new mongoose.model("music",MusicModel);
module.exports=Music;
