const mongoose= require("mongoose");
const CategoryModel= new mongoose.Schema({
   categoryname:{ 
    type:String,
    required:true
   }
})


const Category=new mongoose.model("category", CategoryModel);
module.exports=Category;
