var mongoose=require('mongoose');
const db = require('./db');
//数据表userList：
//定义表userList数据结构
var userModel=new mongoose.Schema({
    id:String,
    username:String,
    password:String,
    sessionToken:String,
    headImg:String

},{
    versionKey:false //去除： - -v
});

//var Student = mongoose.model("userList" , userModel);
var monModel=db.model('userList',userModel);//发布该Model


module.exports=monModel