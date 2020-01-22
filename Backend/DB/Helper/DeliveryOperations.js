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
    DeliverySchema.Delivery.findOneAndUpdate({"Details.free":true},{"Details.free":false},(err,doc)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            socket.broadcast.emit(doc.Details.emailId,{data});
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
            socket.emit("refreshDriver"+doc.Details.emailId); 
            console.log(data);
            var Details={
                userId:data.customer.userId,
                order:data.order,
                alreadyRated:false
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