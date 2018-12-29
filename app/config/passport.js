//const passport = require('passport');
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;
const Models = require('../models/index');
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
	));

	//Signup strategy
	passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        process.nextTick(function() {
        Models.users.findOne({where: {email: email}}).then(function(user){
            console.log(user);
            if(user) return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            const data = req.body;
            console.log(user,req.body);
            data.password = bcrypt.hashSync(password, salt);
            console.log("user data request body", data);
             Models.users.create(data).then(function(result){
                console.log("signup successfully");
                return done(null, user);
             }).catch(function(errors){
                return done(null, false,  req.flash('signupMessage', errors));
             });
        }).catch(function(errors){
            return done(null, false,  req.flash('signupMessage', errors));
        });
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        // User.findOne({ 'local.email' :  email }, function(err, user) {
        //     // if there are any errors, return the error
        //     if (err)
        //         return done(err);

        //     // check to see if theres already a user with that email
        //     if (user) {
        //         return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        //     } else {

        //         // if there is no user with that email
        //         // create the user
        //         var newUser            = new User();

        //         // set the user's local credentials
        //         newUser.local.email    = email;
        //         newUser.local.password = newUser.generateHash(password);

        //         // save the user
        //         newUser.save(function(err) {
        //             if (err)
        //                 throw err;
        //             return done(null, newUser);
        //         });
        //     }

        // });    

        });

    }));
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

};
