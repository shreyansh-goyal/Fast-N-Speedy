const mongoose = require('../connection');
const DeliverySchema=mongoose.Schema;

const restaurant=new DeliverySchema({
    Details:{
        emailId:{type:String,required:true,unique:true},
        del_id:{type:String,required:true},
        name:{type:String,required:true},
        phoneNo:{type:Number,required:true},
        address:{type:String,required:true},
        latitude:{type:Number,required:true},
        longitude:{type:Number,required:true},
        free:{type:Boolean,required:true},
        password:{type:String,required:true},
        token:{type:Number}
    }
})
const Delivery=mongoose.model("Delivery",restaurant);
module.exports={
    Delivery
}