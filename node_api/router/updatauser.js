/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils');
const severapi = 'http://localhost:8081';

 var fs = require('fs');
const router = (req, ress) => {
  var sessionToken = req.body.sessionToken;
    var headImg = req.body.headImg;
    var lastModified=req.body.lastModified;
    var path = 'linephoto/'+ Date.now() +'.png';//从app.js级开始找--在我的项目工程里是这样的
    var base64Data = headImg.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer.from(base64Data, 'base64');
	var datanow = Date.now();
	query.find({"sessionToken" : sessionToken},function(err,doc){
		//console.log(doc)
		 if(err){
	          console.log(err);
	      }
	      else{
	          if(!doc||doc.length==0){
	            // console.log('用户名不存在！',username+','+password,doc);
	        	  ress.json({code:-1,message:'用户不存在',sessionToken:sessionToken})
	              return;
	          }else{
	          	
	        	query.update({sessionToken:sessionToken},{$set:{headImg:severapi+'/static/images/userimg/'+datanow+".png"}},function(err,doc){
				    if(err)console.log(err);
					    else{
					    	fs.writeFile('../static/images/userimg/'+datanow+".png", dataBuffer, function(err) {
					        if(err){
					          ress.json({code:1,message:'图片上传错误'});
					        }else{
					           //console.log(doc);
					            ress.json({code:0,list:doc[0],message:'图片上传成功'});
					        //console.log(code:0,list:doc[0],message:'图片上传成功!');
					        }
					    });
				     
				    }
				})
	          }
	         
	     }
	 });
}

module.exports = router