module.exports = {
    hello:function(req, res, next) {
        res.render('index', { title: 'Quick MVC' });
      }
}