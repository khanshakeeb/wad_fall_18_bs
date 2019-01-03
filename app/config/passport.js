const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy;
const Models = require('../models/index');
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)


module.exports = function (passport) {

	passport.use('local',new LocalStrategy({
			
				usernameField : 'email',
				passwordField : 'password',
				passReqToCallback : true 
		},
		(req, email, password, done) => {
            
            Models.users.findOne({where: {email: email}}).then(function(user){
                           
                if (user.email !== email) {
                    return done(null, false,  req.flash('loginMessage', 'Incorrect username.'));
                }
                
                
                bcrypt.compare(password, user.password, (err, isValid) => {
                
                    if (err) {
                        return done(err)
                        
                    }
                    console.log(isValid);

                    if (!isValid) {
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                        
                    }
                    console.log("signin succesfully");
                    return done(null, user)
                })
            }).catch(function(errors){
                return done(null, false,  req.flash('loginMessage', errors));
            });
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
                console.log(password);
                return done(null, user);
             }).catch(function(errors){
                return done(null, false,  req.flash('signupMessage', errors));
             });
        }).catch(function(errors){
            return done(null, false,  req.flash('signupMessage', errors));
        });
        

        });

    }));
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (user, done) {
		done(null, user);
	});

};
