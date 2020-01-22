const router = require("express").Router();
const DeliveryOperations = require("../DB/Helper/DeliveryOperations");
router.post("/deliveryBoy",(req,res)=>{
  DeliveryOperations.postDeliveryDetails(req,res)
})

module.exports=router;
