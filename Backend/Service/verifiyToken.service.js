const secret =require("../Enviorment/config/otpSecret");
const jwt = require("jsonwebtoken");
let VerifyToken=function(req,res)
{
    const bearerHeader = req.headers["authorization"];
    if(typeof(bearerHeader)!=='undefined')
    {
        const bearer = bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        jwt.verify(req.token,secret,(err,authData)=>{
            if(err)
            {
                console.logA(err);
                res.status(403).json({message:"Token Expired"});                
            }
            else
            {
                res.status(200).json({message:"We can continue"})
            }
        })

    }
    else
    {
        res.status(403).json({message:"token expired"});       
    }   
}
module.exports={
    VerifyToken
}