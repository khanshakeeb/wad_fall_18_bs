const myController = require('./controllers/myController.js');
const passportjs = require('./controllers/passport.js');
const passport = require('passport');

module.exports= function(app){
    app.get('/', myController.hello);
    app.get('/hello', myController.hello);
	app.get('/login', myController.login);
	app.get('/dashboard', passport.authenticationMiddleware() ,myController.dashboard);
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