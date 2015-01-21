var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var Admin = require('../models/admin');
var Article = require('../models/article');

/*router.get('/:name', function(req, res) {
  //response.render ÓÃÓÚäÖÈ¾Ä£°å
  var name = req.params.name;//»ñÈ¡Â·ÓÉÖ¸¶¨Ãû³Æ
  if(name=="adm"){
    Admin.getAll(function(err,data){
      res.render('admin/'+name, {data:data});
    });
  }
  else if(name == "meg"){
    res.render('admin/'+name, {data:data});
  }
  else if(name == "login"){
    //ÅÐ¶ÏÊÇ·ñÒÑµÇÂ¼if...else
    res.render('admin/'+name);
  }
  else if(name == "index"){
     res.render('admin/index');
  }
  
});*/
/*页面重定位*/
router.get('',function(req,res){
  res.redirect('/admin/login');
})
router.get('/',function(req,res){
  res.redirect('login');
})

/*登陆*/
router.get('/login',checkNotLogin);
router.get('/login',function(req,res){
  res.render('admin/login');
});
router.post('/login',function(req,res){
  var pwd = crypto.createHash('md5').update(req.body.pwd).digest('hex');
  Admin.get(req.body.id,function(err,user){
    if(err){
      return res.send(err);
    }
    if(user.pwd != pwd){
      return res.send('密码错误!');
    }
    console.log(req.session);
    req.session.user = user;
    res.redirect('/admin/index');
    /*res.render('admin/index',{
      user:req.session.user
    });*/
  });
});

/*文章*/
router.get('/index',checkLogin);
router.get('/index',function(req,res){
  var operate = req.query.op;
  var id = req.query.id;
  if("del" == operate){
    Article.del(id,function(err,data){
      var isDel;
      if(err)
        isDel = false;
      else
        isDel = true;
      return res.send({isDel:isDel});
    });
  }
  else if("get" == operate){
    Article.get(id,function(err,data){
      return res.send(data);
    })
  }
  else if("edt" ==  operate){
  }
  Article.getAll(function(err,data){
      res.render('admin/index', {
        user:req.session.user,
        data:data});
  });
});
router.post('/index',function(req,res){
  var date = new Date();
  var initDate  = date.getFullYear()+"-"+((date.getMonth()+1)>9?(date.getMonth()+1):"0"+(date.getMonth()+1))+"-"+date.getDate();
  var subType = req.body.subType;
  if("add" == subType){
    var art ={
      gid:req.session.user.loginID,
      title:req.body.inputTitle,
      type:req.body.inputType,
      content:req.body.content,
      date:initDate
    }
    var article = new Article(art);
    article.addOne(function(err,data){
      res.render('admin/index',{
        user:req.session.user,
        data:data
      });
    });
  }
  else if("edit" == subType){
    Article.edit(req.body.subID,req.body.inputTitle,req.body.inputType,req.body.content,function(err,data){
      res.render('admin/index',{
        user:req.session.user,
        data:data
      });
    });
  }
});

/*留言*/
router.get('/meg',checkLogin);
router.get('/meg',function(req,res){
  res.render('admin/meg',{
    user:req.session.user
  });
});
router.post('/meg',function(req,res){

});

/*用户*/
router.get('/adm',checkLogin);
router.get('/adm',function(req,res){
  console.log("-----to adm by get-----");
  var operate = req.query.op;
  var gid = req.query.gid;
  if("edit" == operate){
    /*var date = new Date();
    var initDate  = date.getFullYear()+"-"+((date.getMonth()+1)>9?(date.getMonth()+1):"0"+(date.getMonth()+1))+"-"+date.getDate();
    var item = {
        gid:req.body.loginID,
        name:req.body.name,
        password:req.body.pwd,
        date:initDate
    }
    var admin = new Admin(item);*/
    
  }
  else if("get" == operate){
    Admin.get(gid,function(err,data){
     res.json(data);
    })
  }
  else if("del" == operate){
    Admin.del(gid,function(err,data){
      res.send({isDel:1});
    });
  }
  Admin.getAll(function(err,data){
    res.render('admin/adm', {
        user:req.session.user,
        data:data});
      console.log(data);
  });
});
router.post('/adm',function(req,res){
  var operate = req.body.type;
  console.log(operate);
    if('add' == operate){
      var date = new Date();
      var initDate  = date.getFullYear()+"-"+((date.getMonth()+1)>9?(date.getMonth()+1):"0"+(date.getMonth()+1))+"-"+date.getDate();
      var item = {
      gid:req.body.loginID,
      name:req.body.name,
      password:req.body.pwd,
      date:initDate
    }
    var admin = new Admin(item);
    
    admin.addOne(function(err,data){
      res.render('admin/adm', {
        user:req.session.user,
        data:data});
    });
  }
  else if('edit' == operate){
    var id = req.body.xh,
        gid = req.body.loginID,
        name = req.body.name;
    Admin.edit(id,gid,name,function(err,data){
      res.render('admin/adm', {
        user:req.session.user,
        data:data});
    });
  }
});


/*没登*/
function checkLogin(req,res,next)
{
  if(!req.session.user)
  {
    req.flash('error','没登');
    res.redirect('/admin/login');
  }
  next();//Â·ÓÉ¿ØÖÆÈ¨ÒÆ½»
}
/*有登*/
function checkNotLogin(req,res,next)
{
  if(req.session.user)
  {
    req.flash('error','有登');
    //('back')上一级页面
    console.log(res.location('back'));
    //res.redirect(res.body.redir);

  }
  next();
}

module.exports = router;
