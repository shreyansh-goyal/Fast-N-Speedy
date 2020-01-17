const mongoose = require("mongoose");
const dbConfig = require("../Enviorment/database").dbConfig;
mongoose.connect(dbConfig,{poolSize:10,useFindAndModify: false},(err)=>{
    if(err)
    {
        console.log("Cannot create database connection");
        console.log(err);
    }
    else
    {
        console.log("connection created");
    }
})
module.exports=mongoose;