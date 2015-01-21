var crypto = require('crypto');
var mongodb = require('./db');

/*管理员构造函数*/
function Article(art){
	this.gid = art.gid;
	this.title = art.title;
	this.content = art.content;
	this.date = art.date;
	this.type = art.type;
}

var testData = {ds:[
	{'id':'1','loginID':'111','title':'ajax','content':'你好','date':'2015-01-08','type':'ajax'},
	{'id':'2','loginID':'222','title':'html5','content':'david is a badboy 2!','date':'2015-01-09','type':'html5'},
	{'id':'3','loginID':'333','title':'css3','content':'david is a badboy 3!','date':'2015-01-10','type':'css3'},
	{'id':'4','loginID':'444','title':'coffeeScript','content':'david is a badboy 4!','date':'2015-01-11','type':'javascript'},
	{'id':'5','loginID':'555','title':'bower','content':'david is a badboy 5!','date':'2015-01-15','type':'bower'}
	]};

/*外部调用接口*/
module.exports = Article;

/*查找返回文章信息*/
Article.get = function(id,callback){
	/*for(var dt in testData.ds){
		console.log(dt);
		if(name == dt.loginID)
			return callback(null,dt);
	}*/
	for (var i = 0; i < testData.ds.length; i++) {
		if(testData.ds[i].id == id){
			console.log(testData.ds[i]);
			return callback(null,testData.ds[i]);
		}
	}
	
	return callback('不能找到该文章！');
}

/*返回所有文章*/
Article.getAll = function(callback){
	/*..datebase operate...*/
	callback(null,testData);
}

/*添加文章*/
Article.prototype.addOne =function(callback){
	var art ={
		gid:this.gid,
		title:this.title,
		content:this.content,
		date:this.date,
		type:this.type
	};
	testData.ds.push({'id':testData.ds.length+1,'loginID':art.gid,'title':art.title,'content':art.content,'date':art.date,'type':art.type})
	//console.log(testData.ds);
	callback(null,testData);
}

/*删除文章*/
Article.del = function(id,callback){
	for (var i = 0; i < testData.ds.length; i++) {
		if(testData.ds[i].id == id){
			testData.ds.splice(i,1);
			return callback(null,testData);
		}
	}
	//console.log(testData.ds);
	return callback('无法找到该文章，无法删除！');
}

/*编辑文章*/
Article.edit = function(id,title,type,content,callback){
	for (var i = 0; i < testData.ds.length; i++) {
		if(testData.ds[i].id == id){
			var item = testData.ds[i];
			item.title = title;
			item.type = type;
			item.content = content;
			return callback(null,testData);
		}
	}
	return callback('无法修改文章!');
}
