const router = require("express").Router();
const {deliveryOperations} = require("../DB/Helper/DeliveryOperations");
router.post("/deliveryBoy",(req,res)=>{
  deliveryOperations.postDeliveryDetails(req,res)
})
module.exports=router;
