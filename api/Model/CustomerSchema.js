const mongoose= require("mongoose");
const CustomerModel= new mongoose.Schema({
   cname:{ 
      type:String,
      required:true
     },
   
   contact:{ 
      type:Number,
      required:true
   },
   address:{ 
      type:String,
      required:true
   },
   username:{ 
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   }
})


const Customer=new mongoose.model("customer",CustomerModel);
module.exports=Customer;
