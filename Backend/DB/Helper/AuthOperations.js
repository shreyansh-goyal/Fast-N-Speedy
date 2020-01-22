const AuthSchema=require("../Schema/AuthSchema");
const nodemailer = require("nodemailer");
const secret = require('../../Enviorment/config/otpSecret');
const {authenticator}= require("otplib");
const {Delivery} =require("../Schema/DeliverySchema");
const AuthOperations={
    signup:function(req,res){
        const token = authenticator.generate(secret);
        const uuidv1 = require('uuid/v1');
        let id = uuidv1();    
        var Details={...req.body};
        Details.token =token;
        Details.userId=id;
        Details.confirm=false;
        AuthSchema.User.create({Details},(err)=>{
            if(err)
            {
                console.log(err);
                res.status(500).json({message:"Record already exsist"})
            }
            else
            {
                this.verifyMailAddress(token,Details.emailId,req,res);
            }
        })
    },
    verifyMailAddress:function(otp,mail,req,res){
        console.log(mail);
        let mailOptions = {
            from: '"FoodOrderingApp" ', 
            to: mail, 
            subject: "One Time Password", 
            text: "", 
            html:`<h1>Your One time password is ${otp}</h1>`    
            };
            transporter.sendMail(mailOptions,(err,data)=>{
                if(err)
                {
                    res.status(500).send(err);
                }
                else
                {
                    res.status(200).json({message:"Data is posted successfully"});
                }    
            })
    },
    verifyOtp:function(req,res){
        const jwt = require("jsonwebtoken");
        data=req.body;
        console.log("The body is ",req.body);
        AuthSchema.User.findOneAndUpdate({"Details.emailId":data.emailId},{"Details.confirm":true},(err,doc)=>{
            if(err)
            {
                res.status(500).json({message:"Server Error"});
            }
            else
            {
                console.log(doc);
                if(doc==null)
                {
                    res.status(404).json({message:"Not Found"});
                    console.log("doc is null")
                }
                else
                {
                    if(doc.Details.token==data.otp)
                    {
                        jwt.sign({user},secret,(err,token)=>{
                            if(err)
                            {
                                console.log(err)
                                res.status(500).json({message:"failed to create the token",err});                            
                            }
                            res.json({
                                token:token,
                                message:"Correct credentials user is signed in",
                                user:doc
                            })
                        })
                    }
                    else
                    {
                        res.status(404).json({message:"Not Found"});
                    }
                }
            }
        })
    },
    login:function(req,res){
        const jwt = require("jsonwebtoken");
        data=req.body;
        AuthSchema.User.findOne({"Details.emailId":data.emailId},(err,doc)=>{
            if(doc==null)
            {
                res.status(400).json({message:"This emailId is not registred please signup if you are a new user"});
            }
            else
            {
                if(doc.Details.password==data.password)
                {
                    user=doc.Details;
                    jwt.sign({user},secret,(err,token)=>{
                        if(err)
                        {
                            console.log(err)
                            res.status(500).json({message:"failed to create the token",err});                            
                        }
                        console.log("send");
                        res.json({
                            token:token,
                            message:"Correct credentials user is logged in",
                            user:doc
                        })
                    })
                }
                else
                {
                    res.status(403).json({message:"Wrong Credentials"});
                }
            }
        })
    },
    delLogin:function(req,res){
        const jwt = require("jsonwebtoken");
        data=req.body;
        Delivery.findOne({"Details.emailId":data.emailId},(err,doc)=>{
            if(doc==null){
                res.status(400).json({message:"This emailId is not registred please signup if you are a new user"});
            }
            else{
                console.log(doc);
                if(doc.Details.password==data.password)
                {
                    user=doc.Details;
                    jwt.sign({user},secret,(err,token)=>{
                        if(err)
                        {
                            console.log(err)
                            res.status(500).json({message:"failed to create the token",err});                            
                        }
                        console.log("send");
                        res.json({
                            token:token,
                            message:"Correct credentials user is logged in",
                            user:doc
                        })
                    })
                }
                else
                {
                    res.status(403).json({message:"Wrong Credentials"});
                }
            }
        })
    }
}
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:'shreyanshgoyal90@gmail.com', // generated ethereal user
      pass: 'shreyanshisDebugging@90' // generated ethereal password
    }
  });
module.exports={AuthOperations};