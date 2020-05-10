const ReviewSchema = require("../Schema/ReviewSchema");
const RestaurantSchema = require("../Schema/RestaurantSchema");
const OrderOperation={
    getOrders:function(req,res){
        ReviewSchema.Review.find({"Details.userId":req.query.userId},(err,doc)=>{
            if(err)
            {
                res.status(500).json({err});
            }
            else
            {
                res.status(200).json({data:doc})
            }
        })
    },
    reviewRestaurant:function(req,res){
        console.log(req.body);
        ReviewSchema.Review.findOneAndUpdate({"Details.userId":req.body.user.userId},{"Details.alreadyRated":true},(err,doc1)=>{
            if(!doc1.Details.alreadyRated)
            {
                RestaurantSchema.Restaurant.findOne({"Details.res_id":req.body.resId},(err,doc)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {   
                        console.log(doc);
                        review=[...doc.Details.allReviews];
                        review.push({name:req.body.user.name,review:req.body.feedback});
                        ratings=(doc.Details.rating+req.body.ratings)/(doc.Details.allReviews.length+1);
                        RestaurantSchema.Restaurant.findOneAndUpdate({"Details.res_id":req.body.resId},{"Details.rating":ratings,"Details.allReviews":[...review]},(err)=>{
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                console.log("This is updated");
                                res.status(200).json({message:"Your review is uploaded"})
                            }
                        })
                    }
                })
            }
            else
            {
                res.status(500).json({message:"A order can be rated once only in the foodOrderingApp"});
            }
        })
    }
}
module.exports={OrderOperation}