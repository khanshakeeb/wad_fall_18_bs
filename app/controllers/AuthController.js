module.exports = {
    hello:function(req,res) {
        res.render('index', { title: 'Quick MVC' });
      },
	  login:function(req,res){
		  res.render('login', { title: 'Login Page' });
      },
      signup: function(req,next,res){
        /**
         * need to implement signup process
         */
      },
	  dashboard:function(req,res){
		res.render('dashboard', { title: 'Dashboard' });	
	  }
}