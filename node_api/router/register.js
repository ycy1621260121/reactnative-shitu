/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils');
const severapi = 'http://localhost:8081';
//唯一id
const uuidv1 = require('uuid/v1');
//获取用户唯一id
var sessionToken =uuidv1();
const router = (req, ress) => {
  var username = req.body.username;
	 var password = req.body.password;
	    query.find({"username" : username},function(err,doc){
			 if(err){
		          console.log(err);
		      }
		      else{
		          if(!doc||doc.length==0){
		             // console.log('用户名不存在！',username+','+password,doc);
		        	  //查询有没有该用户，没有就调用 handleth函数进行注册
		              handleth();
		              return;
		          }else{
		        	// console.log('账号\t'+'密码',username+','+password,doc)
				         for(var i in doc)
				        // console.log(doc[i].username+'\t'+doc[i].password);
				         ress.json({code:1,message:'用户已存在，无须重复注册'})
		          }
		         
		     }
		 });
	  //用户注册
	   function handleth(){
	    userList=[
	        {username:username,password:password,sessionToken:sessionToken,headImg:severapi+'/static/images/userimg/defaultUser.png'}
	    
	    ]
	    query.insertMany(userList,function(err,result){
	        if(err){
	           // console.log("数据添加失败");
	            ress.json({code:-2,message:'注册失败，请稍后重试！'});
	            throw err;
	        }
	        //console.log("数据添加成功:",result);
	        ress.json({code:0,message:'恭喜你注册成功！',list:result[0],sessionToken:sessionToken});
	     })
	   };
}

module.exports = router