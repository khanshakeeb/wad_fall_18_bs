module.exports = {
    hello: function (req, res) {
        res.render('index', { title: 'Quick MVC' });
    },
    login: function (req, res) {
        res.render('login', { title: 'Login Page' });
    },
    dashboard: function (req, res) {
        res.render('dashboard', { title: 'Dashboard' });
    },
    signup: function (req, res) {
        res.render('signup', { title: 'Signup' });
    },
    registration: function (req, res) {
        /**
         * signup process
         * redirect users on success
         * throw error on failure
         */
    },
}