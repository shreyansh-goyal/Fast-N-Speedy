const express = require("express");
const app=express();
const {verifyToken}= require("./Service/authentication.service")
const bodyParser = require("body-parser");
app.use(require("./cors"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/auth",require("./Api/AuthApi"));
app.use("/",verifyToken);
app.use("/",require("./Api/HomeApi"));
app.listen(1234,()=>{
    console.log("server listened at port 3000");
})