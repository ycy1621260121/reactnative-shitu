/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils');

const router = (req, res) => {
	var _id = req.body.id;
	var page = req.body.page;
   query.find({'_id':_id},function(err,doc){
		console.log(doc)
		if(!doc || doc.length == 0){
			res.json({code:1,message:'没有更多数据了！'})
		}else{
			res.json({code:0,list:doc[0],message:'success'})
		}
	 });
	
}

module.exports = router