module.exports = {
    index:function(req,res) {
     	 res.render('index', { title: 'Quick MVC' });
	  },
	
	contact:function(req,res) {
		res.render('contact', { contactTitle: 'Contact Us' });
	},

	faq:function(req,res) {
		res.render('faq', { faq: 'FREQUENTLY ASKED QUESTIONS' });
	},

  
}