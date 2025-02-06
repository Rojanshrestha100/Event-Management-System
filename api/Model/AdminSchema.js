const mongoose= require("mongoose");
const AdminModel= new mongoose.Schema({
   adminname:{ 
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   }  
})


const Admin=new mongoose.model("admin", AdminModel);
module.exports=Admin;
