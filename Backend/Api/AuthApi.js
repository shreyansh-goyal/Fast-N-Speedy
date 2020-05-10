const router = require("express").Router();
const obj = require("../DB/Schema/AuthSchema");
const {AuthOperations} = require("../DB/Helper/AuthOperations");
const {RestaurantOperations} =require("../DB/Helper/RestaurantOperations");
router.post("/signup",(req,res)=>{
    AuthOperations.signup(req,res);
})
router.post("/verify",(req,res)=>{
    AuthOperations.verifyOtp(req,res);
})
router.post("/login",(req,res)=>{
    console.log("caught the request");
    AuthOperations.login(req,res);
})
router.post("/deliveryLogin",(req,res)=>{
    AuthOperations.delLogin(req,res);
})
router.post("/restaurant",(req,res)=>{
    RestaurantOperations.postDetails(req,res);
})
router.post("/admin",(req,res)=>{
    console.log(req.body);
    AuthOperations.verifyAdmin(req,res);
})
module.exports= router