const cors = function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
}
module.exports=cors