const mongoose = require('../connection');
const ReviewSchema=mongoose.Schema;

const review=new ReviewSchema({
    Details:{
        orderId:{type:String,required:true,unique:true},
        restaurantName:{type:String,required:true},
        resId:{type:String,required:true},
        userId:{type:String,required:true},
        order:{type:Array,required:true},
        review:{type:String},
        rating:{type:Number},
        alreadyRated:{type:Boolean},
        totalCost:{type:Number,required:true}
    }
})
const Review=mongoose.model("Order",review);
module.exports={
    Review
}