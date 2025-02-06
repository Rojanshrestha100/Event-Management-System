const mongoose=require ("mongoose");

const DB="mongodb://127.0.0.1:27017/Event_mgmt"

mongoose.connect(DB,{
    useNewURLParser:true,
    useUnifiedTopology:true  //topology
}).then(()=>{
    console.log("mongoDB connected");
}).catch((error)=>{
    console.log(error.message);
}) 
