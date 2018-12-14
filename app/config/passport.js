const passport = require('passport');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const saltRounds = 10
const myPlaintextPassword = '123456'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)
const user = {
  username: 'muhammadbinnaeem',
  passwordHash,
  id: 1
}



passport.use(new LocalStrategy({ passReqToCallback : false},
 (username, password, done) => {
	if (user.username !== username) {
		return done(null, false, { message: 'Incorrect username.' });
	}
	  bcrypt.compare(password, user.passwordHash, (err, isValid) => {
		if (err) {
		  return done(err)
		}
		if (!isValid) {
		 return done(null, false, { message: 'Incorrect password.' });
		}
		return done(null, user)
	  })
	
  }
))  
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
function authenticationMiddleware () {
	  return function (req, res, next) {
		if (req.isAuthenticated()) {
		  return next()
		}
		res.redirect('/')
  }

}
passport.authenticationMiddleware = authenticationMiddleware;