/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils');

const router = (req, res) => {
	var username = req.body.username;
	query.remove({username:username},(err,doc)=>{
		     if(err){
		          console.log(err);
		      }
		     else{
		         console.log(doc)
		         console.log('删除完毕'); 
		         res.json({code:0,message:'删除完毕'});
		     }
		 });
}

module.exports = router