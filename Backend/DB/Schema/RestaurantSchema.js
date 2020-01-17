const mongoose = require('../connection');
const RestaurantSchema=mongoose.Schema;

const restaurant=new RestaurantSchema({
    Details:{
        res_id:{type:String,required:true},
        img:{type:String,required:true},
        name:{type:String,required:true},
        phoneNo:{type:Number,required:true},
        address:{type:String,required:true},
        landmark:{type:String,required:true},
        latitude:{type:Number,required:true},
        longitude:{type:Number,required:true},
        menu:{type:Array,rquired:true},
        rating:{type:Number,required:true},
        costForTwo:{type:Number,required:true},
        allReviews:{type:Array,required:true},
        innerPhoto:{type:Array,required:true},
        foodTypeServed:{type:Array,required:true}
    }
})
const Restaurant=mongoose.model("Restaurant",restaurant);
module.exports={
    Restaurant
}