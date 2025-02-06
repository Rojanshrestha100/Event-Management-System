const mongoose= require("mongoose");
const DecoratorsModel= new mongoose.Schema({
   dcontactinfo:{ 
    type:Number,
    required:true
   },
   content: {
      type: String,
      required: true,
  },
   dimg: {
      type: String
   }
})


const Decorators=new mongoose.model("decorators",DecoratorsModel);
module.exports=Decorators;
