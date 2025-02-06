const mongoose= require("mongoose");
const VenueModel= new mongoose.Schema({
   vname:{ 
    type:String,
    required:true
   },
   content: {
      type: String,
      required: true,
  },
   vimg: {
      type: String
   }
})


const Venue=new mongoose.model("venue",VenueModel);
module.exports=Venue;
