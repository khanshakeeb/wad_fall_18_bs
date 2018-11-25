const myController = require('./controllers/myController.js');
module.exports= function(app){
    app.get('/', myController.hello);
    app.get('/hello', myController.hello);
}