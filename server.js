var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var User = require('./app/models/user.js');
var Message = require('./app/models/message.js');
var mongoose = require('mongoose');
var passport = require('passport');
var authController = require('./controller/auth.js');
var userController = require('./controller/user.js');
var messageController = require('./controller/message.js')
app.use(passport.initialize())
mongoose.connect('mongodb://tobee:balabak69@ds119682.mlab.com:19682/chat_app');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//set port to 800
var port = process.env.PORT || 8080;

//create route
var router = express.Router();

router.route('/message')
	.post(authController.isAuthenticated, messageController.createMessage)
	.get(messageController.getMessage);

router.route('/message/:message_id')
	.post(authController.isAuthenticated, messageController.editMessage)
	.get(authController.isAuthenticated, messageController.individualMessage);

router.route('/user/register')
	.post(userController.createUser);

router.route('/user/login')
	.post(userController.logUser);

app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);