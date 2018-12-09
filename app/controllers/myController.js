module.exports = {
    hello:function(req, res, next) {
        res.render('index', { title: 'Quick MVC' });
      },
	  login:function(req,res,next){
		  //console.log(req);
		  res.render('login', { title: 'Login Page' });
	  },
	  dashboard:function(req,res,next){
		res.render('dashboard', { title: 'Dashboard' });	
	  }
}