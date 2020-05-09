/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils2');

const router = (req, res) => {
	var content = req.body.content;
	 content = new RegExp(content, 'i') //不区分大小写
   query.find({$or:[{"content": {$regex : content}}]},function(err,doc){
		console.log(doc)
		if(!doc || doc.length == 0){
			res.json({code:1,message:'没有更多数据了！'})
		}else{
			res.json({code:0,list:doc,message:'success'})
		}
	 });

	
}

module.exports = router