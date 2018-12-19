const AuthController = require('./controllers/AuthController');
const SiteConroller = require('./controllers/SiteController');
module.exports = function (app, passport) {
	app.get('/login', AuthController.login);
	app.get('/dashboard', _authenticationMiddleware , AuthController.dashboard);
	app.post('/login', passport.authenticate('local', {
		successRedirect : '/dashboard', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/', SiteConroller.index);
	app.get('/contact', SiteConroller.contact);
	app.get('/faq', SiteConroller.faq);


	// (req, res, next) => {
	// 	passport.authenticate('local', (err, user, info) => {
	// 		if (info) { return res.send(info.message) }
	// 		if (err) { return next(err); }
	// 		if (!user) { return res.redirect('/login'); }
	// 		req.login(user, (err) => {
	// 			if (err) { return next(err); }
	// 			return res.redirect('/dashboard');
	// 		})
	// 	})(req, res, next);
	// }

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