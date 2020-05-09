/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../../utils/utils');

const router = (req, res) => {
	query.find({},function(err,doc){
		console.log(doc)
		res.json({code:0,list:doc})
	 });
}

module.exports = router