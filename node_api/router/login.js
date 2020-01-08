/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils')

const router = (req, ress) => {
  var username = req.body.username;
    var password = req.body.password;
    //查询有没有用户
    query.find({"username" : username},function(err,doc){
		 if(err){
	          console.log(err);
	      }
	      else{
	          if(!doc||doc.length==0){
	             // console.log('用户名不存在！',username+','+password,doc);
	        	  ress.json({code:1,message:'用户不存在'})
	              return;
	          }else{
	        	// console.log('账号\t'+'密码',username+','+password,doc)
			         for(var i in doc)
			        // console.log(doc[i].username+'\t'+doc[i].password);
			        	 if(password != doc[i].password){
			        		 ress.json({code:1,message:'密码错误'})
			        	 }else{
			        		 ress.json({code:0,message:'登录成功',list:doc[0],sessionToken:doc[i].sessionToken})
			        	 }
	          }
	         
	     }
	 });
}

module.exports = router