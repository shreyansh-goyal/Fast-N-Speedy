const mongoose = require('../connection');
const AuthSchema=mongoose.Schema;

const user=new AuthSchema({
    Details:{
        userId:{type:String,required:true,unique:true},
        name:{type:String,required:true},
        emailId:{type:String,required:true,unique:true},
        phoneNo:{type:Number,required:true},
        address:{type:String,required:true},
        landmark:{type:String,required:true},
        latitude:{type:Number,required:true},
        longitude:{type:Number,required:true},
        password:{type:String,required:true},
        confirm:{type:Boolean,required:true},
        token:{type:Number}
    }
})
const User=mongoose.model("User",user);
module.exports={
    User
}