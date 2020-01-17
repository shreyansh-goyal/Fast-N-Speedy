const router = require("express").Router();
const {RestaurantOperations} = require("../DB/Helper/RestaurantOperations");
router.get("/restaurants",(req,res)=>{
    console.log("hello get the request");
    RestaurantOperations.getDetails(req,res);
})
router.post("/restaurant",(req,res)=>{
    console.log("Api is hitted");
    RestaurantOperations.postDetails(req,res);
})
module.exports=router