const AuthController = require('./controllers/AuthController');
const SiteConroller = require('./controllers/SiteController');
module.exports = function (app, passport) {
	app.get('/login', AuthController.login);
	app.get('/dashboard', _authenticationMiddleware , AuthController.dashboard);
	app.post('/login', passport.authenticate('local', {
		successRedirect : '/dashboard', // redirect to the secure dashboard section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	app.get('/signup', AuthController.signup);
	app.post('/signup',passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure dashboard section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));//implement passport signup strategy
	 app.get('/', SiteConroller.index);
	 app.get('/contact', SiteConroller.contact);
	 app.post('/contact', SiteConroller.contact);
	 app.get('/faq', SiteConroller.faq);
	// Endpoint to logout
	app.get('/logout', function (req, res) {
		req.logout();
		//res.send(null);
		return res.redirect('/login');
	});
}

function _authenticationMiddleware(req, res, next) {
	
			if (req.isAuthenticated()) {
				return next()
			}
			res.redirect('/login')

}