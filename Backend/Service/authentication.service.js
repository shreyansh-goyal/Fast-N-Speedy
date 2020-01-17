const secret =require("../Enviorment/config/otpSecret");
const jwt = require("jsonwebtoken");
let verifyToken=(req,res,next)=>
{
    console.log("the function is called");
    console.log(req.headers);
    const bearerHeader = req.headers["authorization"];
    if(typeof(bearerHeader)!=='undefined')
    {
        const bearer = bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        jwt.verify(req.token,secret,(err,authData)=>{
            if(err)
            {
                console.log("we have some error");
                res.status(403).json({message:"Unauthenticated User"});                
            }
            else
            {
                req.user=authData;
                next();
            }
        })

    }   
    else
    { 
        if ('OPTIONS' === req.method) {
        //respond with 200
        next()
      }
      else {
      //move on
      res.status(403).json({message:"UnAuthenticated User"});
      }
        //forbidden
    }
}
module.exports={
    verifyToken
}