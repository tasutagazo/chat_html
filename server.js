var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var User = require('./app/models/user.js');
var Message = require('./app/models/message.js');
var mongoose = require('mongoose');

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
	.post(function(req, res){
		var message = new Message();
		message.content = req.body.msg_content
		message.save(function(err){
			if(err){
				res.send(err)
			} 
			res.json(message.content)
		})
	})
	.get(function(req,res){
		Message.find(function(err, message){
			if(err){
				res.send(err)
			}
			res.json(message)
		})
	})	
router.route('/user')
	.post(function(req, res){
		var user = new User();
		user.name = req.body.user_name
		user.save(function(err){
			if(err){
				res.send(err);
			}
			res.json({message: 'User Created'})
		})
	})
	.get(function(req, res){
		User.find(function(err, user){
			if(err){
				res.send(err)
			}
			res.json(user)
		})
	})


app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);