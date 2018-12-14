module.exports = {
    hello:function(req,next,res) {
        res.render('index', { title: 'Quick MVC' });
      },
	  login:function(req,res,next){
		  //console.log(req);
		  res.render('login', { title: 'Login Page' });
      },
      signup: function(req,next,res){

      },
	  dashboard:function(req,next,res){
		res.render('dashboard', { title: 'Dashboard' });	
	  }
}