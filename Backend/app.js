const express = require("express");
const app=express();
const server=app.listen(1234,()=>{
    console.log("server listened at port 3000");
})
const socket =require("socket.io");
const io = socket(server); 
const {verifyToken}= require("./Service/authentication.service")
const bodyParser = require("body-parser");
const {deliveryBoy,orderCompleted} = require("./DB/Helper/DeliveryOperations");
io.on('connection',(socket)=>{
    console.log('A user is connected');
    socket.on('getOrder',data=>{
        deliveryBoy(socket,data);

    })
    socket.on("delivered",data=>{
        orderCompleted(socket,data);
    })
    socket.on('disconnect',()=>{
        console.log('A user is disconnected');
    })
    socket.on("changeDriverLocation",(data)=>{
        console.log("changeDriverLocation"+data.user.Details.emailId);
        socket.broadcast.emit("changeDriverLocation"+data.user.Details.emailId,{data});
    })
})
app.use(require("./cors"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/auth",require("./Api/AuthApi"));
app.use("/",require("./Api/DeliveryApi"));
app.use("/",verifyToken);
app.use("/",require("./Api/HomeApi"));

