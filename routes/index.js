var express = require('express');
var router = express.Router();
//var index = require('../models/index');
var Article = require('../models/article');

router.get('/index',function(req,res){
	res.redirect('/');
});

/* 主页 */
/*response.get 用于发送get请求||response.render 用于渲染模板*/
router.get('/', function(req, res) {
  Article.getAll(function(err,data){
  	res.render('index', {
  		data:data
  	});
  });
});

/* about me */
router.get('/aboutme',function(req,res) {
  res.render('aboutme', { title: 'Express' });	
});

module.exports = router;
