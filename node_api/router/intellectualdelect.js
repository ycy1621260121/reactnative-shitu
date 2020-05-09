/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils3');

const router = (req, res) => {
	var id = req.body.id;
	query.remove({_id:id},(err,doc)=>{
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