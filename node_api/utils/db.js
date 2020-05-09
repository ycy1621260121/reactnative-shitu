
// 引入模块
var mongoose=require('mongoose');

// 连接数据库
mongoose.connect("mongodb://localhost:27017/vue", {useNewUrlParser:true}, function(err){

	　　if(err){

	　　　　console.log('数据库连接失败！:' + err)

	　　}else{

	　　　　console.log('数据库连接成功!') }

	})

// 得到数据库连接句柄
var db=mongoose.connection;
module.exports=db;



//查询数据库数据命令
//show dbs
//use vue
//show collections
//db.intellectuallists.find().pretty()
