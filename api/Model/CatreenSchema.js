const mongoose= require("mongoose");
const CatreenModel= new mongoose.Schema({
   ccontactinfo:{ 
    type:Number,
    required:true
   },
   content: {
      type: String,
      required: true,
  },
   cimg: {
      type: String
   }
})


const Catreen=new mongoose.model("catreen",CatreenModel);
module.exports=Catreen;
