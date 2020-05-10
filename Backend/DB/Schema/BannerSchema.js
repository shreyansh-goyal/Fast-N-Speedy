const mongoose = require('../connection');
const BannerSchema=mongoose.Schema;

const banner=new BannerSchema({
    Details:{
        banners:{type:Array,required:true}
    }
})
const Banners=mongoose.model("Restaurant",banner);
module.exports={
    Banners
}