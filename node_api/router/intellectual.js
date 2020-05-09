/**
 * Created by 12 on 2017/7/3.
 */
const query = require('../utils/utils2');

const router = (req, res) => {
	var pageSize = req.body.pageSize;
	var page = req.body.page;
	//var intellectualList = db.collection("intellectuallists");
//	intellectualList.find({}).limit(15).skip(15*(count-1)).toArray((err,result)=>{
////		if(error) throw error;
////		console.log("精选数据获取")
////		res.send(result);
//		if(err){
//         // console.log("数据添加失败");
//          ress.json({code:-2,message:'没有数据！'});
//          throw err;
//      }
//		res.json({code:0,message:'success',list:result});
//	})
/*intellectualList.find({},function(err,doc){
		console.log(doc)
		res.json({code:0,list:doc})
	 });*/
	/*var count=0;
    var page=req.body.page;
    var rows=req.body.pageSize;
     
    var stuname=req.body.username;
    console.log(stuname);
    console.log("page:"+page+",rows:"+rows);
     
    var query=intellectualList.find({});
    query.skip((page-1)*rows);
    console.log('数据',rows)
    query.limit(rows);
    if(stuname){
        query.where('stuname',stuname);
    }
    //计算分页数据
    query.exec(function(err,rs){
        if(err){
            res.send(err);
        }else{
            //计算数据总数
            student.find(function(err,result){
                jsonArray={rows:rs,total:result.length};
                res.json(jsonArray);
            });
             
        }
    });*/
   query.find({},"listId content -_id",{skip: (page-1)*(JSON.parse(pageSize)), limit:(JSON.parse(pageSize))},function(err,doc){
		console.log(doc)
		if(!doc || doc.length == 0){
			res.json({code:1,message:'没有更多数据了！'})
		}else{
			res.json({code:0,list:doc,message:'success'})
		}
	 });
	
}

module.exports = router