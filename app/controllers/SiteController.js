const Models = require('../models/index');

module.exports = {
    index:function(req,res) {
     	 res.render('index', { title: 'Quick MVC' });
	  },
	
	contact:function(req,res) {
		//const ss = req.body;
		//Models.user(ss).then()
		res.render('contact', { contactTitle: 'Contact Us' });
	},

	faq:function(req,res) {
		res.render('faq', { faq: 'FREQUENTLY ASKED QUESTIONS' });
	},

  
}