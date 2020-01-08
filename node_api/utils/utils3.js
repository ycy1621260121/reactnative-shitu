
var mongoose=require('mongoose');
// 得到数据库连接句柄
const db = require('./db');
//数据表userList：
//定义表userList数据结构
var userModel=new mongoose.Schema({
    title:String,
    content:String,
    jurisdiction:String,
    state:Number

},{
    versionKey:false //去除： - -v
});

//var Student = mongoose.model("userList" , userModel);
var monModel=db.model('intellectualmine',userModel);//发布该Model


module.exports=monModel