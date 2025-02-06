const mongoose= require("mongoose");
const MenuModel= new mongoose.Schema({
   menuitems:{ 
    type:String,
    required:true
   },
   categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: 'categories'
  }
})


const Menu=new mongoose.model("menu",MenuModel);
module.exports=Menu;
