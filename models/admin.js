var crypto = require('crypto');
var mongodb = require('./db');

/*管理员构造函数*/
function Admin(admin){
	this.gid = admin.gid;
	this.name = admin.name;
	this.password = admin.password;
	this.date = admin.date;
}

var testData = {ds:[
	{'id':'1','loginID':'111','name':'华子','pwd':crypto.createHash('md5').update('111').digest('hex'),'date':'2015-01-08'},
	{'id':'2','loginID':'222','name':'林冲','pwd':crypto.createHash('md5').update('222').digest('hex'),'date':'2015-01-09'},
	{'id':'3','loginID':'333','name':'李逵','pwd':crypto.createHash('md5').update('333').digest('hex'),'date':'2015-01-10'},
	{'id':'4','loginID':'444','name':'武松','pwd':crypto.createHash('md5').update('444').digest('hex'),'date':'2015-01-11'},
	{'id':'5','loginID':'555','name':'鲁智深','pwd':crypto.createHash('md5').update('555').digest('hex'),'date':'2015-01-15'}
	]};

/*外部调用接口*/
module.exports = Admin;

/*查找返回用户信息*/
Admin.get = function(gid,callback){
	/*for(var dt in testData.ds){
		console.log(dt);
		if(name == dt.loginID)
			return callback(null,dt);
	}*/
	for (var i = 0; i < testData.ds.length; i++) {
		if(testData.ds[i].loginID == gid)
			return callback(null,testData.ds[i]);
	}
	return callback('不能找到该用户！');
}

/*返回所有用户*/
Admin.getAll = function(callback){
	/*..datebase operate...*/
	callback(null,testData);
}

/*添加用户*/
Admin.prototype.addOne =function(callback){
	//id or name 重复 ？return:insert a data to testData
	var admin ={
		gid:this.gid,
		name:this.name,
		password:this.password,
		date:this.date
	};
	for (var i = 0; i < testData.ds.length; i++) {
		if(testData.ds[i].loginID == admin.gid||testData.ds[i].name == admin.name) return callback('ID或用户名已存在！');
	}
	testData.ds.push({'id':testData.ds.length+1,'loginID':admin.gid,'name':admin.name,'pwd':crypto.createHash('md5').update(admin.password).digest('hex'),'date':admin.date})
	callback(null,testData);
}

/*编辑用户*/
Admin.edit = function(id,gid,name,callback){
	for (var i = 0; i < testData.ds.length; i++) {
		if(id == testData.ds[i].id){
			testData.ds[i].loginID = gid;
			testData.ds[i].name = name;
			console.log(testData);
			callback(null,testData);
		}
	}
	callback('没有该用户，无法修改！');

}

/*删除用户*/
Admin.del = function(gid,callback){
	for (var i = 0; i < testData.ds.length; i++) {
		if(testData.ds[i].loginID == gid){
			testData.ds.splice(i,1);
			return callback(null,testData);
		}
	}
	return callback('无法找到该用户，无法删除！');
}