const DeliverySchema =  require("../Schema/DeliverySchema");
const ReviewSchema = require("../Schema/ReviewSchema");
const  deliveryOperations = {
    postDeliveryDetails:function(req,res){
        const uuidv1 = require('uuid/v1');
        let id = uuidv1(); 
        let Details = {...req.body};
        Details.del_id=id;
        Details.free=true;
        DeliverySchema.Delivery.create({Details},(err,doc)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({error:err});
            }
            else
            {
                res.status(200).json({message:"recieved the data successfully"})
            }
        })
    }
}
function getDeliveryBoy(socket,data)
{
    DeliverySchema.Delivery.find({"Details.free":true},(err,doc)=>{
        for(let dBoy of doc)
        {
            let lat1=dBoy.Details.latitude;
            let lon1=dBoy.Details.longitude;
            let lat2=data.user.latitude;
            let lon2=data.user.longitude;
            var R = 6371;
            var dLat = (3.14*(lat2-lat1))/180;
            var dLon = (3.14*(lon2-lon1))/180; 
            var a = 
              Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos((3.14*(lat1))/180) * Math.cos((3.14*(lat2))/180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            var d = R * c;
            if(d<40)
            {
                DeliverySchema.Delivery.findOneAndUpdate({"Details.del_id":dBoy.Details.del_id},{"Details.free":false},(err,doc)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        if(doc.length==0)
                        socket.broadcast.emit("No Driver Found"+data.customer.emailId);
                        else
                        socket.broadcast.emit(doc.Details.emailId,{data});
                    }
                })
            }
        }
    })
}
function orderCompleted(socket,data){
    DeliverySchema.Delivery.findOneAndUpdate({"Details.del_id":data.user.del_id},{"Details.free":true},(err,doc)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            const uuid=require("uuid");
            let id=uuid();
            socket.emit("refreshDriver"+doc.Details.emailId); 
            console.log(data);
            var Details={
                userId:data.customer.userId,
                order:data.order,
                alreadyRated:false,
                resId:data.restaurant.Details.res_id,
                orderId:id,
                restaurantName:data.restaurant.Details.name,
                totalCost:data.totalCost
            }
            ReviewSchema.Review.create({Details},(err,doc)=>{
                if(err)
                {
                    console.log("error in creating the review",err);
                }
                else
                {
                    socket.broadcast.emit("deliveredToCustomer"+data.customer.emailId);      
                }
            })
        }
    })
}
module.exports={
    deliveryOperations,
    deliveryBoy:getDeliveryBoy,
    orderCompleted
};