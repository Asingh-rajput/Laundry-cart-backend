const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    username:{
       type:String,
       
    },  
    phone:{
        type:Number,
        
     },
    district:{
        type:String,
       
     },
    state:{
         type:String,
       
     },
    email:{
        type:String,
        required:true
     },
    address:{
        type:String,
        
     },
    password:{
        type:String,
        required:true
     },
    pincode:{
         type:Number,
     },
})

const registerModals = mongoose.model("registerInfo",registerSchema);
module.exports = registerModals;