/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils')

const router = (req, res) => {
  var sessionToken = req.body.sessionToken;
	query.find({"sessionToken" : sessionToken},function(err,doc){
		//console.log(doc)
		 if(err){
	          console.log(err);
	      }
	      else{
	          if(!doc||doc.length==0){
	            //console.log('用户名不存在！',doc);
	        	  res.json({code:-1,message:'数据失效',sessionToken:sessionToken})
	              return;
	          }else{
	        	// console.log('账号\t'+'密码',username+','+password,doc)
			         for(var i in doc)
			        console.log(doc);
			         res.json({code:0,list:doc[0]})
	          }
	         
	     }
	 });
}

module.exports = router