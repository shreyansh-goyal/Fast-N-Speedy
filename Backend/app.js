const express = require("express");
const app=express();
const socket =require("socket.io");
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const {verifyToken}= require("./Service/authentication.service")
const {VerifyToken}= require("./Service/verifiyToken.service")
const bodyParser = require("body-parser");
const {deliveryBoy,orderCompleted} = require("./DB/Helper/DeliveryOperations");
const path=require('path');

const server=app.listen(1234,()=>{
    console.log("server listened at port 3000");
});
const io = socket(server); 

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, 'aws' + path.extname(file.originalname));
    }
});
const upload= multer({storage}); 






io.on('connection',(socket)=>{
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
        console.log(data);
        socket.broadcast.emit("changeDriverLocation"+data.user.emailId,{data});
    })
})






app.use(require("./cors"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post("/upload",upload.single('image'),function(req,res,next){

    console.log(req.file);
    aws.config.update({
        secretAccessKey:'E4nPq3tKoOVOP+x/ZwSvBS/WzgdbfpKf7wc4BRcC',
        accessKeyId:'AKIAIAOH27U7VV5OD26A',
        region:'ap-south-1'
    })
    s3 = new aws.S3({apiVersion: '2006-03-01'}); 
    var uploadParams = {Bucket: 'foodorderingapp', Key: '', Body: ''};
    var file = "aws"+Date.now()+'.png   ';
    var fs = require('fs');
    var a = __dirname+"/public/uploads/"+req.file.filename;
    var fileStream = fs.createReadStream(a);
    console.log(fileStream);
    fileStream.on('error', function(err) {
    console.log('File Error', err);
    });
    uploadParams.Body = fileStream;
    var path = require('path');
    uploadParams.Key = path.basename(file);

    s3.upload (uploadParams, function (err, data) {
    if (err) {
        console.log("Error", err);
    } if (data) {
        console.log("Upload Success", data.Location);
        res.status(200).json({url:data.Location});
    }
    });
})
app.post("/banner",require("./DB/Helper/BannerOperations"))
app.use("/auth",require("./Api/AuthApi"));
app.use("/",require("./Api/DeliveryApi"));
app.post("/verify/token",VerifyToken);
app.use("/",verifyToken);
app.use("/",require("./Api/HomeApi"));
app.use("/",require("./Api/OrderApi"));

