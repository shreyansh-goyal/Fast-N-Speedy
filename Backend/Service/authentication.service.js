const secret =require("../Enviorment/config/otpSecret");
const jwt = require("jsonwebtoken");
let verifyToken=(req,res,next)=>
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
                console.log(err);
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
        next()
      }
      else {
      res.status(403).json({message:"UnAuthenticated User"});
      }
    }
}
module.exports={
    verifyToken
}