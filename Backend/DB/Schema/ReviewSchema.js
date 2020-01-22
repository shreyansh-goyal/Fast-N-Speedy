const mongoose = require('../connection');
const ReviewSchema=mongoose.Schema;

const review=new ReviewSchema({
    Details:{
        userId:{type:String,required:true,unique:true},
        order:{type:Array,required:true},
        review:{type:String},
        rating:{type:Number},
        alreadyRated:{type:Boolean}
    }
})
const Review=mongoose.model("Order",review);
module.exports={
    Review
}