/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../../utils/utils2');

const router = (req, res) => {
	 var listId = req.body.listId;
	 var content = req.body.content;
	 userList=[
	        {listId:listId,content:content}
	    
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