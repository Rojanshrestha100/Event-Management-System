const mongoose= require("mongoose");
const PhotographerModel= new mongoose.Schema({
   pcontactinfo:{ 
    type:Number,
    required:true
   },
   content: {
      type: String,
      required: true,
  },
   pimg: {
      type: String
   }
})


const Photographer=new mongoose.model("photographer",PhotographerModel);
module.exports=Photographer;
