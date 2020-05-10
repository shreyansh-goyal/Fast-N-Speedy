const router = require("express").Router();
const {OrderOperation} = require("../DB/Helper/OrdersOperations");
router.get("/order",(req,res)=>{
    OrderOperation.getOrders(req,res);
})
router.post("/reviewRestaurant",(req,res)=>{
    console.log("get the request review restaurant");
    OrderOperation.reviewRestaurant(req,res);
})
module.exports = router;