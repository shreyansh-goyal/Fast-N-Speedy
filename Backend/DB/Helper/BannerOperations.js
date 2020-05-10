const AuthSchema=require("../Schema/AuthSchema");
const BannerSchema=require("../Schema/BannerSchema");
let bannerOps=
function(req,res)
{
    AuthSchema.Admin.find({id:req.body.id},(err,doc)=>{
        if(err)
        {
            res.status(500).json({err});
        }
        else if(doc.length==1)
        {
            BannerSchema.Banners.findOneAndUpdate({},{"Details.banners":req.body.banners},(err,doc)=>{
                if(err)
                {
                    res.status(500).json({err});
                }
                else
                {
                    res.status(200).json({message:"Successfully updated the banners"});
                }

            });
        }       
        else
        {
            res.status(500).json({message:"Unauthorized Action"});
        }
    })
}
module.exports=bannerOps;