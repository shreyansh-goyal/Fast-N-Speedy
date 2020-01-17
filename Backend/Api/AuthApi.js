const router = require("express").Router();
const obj = require("../DB/Schema/AuthSchema");
const {AuthOperations} = require("../DB/Helper/AuthOperations");
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
module.exports= router