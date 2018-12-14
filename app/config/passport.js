//const passport = require('passport');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const saltRounds = 10
const myPlaintextPassword = '123456'
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)
const user = {
	email: 'muhammadbinnaeem@game.com',
	passwordHash,
	id: 1
}

module.exports = function (passport) {

	passport.use('local',new LocalStrategy({
			
				usernameField : 'username',
				passwordField : 'password',
				passReqToCallback : true 
		},
		(req, email, password, done) => {
			
			if (user.email !== email) {
				return done(null, false,  req.flash('loginMessage', 'Incorrect username.'));
			}
			bcrypt.compare(password, user.passwordHash, (err, isValid) => {
				if (err) {
					return done(err)
				}
				if (!isValid) {
					return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
				}
				return done(null, user)
			})

		}
	))
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

};
