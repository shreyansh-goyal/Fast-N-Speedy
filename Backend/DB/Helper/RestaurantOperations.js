const RestaurantSchema = require("../Schema/RestaurantSchema");
const RestaurantOperations={
    getDetails:function(req,res){
      
    },
    postDetails:function(req,res){
        const uuidv1 = require('uuid/v1');
        let id = uuidv1(); 
        let data = req.body;
        Details={
            res_id:id,
            img:data.img,
            name:data.name,
            phoneNo:data.phoneNo,
            address:data.address,
            landmark:data.landmark,
            latitude:data.latitude,
            longitude:data.longitude,
            menu:data.menu,
            rating:data.rating,
            costForTwo:data.costForTwo,
            innerPhoto:data.innerPhoto,
            FoodTypeServed:data.foodTypeServed,
            rating:0,
            allReviews:[]
        }
        RestaurantSchema.Restaurant.create({Details},(err)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({err});
            }
            else
            {
                res.status(200).json({message:"data is posted successfully"});
            }
        })
    },
    getDetails:function(req,res){
        RestaurantSchema.Restaurant.find({},(err,doc)=>{
            res.status(200).json(doc)            
        })
    }   
}
module.exports={
    RestaurantOperations
}