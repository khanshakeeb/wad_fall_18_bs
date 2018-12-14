const AuthController = require('./controllers/AuthController');

module.exports= function(app,passport){
 		app.get('/login', AuthController.login);
		app.get('/dashboard', passport.authenticationMiddleware() ,AuthController.dashboard);
		app.post('/login', (req, res, next) => {
		passport.authenticate('local', (err, user, info) => {
		if(info) {return res.send(info.message)}
		if (err) { return next(err); }
		if (!user) { return res.redirect('/login'); }
		req.login(user, (err) => {
		  if (err) { return next(err); }
		  return res.redirect('/dashboard');
		})
	  })(req, res, next);
})

	  
	// Endpoint to logout
app.get('/logout', function(req, res){
	req.logout();
	//res.send(null);
	return res.redirect('/login');
});
}