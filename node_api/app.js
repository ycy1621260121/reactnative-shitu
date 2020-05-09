/**
 * Created by 12 on 2017/7/3.
 */
var express=require('express');
const request = require('request');
var urlencode = require('urlencode');
var fs = require("fs");
var log4js = require('log4js');
var app =express();
var bodyParser = require('body-parser'); 
var https = require('https');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => { /* … */ });
var qs = require('querystring');
const rpn = require('request-promise-native');
var CircularJSON = require('circular-json');
const param = qs.stringify({
    'grant_type': 'client_credentials',
    'client_id': 'fU4GTncGXLK5erEi2VjGfFyL',
    'client_secret': 'zxa9dmp7i64Hqqi6tm90VIQ7Ywwxqqbd'
});
var schedule = require('node-schedule');

// //跨域设置
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true)
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers", "X-Requested-With")
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
//   res.header("X-Powered-By", ' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8")
//   next()
// })
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/x-www-form-urlencoded");
    next();
 });
//引用bodyParser 
//app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({limit:'800mb'}));
app.use(bodyParser.urlencoded({ limit:'800mb', extended: true }));

app.get('/', function (req, res) {
  res.send('hello express')
})


app.post('/login', require('./router/login'))

app.post('/register', require('./router/register'))

app.post('/delect', require('./router/delect'))

app.post('/userInfo', require('./router/userInfo'))

app.post('/intellectual', require('./router/intellectual'))

app.post('/intellectualadd', require('./router/intellectualadd'))

app.post('/intellectualmine', require('./router/intellectualmine'))

app.post('/intellectualdetail', require('./router/intellectualdetail'))

app.post('/detail', require('./router/detail'))

app.post('/intellectualdelect', require('./router/intellectualdelect'))

app.post('/updatauser', require('./router/updatauser'))

app.post('/search', require('./router/search'))
//admin
app.get('/alluser', require('./router/admin/alluser'))

app.post('/admin_intellectual', require('./router/admin/admin_intellectual'))

//百度人工智能获取token；
var url = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=fU4GTncGXLK5erEi2VjGfFyL&client_secret=zxa9dmp7i64Hqqi6tm90VIQ7Ywwxqqbd";
app.get('/baidu',function(req,res){
	async function handle(){
		let options ={
				method:'GET',
				uri:url,
		};
		let rpnbody = await rpn(options);
		res.json(rpnbody);
		//console.log('rpnbody',rpnbody);
	};
	handle();
});


//百度人工智能图像识别；
app.post('/upload',function(req,ress){
	var access_token = req.body.access_token;
	var param = qs.stringify({
	    'access_token':access_token
	});
	var imgData = req.body.imgData;
	var base64Data =imgData.replace(/^data:image\/\w+;base64,/, "");
	var uploadurl='https://aip.baidubce.com/rest/2.0/ocr/v1/handwriting?access_token='+access_token;
	var postData =qs.stringify({
	    image:base64Data
	});
	var api =req.body.api;
	var options = {
	    hostname: 'aip.baidubce.com',
	    path: '/rest/2.0/ocr/v1/'+api+'?' + param,
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	    }
	};
	var req = https.request(
	    options,
	    function (res) {
	        // 在标准输出中查看运行结果
	      // res.pipe(process.stdout);
	       var _data='';
	       res.on('data', function(chunk){
	          _data += chunk;
	       });
	       res.on('end', function(){
	          //console.log("\n--->>\nresult:",_data)
	          ress.json(_data)
	        });
	    }
	);
	// 携带数据发送https请求
	req.write(postData);
	req.end();
	//res.json(rpnbody);
	//console.log('rpnbody',rpnbody);
	/*var imgData = req.body.imgData;
	 var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	    var dataBuffer = new Buffer(base64Data, 'base64');
	    fs.writeFile("image.png", dataBuffer, function(err) {
	        if(err){
	          res.send(err);
	        }else{
	          res.send("保存成功！");
	        }
	    });*/
	//res.json(uploadurl);
});

//配置服务端口
//var server = app.listen(8089, function () {
//
//  var host = server.address().address;
//
//   var port = server.address().port;
//
//      console.log('Example app listening at http://%s:%s', host, port);
//  })
var onlineUserCount=0; //客户端连接数量
var onlineUsers={}; //统计客户端登录用户
 
var getTime=function(){
  var date = new Date();
  return date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
 
var getColor=function(){
  var colors = ['aliceblue','antiquewhite','aqua','aquamarine','pink','red','green',
                'orange','blue','blueviolet','brown','burlywood','cadetblue'];
  return colors[Math.round(Math.random() * 10000 % colors.length)];
}


clientCount=0;
io.on('connection',function(socket){
    socket.on('online',function(data){
        clientCount++;
        io.emit('clientNum',clientCount);
        socket.headImg = data
        io.emit('online',data)
        console.log('user:'+socket.drawerUsername+'connected!')
    })
    socket.on('msg',function(data){
        io.emit('broadcastMsg',data);
        console.log(JSON.stringify(data)+"发消息了")
    })

    socket.on('disconnect',function(){
        clientCount--;
        io.emit('clientNum',clientCount);
        socket.broadcast.emit('offline',socket.drawerUsername);
        console.log(socket.drawerUsername+'下线了~')
    })
})
 


server.listen(8089);