/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils3');

const router = (req, res) => {
	 var title = req.body.title;
	 var content = req.body.content;
	 var jurisdiction= req.body.jurisdiction
	 userList=[
	        {title:title,content:content,jurisdiction:jurisdiction,state:'3'}
	    
	    ]
	    query.insertMany(userList,function(err,result){
	        if(err){
	           // console.log("数据添加失败");
	            ress.json({code:-2,message:'添加失败！'});
	            throw err;
	        }
	        //console.log("数据添加成功:",result);
	        res.json({code:0,message:'添加成功！',list:result[0]});
	     })
}

module.exports = router