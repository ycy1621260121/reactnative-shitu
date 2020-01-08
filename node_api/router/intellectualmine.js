/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils3');

const router = (req, res) => {
	var pageSize = req.body.pageSize;
	var page = req.body.page;
   query.find({},"title content jurisdiction state",{skip: (page-1)*(JSON.parse(pageSize)), limit:(JSON.parse(pageSize))},function(err,doc){
		console.log(doc)
		if(!doc || doc.length == 0){
			res.json({code:1,message:'没有更多数据了！'})
		}else{
			res.json({code:0,list:doc,message:'success'})
		}
	 });
	
}

module.exports = router